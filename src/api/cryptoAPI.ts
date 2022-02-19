import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
})

const CryptoAPI = {
  getCryptoCurrency: (
    limit: number,
    currency: string = 'BTC',
    currencyToCompare: string = 'USD'
  ) => {
    return instance
      .get(`/v2/histoday?fsym=${currency}&tsym=${currencyToCompare}&limit=${limit}`)
      .then((response: any) => {
        return response.data
      })
  },
    getAllCryptoValues: (   currency: string = 'BTC', //BTC,ETH,DOGE,ADA,DOT,BNB
                            currencyToCompare: string = 'USD')/*: Promise<Record<string, { USD: number }>> =>*/=> {
      return instance.get(`/pricemulti?fsyms=${currency}&tsyms=${currencyToCompare}`).then(
          (response:any) => {
              console.log('all cryptoValues',response.data)
              return response.data
          }
      )
    }
}

export default CryptoAPI
