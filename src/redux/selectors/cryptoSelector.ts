import { RootState } from '../store'
import { createDraftSafeSelector } from '@reduxjs/toolkit'


const getCrypto = (state: RootState) => state.crypto

export const getSlidesSize = createDraftSafeSelector(
  getCrypto,
  (state) => state.slidesToView
)

export const getSortedCurrencies =  createDraftSafeSelector(
    getCrypto,
    (state) => {
        switch(state.sortingMethod){
            case 'HTL':  return state.cryptoValues.slice().sort((a,b)=>b.value-a.value)
            case 'LTH':  return state.cryptoValues.slice().sort((a,b)=>a.value-b.value)
            case 'SBN': return state.cryptoValues.slice().sort((a,b)=>a.name.localeCompare(b.name))
            default: return state.cryptoValues.slice().sort((a,b)=>b.value-a.value)
        }
    }
)


export default getCrypto
