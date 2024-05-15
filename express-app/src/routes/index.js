import { Router } from 'express'
import countriesRoutes from './countries.js';

const rootRouter = Router();

rootRouter.use('/countries', countriesRoutes);

export default rootRouter;