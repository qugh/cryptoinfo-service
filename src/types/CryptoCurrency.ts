export interface CryptoCurrency {
  low: number
  high: number
  open: number
  close: number
  time: number
  volumefrom?:number
  volumeto?:number
  conversionType?:string
  conversionSymbol?:string
}
