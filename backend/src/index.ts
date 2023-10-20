import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

//Router
import UserRoutes from './routers/UserRoutes';
import AuthRoutes from './routers/AuthRoutes';
import RoleRoutes from './routers/RoleRoutes';
import HakAksesRoutes from './routers/HakAksesRoutes';
import MenuRoutes from './routers/MenuRoutes';
import RoleMenuRoutes from './routers/RoleMenuRoutes';
import TPSRoutes from './routers/TPSRoutes';
import CustomerRoutes from './routers/CustomerRoutes';
import SampahRoutes from './routers/SampahRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.route('/').get((req, res) => {
      res.send('ini route menggunakan TypeScript');
    });

    this.app.route('/users').post((req, res) => {
      res.send(req.body);
    });

    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/users', UserRoutes);
    this.app.use('/api/v1/roles', RoleRoutes);
    this.app.use('/api/v1/menus', MenuRoutes);
    this.app.use('/api/v1/hakAkses', HakAksesRoutes);
    this.app.use('/api/v1/roleMenu', RoleMenuRoutes);
    this.app.use('/api/v1/tps', TPSRoutes);
    this.app.use('/api/v1/sampah', SampahRoutes);
    this.app.use('/api/v1/customers', CustomerRoutes);
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log('Aplikasi ini berjalan di port ' + port);

  console.log(process.env.DB_USER);
});
