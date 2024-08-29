import { isAxiosError } from 'axios'
import { Error } from '../../features/decks/decks-api.ts'
import { Dispatch } from 'redux'
import { setErrorAC } from '../../app/app-reducer.ts'

export const handleError = (error: any, dispatch:Dispatch): any => {
  let errorMessage: string;

  if(isAxiosError<ServerError>(error)){
    errorMessage = error.response ? error.response.data.errorMessages[0].message : error.message
  }else {
    errorMessage = (error as Error).message
  }
  dispatch(setErrorAC(errorMessage))
}

type ServerError = {
  errorMessages: Array<{field: string; message: string}>
}