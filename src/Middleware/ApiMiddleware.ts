import axios from 'axios'
import { Action, ActionCreator, Dispatch, MiddlewareAPI } from 'redux'
import { castArray, compact } from 'lodash/fp'
import { endNetwork, startNetwork } from 'Store/NetworkStore'
import { PayloadAction } from '@reduxjs/toolkit/src/createAction'
import { removeUser } from '../Store/UserStore'
import { resetScrollPosition } from '../Store/ScrollingStore'

export interface BaseActionCreator<P, T extends string, M = never, E = never> {
  type: T
  match(action: Action<unknown>): action is PayloadAction<P, T, M, E>
}

export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  (payload: P): PayloadAction<P, T>
}

export interface ExtendedAction {
  type: string
  meta?: {
    api?: boolean
    debounce: boolean
    authRequire: boolean
  }
  callback?: ActionCreatorWithPayload<any>
  payload?: any
}

export const dispatchActions = (
  dispatch: Dispatch<ExtendedAction>,
  actionCreators:
    | ActionCreator<ExtendedAction>
    | ActionCreator<ExtendedAction>[],
  response?: any
) => {
  compact(castArray(actionCreators)).forEach(
    (actionCreator: ActionCreator<ExtendedAction>) => {
      const action = actionCreator(response)
      return action && dispatch(action)
    }
  )
}

export function apiMiddleware({ dispatch }: MiddlewareAPI) {
  return (next: Dispatch) => async (action: ExtendedAction) => {
    if (!action.meta?.api) {
      return next(action)
    }

    const { payload } = action
    const {
      path,
      baseUrl,
      onSuccess,
      onError,
      networkLabel,
      data,
      method,
      params,
      headers,
    } = payload

    if (action.type === 'post/comment') {
      return dispatch(onSuccess())
    }

    const requestUrl = `${baseUrl}${path}`
    dispatch(startNetwork(networkLabel))
    next(action)

    try {
      const response = await axios({
        method,
        url: requestUrl,
        headers,
        params,
        data,
        validateStatus: () => true,
      })

      const { status } = response

      if (status === 200) {
        dispatch(endNetwork(networkLabel))
        dispatch(onSuccess(response.data))
      } else dispatch(onError(response.data))
    } catch (error) {
      dispatchActions(
        dispatch,
        [endNetwork, removeUser, resetScrollPosition],
        null
      )
    }
  }
}

export default apiMiddleware
