class MetricsData {
  constructor(dataHandler){
    this.dataHandler = dataHandler;
  }

  async get(country){
    const metrics = await this.dataHandler.getMetrics(country);

    return metrics;
  }
}

export default MetricsData;