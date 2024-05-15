import { Router } from 'express'
import countriesRoutes from './countries.js';
import metricRoutes from './metrics.js';

const rootRouter = Router();

rootRouter.use('/countries', countriesRoutes);
rootRouter.use('/metrics', metricRoutes);

export default rootRouter;