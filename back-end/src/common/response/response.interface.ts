import { User } from "../../collection/user/user.interface";

export interface AuthenticationResponse {
    code: number,
    message: string,
    data : {
      user: User,
      token: string
    }
}