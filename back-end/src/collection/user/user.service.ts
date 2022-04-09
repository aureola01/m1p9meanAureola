import { User } from "./user.interface";
import { 
  AuthenticationResponse
} from "../../common/response/response.interface";
import { userModel } from "./user.schema";
import * as jwt from "jsonwebtoken";
import { config } from "../../app/app.config";
import * as bcrypt from "bcrypt";
import { mailService } from "../../shared/mail/mail.service";
import { mailRenderService } from "../../shared/mail/mail-render.service";

class UserService {
  async getAll(): Promise<User[] | null> {
    return userModel.find().exec();
  }

  async create(item: User): Promise<User> {
    return userModel.create(item);
  }

  async getById(id: string): Promise<User | null> {
    return userModel.findById(id).exec();
  }

  async delete(id: string): Promise<boolean> {
    return userModel.deleteOne({ _id: id }).then(() => true);
  }

  async update(item: User): Promise<User | null> {
    return userModel
      .findByIdAndUpdate(item._id, item, { new: true })
      .exec();
  }

  async signUp(item: User): Promise<AuthenticationResponse | null> {
    const isExisting = (await userModel
      .findOne({ login: item.login })
      .exec()) as User;
    let response = {
      code: 500,
      message: "Email déjà utilisé",
      data:{
        user: null,
        token: ""
      }
    }
    if (!isExisting) {
      item.password = await bcrypt.hash(item.password, 10);
      const user = (await this.create(item)) as User;
      await this.sendSignupSuccessMail(user);
      const signedUser = this.getSignedUser(user);
      response['code'] = 200;
      response['message'] = "Votre compte a bien été créé avec succes";
      response['data']['user'] = (await signedUser).user;
      response['data']['token'] = (await signedUser).token;
    }
    return response;
  }

  async getSignedUser(user: User) {
    return {
      user: user,
      token: jwt.sign(
        { _id: user._id, login: user.login },
        config.jwt.secretKey,
        {
          expiresIn: config.jwt.expiration,
        },
      ),
    };
  }

  async login(item: User): Promise<AuthenticationResponse> {
    const client = (await userModel
      .findOne({ login: item.login })
      .exec()) as User;
    let response = {
      code: 500,
      message: "Email et/ou mot de passe incorrect",
      data:{
        user: null,
        token: ""
      }
    }
    if(this.comparePassword(item.password, client.password)){
      const user = {
        _id: client._id,
        login: client.login,
        userType: client.userType,
        firstName: client.firstName,
        lastName: client.lastName,
      };
      const signedUser = this.getSignedUser(user);
      response['code'] = 200;
      response['message'] = "Vous etes connecté avec succès";
      response['data']['user'] = (await signedUser).user;
      response['data']['token'] = (await signedUser).token;
    }
    return response;
  }

  async comparePassword(
    newPassword: String,
    oldPassword: String,
  ): Promise<boolean> {
    const compare = await bcrypt.compare(newPassword, oldPassword);
    return compare;
  }

  async sendSignupSuccessMail(user: User) {
    await mailService.sendMail({
      content: await mailRenderService.renderSignupSuccess(user),
      subject: `Bienvenue ${user.lastName} ${user.firstName} sur e-Kaly`,
      to: user.login,
    });
  }
}

export const userService = new UserService();
