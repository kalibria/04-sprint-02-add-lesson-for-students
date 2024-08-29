import { Dispatch } from 'redux'
import { decksAPI, Error, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { AxiosError } from 'axios'

export const fetchDecksTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  decksAPI.fetchDecks().then((res) => {
    dispatch(setDecksAC(res.data.items))
  })
    .finally(()=>{
      dispatch(setAppStatusAC('idle'))
    })
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params);
    console.log("res", res)
    dispatch(updateDeckAC(res.data))
  }
  catch (error:AxiosError<Error>) {
    console.log(error.message)
  }



}
