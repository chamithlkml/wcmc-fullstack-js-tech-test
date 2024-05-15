import { COUNTRY_METRICS_FILE_PATH } from "../../config/index.js";
import JsonDataHandler from "../lib/json-data-handler.js";
import MetricsData from "../lib/metrics-data.js";

const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH);
const metricsData = new MetricsData(jsonDataHandler);

export const getMetrics = async(req, res, next) => {
  try{
    const metrics = await metricsData.get(req.query.country)
    res.json(metrics);
  }catch (error){
    next(error);
  }
}