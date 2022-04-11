import express from 'express';
import { Server } from 'http';
import * as path from 'path';

export class App {
  private readonly app: express.Application;
  constructor() {
    this.app = express();
    this.init(4200);
  }

  public init(port: number): Server {
    this.app.use(express.static('dist/front-end'));
    this.app.get('/*', (req, res) =>
      res.sendFile(path.join(__dirname, 'dist/front-end/index.html'))
    );
    this.app.get('/', (req, res) =>
      res.sendFile(path.join(__dirname, 'dist/front-end/index.html'))
    );
    return this.app.listen(process.env['PORT'] || port, () => {
      console.log(`app started,listening on port ${port}`);
    });
  }
}

export const app = new App();
