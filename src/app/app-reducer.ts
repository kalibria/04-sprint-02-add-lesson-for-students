import { addDeckAC } from '../features/decks/decks-reducer.ts'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'SET_APP_STATUS':
      return { ...state, status: action.status }
    case 'SET_ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
  type: 'SET_APP_STATUS',
  status,
} as const)

export const setErrorAC = (error: string) => ({
  type: 'SET_ERROR',
  error,
} as const)

type ActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setErrorAC>
