import { COUNTRY_METRICS_FILE_PATH } from "../../config/index.js";
import CountryData from "../lib/country-data.js";
import JsonDataHandler from "../lib/json-data-handler.js";

const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH);
const countryData = new CountryData(jsonDataHandler);

export const getCountries = async(req, res, next) => {
  try {
    const countries = await countryData.getAll(req.query.prefix);
    res.json(countries);
  } catch (error) {
    next(error);
  }
}