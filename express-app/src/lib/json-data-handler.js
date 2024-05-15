import fs from 'node:fs/promises'
import { ErrorCode } from "../exceptions/http-exception.js";
import { InternalException } from "../exceptions/internal-exception.js";

class JsonDataHandler {
  constructor(filePath){
    this.filePath = filePath;
  }

  static getInstance(filePath){
    if(!JsonDataHandler.instance){
      JsonDataHandler.instance = new JsonDataHandler(filePath);
    }

    return JsonDataHandler.instance;
  }

  async loadDataFromFile(){
    try {
      if(!this.countryMetrics){
        this.countryMetrics = JSON.parse(await fs.readFile(this.filePath, { encoding: 'utf8' }))
      }
    } catch (error) {
      throw new InternalException(error.message, ErrorCode.INTERNAL_ERROR, 500)
    }
  }

  async getCountries(){
    await this.loadDataFromFile();
    const countries = this.countryMetrics.map((dataObj) => dataObj.country );

    return countries;
  }
}

export default JsonDataHandler;