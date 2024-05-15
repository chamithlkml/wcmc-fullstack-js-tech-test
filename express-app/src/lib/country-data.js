class CountryData {
  constructor(dataHandler){
    this.dataHandler = dataHandler;
  }

  /**
   * Returns all countries
   */
  async getAll(){
    // unsanitized data
    const countries = await this.dataHandler.getCountries();
    // Removing duplicates
    let uniqueCountries = [...new Set(countries)];
    // Sorted
    uniqueCountries.sort();

    return uniqueCountries;
  }
}

export default CountryData;