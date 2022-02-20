import instance from './instance'

const CryptoAPI = {
  getCryptoCurrency: (
    limit: number,
    currency: string = 'BTC',
    currencyToCompare: string = 'USD'
  ) => {
    return instance
      .get(
        `/v2/histoday?fsym=${currency}&tsym=${currencyToCompare}&limit=${limit}`
      )
      .then((response) => {
        return response.data
      })
  },
  getAllCryptoValues: (
    currency: string = 'BTC',
    currencyToCompare: string = 'USD'
  ) /*: Promise<Record<string, { USD: number }>> =>*/ => {
    return instance
      .get(`/pricemulti?fsyms=${currency}&tsyms=${currencyToCompare}`)
      .then((response) => {
        return response.data
      })
  },
}

export default CryptoAPI
