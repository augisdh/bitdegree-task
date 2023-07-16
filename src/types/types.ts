export interface INetworkTypes {
  ETHEREUM: string;
  BINANCE: string;
  POLYGON: string;
}

export interface IUseGasService {
  lowPriceUsd: number;
  lowPrice: number;
  lowBase: number;
  lowPriority: number;
  avgPriceUsd: number;
  avgPrice: number;
  avgBase: number;
  avgPriority: number;
  highPriceUsd: number;
  highPrice: number;
  highBase: number;
  highPriority: number;
}

export interface IHistoricalData {
  unixDate: number;
  lowPrice: number;
  avgPrice: number;
  highPrice: number;
}

export interface IGasInterval {
  value: number | undefined;
}

export interface IGasMetricsCard {
  title: string;
  subtitle: number;
  base: number;
  priority: number;
  cost: number;
}

export interface IChartMetricsAccumulator {
  low: number[];
  avg: number[];
  high: number[];
  days: number[];
}
