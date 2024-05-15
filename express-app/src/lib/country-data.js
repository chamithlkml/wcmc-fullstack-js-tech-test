class CountryData {
  constructor(dataHandler){
    this.dataHandler = dataHandler;
  }

  /**
   * Returns all countries
   */
  async getAll(prefix=''){
    // unsanitized data
    const countries = await this.dataHandler.getCountries(prefix);
    // Removing duplicates
    let uniqueCountries = [...new Set(countries)];
    // Sorted
    uniqueCountries.sort();

    return uniqueCountries;
  }
}

export default CountryData;