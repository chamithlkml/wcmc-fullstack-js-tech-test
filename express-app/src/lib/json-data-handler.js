import fs from 'node:fs/promises'
import { ErrorCode, HttpException } from "../exceptions/http-exception.js";
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

  async getCountries(prefix=''){
    await this.loadDataFromFile();

    let countryMetricsArr = [];

    if(prefix === ''){
      countryMetricsArr = this.countryMetrics;
    }else{
      const prefixLowercase = prefix.toLowerCase();
      countryMetricsArr = this.countryMetrics.filter((dataObj) => {
        let words = dataObj.country.split(' ');
        let matchingWords = words.filter((word) => {
          return word.toLowerCase().startsWith(prefixLowercase);
        });
        
        return matchingWords.length > 0;
      });
    }

    return countryMetricsArr.map((dataObj) => dataObj.country );
  }

  async getMetrics(country){
    await this.loadDataFromFile();

    const countryDataArr = this.countryMetrics.filter((dataObj) => {
      return dataObj.country == country;
    })

    if(countryDataArr.length == 0){
      throw new HttpException('No metrics found', ErrorCode.DATA_NOT_FOUND, 404, 'Data not found');
    }
    
    return countryDataArr[0];
  }
}

export default JsonDataHandler;