import { Router } from 'express'
import { getMetrics } from '../controllers/metrics.js';

const metricRoutes = Router();

metricRoutes.get('/', getMetrics);

export default metricRoutes;