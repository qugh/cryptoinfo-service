import { RootState } from '../store'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

const getCrypto = (state: RootState) => state.crypto

export const getSlidesSize = createDraftSafeSelector(
  getCrypto,
  (state) => state.slidesToView
)

export default getCrypto
