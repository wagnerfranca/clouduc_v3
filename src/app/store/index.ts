import {ActionReducerMap} from '@ngrx/store'
import {layoutReducer, LayoutState} from './layout/layout-reducers'
import {authenticationReducer, AuthenticationState,} from './authentication/authentication.reducer'

export type RootReducerState = {
    authentication: AuthenticationState
    layout: LayoutState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    authentication: authenticationReducer,
    layout: layoutReducer
}
