export interface DataSchema {
  userHolding: StockData[];
}
export interface StockData {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
}
