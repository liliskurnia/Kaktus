import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
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
import DriverRoutes from './routers/DriverRoutes';
import OperatorRoutes from './routers/OperatorRoutes';
import SampahRoutes from './routers/SampahRoutes';
import JenisSampahRoutes from './routers/JenisSampahRoutes';
import DownloadRoutes from './routers/DownloadRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.set('view engine', 'ejs');
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
      res.render('index');
      // res.send('ini route menggunakan TypeScript');
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
    this.app.use('/api/v1/customers', CustomerRoutes);
    this.app.use('/api/v1/drivers', DriverRoutes);
    this.app.use('/api/v1/operators', OperatorRoutes);
    this.app.use('/api/v1/sampah', SampahRoutes);
    this.app.use('/api/v1/jenisSampah', JenisSampahRoutes);
    this.app.use('/download', DownloadRoutes);
    this.app.use(express.static('public'));
    //this.app.use('/api/v1/pickup', PickupRoutes);
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log('Aplikasi ini berjalan di port ' + port);
  console.log('db name: ' + process.env.DB_NAME);
});
