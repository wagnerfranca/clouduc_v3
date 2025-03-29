import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {TopbarComponent} from './layout/topbar/topbar.component';
import {provideStore, Store, StoreModule} from '@ngrx/store';
import {rootReducer} from './store';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './account/login/login.component';
import {PagetitleComponent} from './shared/page-title/page-title.component';
import {AccountWrapperComponent} from './account/account-wrapper/account-wrapper.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {JwtInterceptor} from './core/helpers/jwt.interceptor';
import {ErrorInterceptor} from './core/helpers/error.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AccountWrapperComponent,
        AppRoutingModule,
        FooterComponent,
        SidebarComponent,
        TopbarComponent,
        TopbarComponent,
        PagetitleComponent,
        StoreModule.forRoot({}),
        LoginComponent,
        HomeComponent
    ],
    providers: [
        Store,
        provideStore(rootReducer),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    schemas: []
})
export class AppModule {
}
