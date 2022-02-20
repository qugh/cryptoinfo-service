import { RootState } from '../store'
import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { CryptoItemType, graphicDataType } from 'pages/CryptoPage/CryptoPage'

const getCrypto = (state: RootState) => state.crypto

export const getSlidesSize  = createDraftSafeSelector(getCrypto,
    (state)=> state.slidesToView)
/*export const getBTCGraphics = (state: RootState) => {
  return state.crypto.BTC.map((item) => ({
    title: 'BTC',
    high: item.high,
    low: item.low,
    date: new Date(item.time * 1000).getDate().toLocaleString(),
  })) as graphicDataType[]
}
/!*export const getIsSomeTodoMarkedSelector = createDraftSafeSelector(
    getTodos,
    (state) => state.todos.some((item) => item.isMarked === true)
)*!/*/



/*export const getIsSomeTodoMarked = (state: RootState) => {
  const isSomeTodoMarked = state.todoList.todos.some(
    (item) => item.isMarked === true
  )
  return isSomeTodoMarked
}*/

/*export const getIsSomeTodoMarkedSelector = createDraftSafeSelector(
    getTodos,
    (state) => state.todos.some((item) => item.isMarked === true)
)*/

export default getCrypto
