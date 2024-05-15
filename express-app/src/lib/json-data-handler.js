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

  async getCountries(prefix=''){
    await this.loadDataFromFile();

    let countryMetricsArr = [];

    console.log(prefix);

    if(prefix === ''){
      countryMetricsArr = this.countryMetrics;
    }else{
      countryMetricsArr = this.countryMetrics.filter((dataObj) => {
        let words = dataObj.country.split(' ');
        let matchingWords = words.filter((word) => {
          return word.startsWith(prefix);
        });
        
        return matchingWords.length > 0;
      });
    }

    return countryMetricsArr.map((dataObj) => dataObj.country );
  }
}

export default JsonDataHandler;