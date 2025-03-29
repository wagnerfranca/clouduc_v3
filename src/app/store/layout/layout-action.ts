import {createAction, props} from '@ngrx/store'

export const changelayout = createAction(
    '[Layout] Set Layout',
    props<{ layout: string }>()
)
export const changecolor = createAction(
    '[Layout] Set Color',
    props<{ color: string }>()
)
export const changeMode = createAction(
    '[Layout] Set Mode',
    props<{ mode: string }>()
)
export const changetopbarcolor = createAction(
    '[Layout] Set Topbar',
    props<{ topbar: string }>()
)
export const changemenucolor = createAction(
    '[Layout] Set Menu',
    props<{ menu: string }>()
)
export const changesidebarsize = createAction(
    '[Layout] Set size',
    props<{ size: string }>()
)
export const changeposition = createAction(
    '[Layout] Set Position',
    props<{ position: string }>()
)
export const resetState = createAction('[App] Reset State')
