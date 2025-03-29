import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {PrivateLayoutComponent} from './layout/private-layout/private-layout.component';

const routes: Routes = [
    {
        path: '',
        component: PrivateLayoutComponent,
        loadChildren: () => import('./pages/pages.routes').then((m) => m.PAGES_ROUTES),
        canActivate: [AuthGuard]
    },
    {path: 'auth', loadChildren: () => import('./account/auth.routes').then((m) => m.AUTH_ROUTES)},
    {path: '**', redirectTo: '/', pathMatch: 'full'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
