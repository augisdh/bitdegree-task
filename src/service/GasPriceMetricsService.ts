import { MAX_TIME_FRAME } from "../utils/constants.ts";
import { IUseGasService, IHistoricalData } from "../types/types.ts";

function numberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function useGasService(): IUseGasService {
  return {
    lowPriceUsd: numberBetween(1, 5),
    lowPrice: numberBetween(20, 30),
    lowBase: numberBetween(20, 30),
    lowPriority: numberBetween(1, 3),
    avgPriceUsd: numberBetween(3, 7),
    avgPrice: numberBetween(30, 40),
    avgBase: numberBetween(30, 40),
    avgPriority: numberBetween(1, 3),
    highPriceUsd: numberBetween(5, 10),
    highPrice: numberBetween(40, 50),
    highBase: numberBetween(40, 50),
    highPriority: numberBetween(1, 3),
  };
}

export function usePriceService() {
  function getHistoricalData(): IHistoricalData[] {
    const historicalData = [];
    const iterations = MAX_TIME_FRAME;
    for (let i = 0; i < iterations; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const dateYearMonthDay = currentDate.toISOString().slice(0, 10);
      const unixDate = Math.floor(new Date(dateYearMonthDay).getTime());
      const lowPrice = numberBetween(1, 10);
      const avgPrice = numberBetween(lowPrice, 30);
      const highPrice = numberBetween(avgPrice, 60);
      historicalData.push({ unixDate, lowPrice, avgPrice, highPrice });
    }
    return historicalData;
  }
  return getHistoricalData();
}
