import {Component, EventEmitter, Inject, inject, OnInit, Output, Renderer2,} from '@angular/core'
import {NgbDropdownModule, NgbTooltipModule,} from '@ng-bootstrap/ng-bootstrap'
import {SimplebarAngularModule} from 'simplebar-angular'
import {Store} from '@ngrx/store'


import {DOCUMENT} from '@angular/common'
import {Router, RouterModule} from '@angular/router'
import {changecolor} from '../../store/layout/layout-action';
import {getLayoutColor} from '../../store/layout/layout-selector';
import {CookieService} from 'ngx-cookie-service';


type FullScreenTypes = {
    requestFullscreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
    webkitFullscreenElement?: Element
    msRequestFullscreen?: () => Promise<void>
    mozRequestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
}

@Component({
    selector: 'app-topbar',
    imports: [
        NgbDropdownModule,
        SimplebarAngularModule,
        NgbTooltipModule,
        RouterModule
    ],
    templateUrl: './topbar.component.html',
    styles: ``
})
export class TopbarComponent implements OnInit {
    element!: FullScreenTypes

    store = inject(Store)
    render = inject(Renderer2)

    constructor(
        private cookieService: CookieService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document & FullScreenTypes
    ) {
    }

    @Output() settingsButtonClicked = new EventEmitter()
    @Output() mobileMenuButtonClicked = new EventEmitter()

    ngOnInit(): void {
        this.element = document.documentElement
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu() {
        console.log('toggleMobileMenu')
        this.mobileMenuButtonClicked.emit()
    }


    // Change Theme
    changeTheme() {
        const color = document.documentElement.getAttribute('data-bs-theme')
        if (color == 'light') {
            this.store.dispatch(changecolor({color: 'dark'}))
        } else {
            this.store.dispatch(changecolor({color: 'light'}))
        }
        this.store.select(getLayoutColor).subscribe((color) => {
            this.render.setAttribute(document.documentElement, 'data-bs-theme', color)
        })
    }

    // set Fullscreen
    fullscreen() {
        document.body.classList.toggle('fullscreen-enable')
        if (
            !document.fullscreenElement &&
            !this.element.mozFullScreenElement &&
            !this.element.webkitFullscreenElement
        ) {
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen().then(_r => {
                })
            } else if (this.element.mozRequestFullScreen) {
                /* Firefox */
                this.element.mozRequestFullScreen().then(_r => {
                })
            } else if (this.element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.element.webkitRequestFullscreen().then(_r => {
                })
            } else if (this.element.msRequestFullscreen) {
                /* IE/Edge */
                this.element.msRequestFullscreen().then(_r => {
                })
            }
        } else {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen().then(_r => {
                })
            } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen().then(_r => {
                })
            } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen().then(_r => {
                })
            } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen().then(_r => {
                })
            }
        }
    }

    // Logout
    logout() {
        sessionStorage.removeItem('userinfo')
        sessionStorage.removeItem('access_token')
        this.cookieService.delete('access_token')
        this.router.navigate(['/auth/login'])
    }
}
