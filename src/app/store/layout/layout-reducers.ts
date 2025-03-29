import {createReducer, on} from '@ngrx/store'
import {
    LAYOUT_COLOR_TYPES,
    LAYOUT_MODE_TYPES,
    LAYOUT_POSITION_TYPES,
    LAYOUT_TYPES,
    MENU_COLOR_TYPES,
    SIDEBAR_SIZE_TYPES,
    TOPBAR_COLOR_TYPES,
} from './layout'
import * as appActions from './layout-action'
import {
    changecolor,
    changelayout,
    changemenucolor,
    changeMode,
    changeposition,
    changesidebarsize,
    changetopbarcolor
} from './layout-action'

export type LayoutState = {
    LAYOUT: string
    LAYOUT_COLOR: string
    LAYOUT_MODE: string
    TOPBAR_COLOR: string
    MENU_COLOR: string
    SIDEBAR_SIZE: string
    LAYOUT_POSITION: string
}

// IntialState
export const initialState: LayoutState = {
    LAYOUT: LAYOUT_TYPES.VERTICAL,
    LAYOUT_COLOR: LAYOUT_COLOR_TYPES.LIGHTMODE,
    LAYOUT_MODE: LAYOUT_MODE_TYPES.FLUID,
    TOPBAR_COLOR: TOPBAR_COLOR_TYPES.LIGHT,
    MENU_COLOR: MENU_COLOR_TYPES.DARK,
    SIDEBAR_SIZE: SIDEBAR_SIZE_TYPES.DEFAULT,
    LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
}

// Reducer
export const layoutReducer = createReducer(
    initialState,
    on(changelayout, (state, action) => ({...state, LAYOUT: action.layout})),
    on(changecolor, (state, action) => ({
        ...state,
        LAYOUT_COLOR: action.color,
    })),
    on(changeMode, (state, action) => ({...state, LAYOUT_MODE: action.mode})),
    on(changetopbarcolor, (state, action) => ({
        ...state,
        TOPBAR_COLOR: action.topbar,
    })),
    on(changemenucolor, (state, action) => ({
        ...state,
        MENU_COLOR: action.menu,
    })),
    on(changesidebarsize, (state, action) => ({
        ...state,
        SIDEBAR_SIZE: action.size,
    })),
    on(changeposition, (state, action) => ({
        ...state,
        LAYOUT_POSITION: action.position,
    })),
    on(appActions.resetState, () => initialState)
)

