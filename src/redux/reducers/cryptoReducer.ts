import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CryptoCurrency } from '../../types/CryptoCurrency'
import CryptoAPI from '../../api/cryptoAPI'
import { AppDispatch, RootState } from 'redux/store'

const cryptoSliceName = 'crypto'
const { getCryptoCurrency, getAllCryptoValues } = CryptoAPI

export type cryptoValuesType = { name: string; value: number }

interface ICryptoData {
  chartData: Array<CryptoCurrency>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  // currentRequestId: string | undefined
  currencies: Array<currenciesInStock>
  cryptoValues: cryptoValuesType[]
  followedCurrencies: Array<currenciesInStock>
  slidesToView: number[]
}

export type currenciesInStock =
  | 'ETH'
  | 'DOGE'
  | 'BTC'
  | 'ADA'
  | 'DOT'
  | 'BNB'
  | 'SHIB'
  | 'SOL'
  | 'LUNA'
  | 'USDT'
  | 'LTC'
  | 'ETC'
  | 'XMR'
  | 'NMR'
  | 'AAVE'
  | 'YFI'
  | 'KSM'
  | 'MKR'

const initialState = {
  chartData: [],
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
  currencies: [
    'ETH',
    'DOGE',
    'BTC',
    'ADA',
    'DOT',
    'BNB',
    'SHIB',
    'SOL',
    'LUNA',
    'USDT',
    'LTC',
    'ETC',
    'XMR',
    'NMR',
    'AAVE',
    'YFI',
    'KSM',
    'MKR',
  ],
  followedCurrencies: [
    'ETH',
    'DOGE',
    'BTC',
    'ADA',
    'DOT',
    'BNB',
    'SHIB',
    'SOL',
    'LUNA',
    'USDT',
    'LTC',
    'ETC',
    'XMR',
    'NMR',
    'AAVE',
    'YFI',
    'KSM',
    'MKR',
  ],
  cryptoValues: [],
  slidesToView: [2, 3, 4],
} as ICryptoData

interface IGraphicsData {
  Response: string
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: object
  Data: selfGraphicDataType
}

type selfGraphicDataType = {
  Aggregated: boolean
  TimeFrom: number
  TimeTo: number
  Data: CryptoCurrency[]
}

export const loadGraphicsDataByCryptoName = createAsyncThunk<
  CryptoCurrency[],
  string,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('crypto/fetchByCryptoName', async (cryptoName, thunkAPI) => {
  const response = await getCryptoCurrency(30, cryptoName, 'USD')
  return response.Data.Data as CryptoCurrency[]
})

export const loadAllCardsData = createAsyncThunk<
  IGraphicsData,
  void,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('crypto/fetchAllCryptoValues', async (_, thunkAPI) => {
  const currenciesFollowed = thunkAPI
    .getState()
    .crypto.followedCurrencies.join()
  return await getAllCryptoValues(currenciesFollowed, 'USD')
})

const cryptoSlice = createSlice({
  name: cryptoSliceName,
  initialState,
  reducers: {
    changeCurrencies: (
      state: ICryptoData,
      action: PayloadAction<currenciesInStock[]>
    ) => {
      state.followedCurrencies = action.payload
    },
    changeSlidesToView: (
      state: ICryptoData,
      action: PayloadAction<number[]>
    ) => {
      state.slidesToView = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadGraphicsDataByCryptoName.fulfilled,
      (state: ICryptoData, action: PayloadAction<CryptoCurrency[]>) => {
        state.chartData = action.payload.map(
          (item): CryptoCurrency => ({
            ...item,
            time: new Date(item.time * 1000).getDate(),
          })
        )
        state.loading = 'succeeded'
      }
    )
    builder.addCase(
      loadGraphicsDataByCryptoName.rejected,
      (state: ICryptoData) => {
        state.error = 'Серверная ошибка'
        state.loading = 'failed'
      }
    )
    builder.addCase(
      loadAllCardsData.fulfilled,
      (state: ICryptoData, action: PayloadAction<IGraphicsData>) => {
        state.cryptoValues = Object.entries(action.payload).map(
          ([key, coin]: any) => ({ name: key, value: coin.USD })
        )
        state.loading = 'succeeded'
      }
    )
  },
})

export const { changeCurrencies, changeSlidesToView } = cryptoSlice.actions

export default cryptoSlice.reducer
