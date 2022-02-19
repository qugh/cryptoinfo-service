import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CryptoCurrency } from '../../types/CryptoCurrency'
import CryptoAPI from '../../api/cryptoAPI'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from 'redux/store'

const cryptoSliceName = 'crypto'
const { getCryptoCurrency, getAllCryptoValues } = CryptoAPI

type cryptoValuesType = { name: string; value: number }

interface ICryptoData {
  BTC: Array<CryptoCurrency>
  LTC: Array<CryptoCurrency>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  currentRequestId: string | undefined
  cryptoValues: cryptoValuesType[]
}

const initialState = {
  BTC: [],
  LTC: [],
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
  currencies: ['BTC', ''], //
  cryptoValues: [],
} as ICryptoData

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface IGraphicsData {
  Response: string
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: object
  Data: {
    Aggregated: boolean
    TimeFrom: number
    TimeTo: number
    Data: CryptoCurrency[]
  }
}

export const loadGraphicsDataByCryptoName = createAsyncThunk<
    IGraphicsData,
    string,
    {
        state:RootState,
        dispatch:AppDispatch
    }
    >(
  'crypto/fetchByCryptoName',
  async (cryptoName, thunkAPI) => {
    const response = await getCryptoCurrency(9, cryptoName)
    return response.Data.Data as IGraphicsData
    /*      catch (err){
                                  let error: AxiosError<ValidationErrors> = err // cast the error for access
                                  if (!error.response) {
                                    throw err
                                  }
                                  // We got validation errors, let's return those so we can reference in our component and set form errors
                                  return thunkAPI.rejectWithValue(error.response.cryptoValues)
                                }*/
  }
)

interface selfCryptoValuesType {}

type cryptoValueType = { USD: number; RUB?: number }

export const loadAllCardsData = createAsyncThunk<
  IGraphicsData,
    void,
  {
    state: RootState
    dispatch: AppDispatch
  }
>('crypto/fetchAllCryptoValues', async (_, thunkAPI) => {
  //const data = thunkAPI.getState().crypto
  const response = await getAllCryptoValues('BTC,ETH,DOGE,ADA,DOT,BNB', 'USD')
  return response
})

type selfCryptoType = [name: string, coin: { USD: number }]

const cryptoSlice = createSlice({
  name: cryptoSliceName,
  initialState,
  reducers: {
    pushBTC: (state: ICryptoData, action: PayloadAction<CryptoCurrency>) => {
      state.BTC.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadGraphicsDataByCryptoName.fulfilled,
      (state: ICryptoData, action: PayloadAction<any>) => {
        console.log('ready')
        state.loading = 'succeeded'
      }
    )
    builder.addCase(
      loadGraphicsDataByCryptoName.rejected,
      (state: ICryptoData, action: PayloadAction<any>) => {
        state.error = 'Серверная ошибка'
        state.loading = 'failed'
      }
    )
    builder.addCase(
      loadGraphicsDataByCryptoName.pending,
      (state: ICryptoData, action: PayloadAction<any>) => {
        state.loading = 'pending'
      }
    )
    builder.addCase(
      loadAllCardsData.fulfilled,
      (state: ICryptoData, action: PayloadAction<any>) => {
        console.log('action', action)
        const neededData = Object.entries(action.payload).map(
          ([key, coin]: any) => ({ name: key, value: coin.USD })
        )

        console.log('nedata', neededData)
        state.cryptoValues = neededData
          state.loading='succeeded'
      }
    )
    builder.addCase(
      loadAllCardsData.rejected,
      (state: ICryptoData, action: PayloadAction<any>) => {
        console.log('error')
      }
    )
    builder.addCase(
      loadAllCardsData.pending,
      (state: ICryptoData, action: PayloadAction<any>) => {
        console.log('pending')
      }
    )
  },
})

interface PayloadCardsDataType {}

export const { pushBTC } = cryptoSlice.actions

export default cryptoSlice.reducer
