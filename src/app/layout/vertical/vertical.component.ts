import {Component, HostListener, inject, Renderer2} from '@angular/core';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {changesidebarsize} from '../../store/layout/layout-action';
import {getSidebarsize} from '../../store/layout/layout-selector';
import {RightSidebarComponent} from '../right-sidebar/right-sidebar.component';
import {TopbarComponent} from '../topbar/topbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
    selector: 'app-vertical',
    imports: [
        TopbarComponent,
        SidebarComponent,
        RouterOutlet,
        FooterComponent
    ],
    templateUrl: './vertical.component.html',
    styleUrl: './vertical.component.scss'
})
export class VerticalComponent {

    private offcanvasService = inject(NgbOffcanvas)
    private store = inject(Store)
    private render = inject(Renderer2)

    ngOnInit(): void {
        const layout = document.documentElement.getAttribute('data-layout')
        if (layout) {
            this.render.removeAttribute(document.documentElement, 'data-layout')
        }
        this.onResize()
    }

    @HostListener('window:resize', ['$event'])
    onResize() {

        if (document.documentElement.clientWidth <= 767) {
            this.store.dispatch(changesidebarsize({size: 'full'}))
        } else if (document.documentElement.clientWidth <= 1024) {
            this.store.dispatch(changesidebarsize({size: 'condensed'}))
            document.getElementById('custom-backdrop')?.classList.add('d-none')
        } else if (document.documentElement.clientWidth >= 1024) {
            this.store.dispatch(changesidebarsize({size: 'default'}))
            document.getElementById('custom-backdrop')?.classList.add('d-none')
        }
        this.store.select(getSidebarsize).subscribe((size: string) => {
            this.render.setAttribute(
                document.documentElement,
                'data-sidenav-size',
                size
            )
        })
    }

    onSettingsButtonClicked() {
        this.offcanvasService.open(RightSidebarComponent, {position: 'end'})
    }

    onToggleMobileMenu() {
        document.documentElement.classList.toggle('sidebar-enable')
        const size = document.documentElement.getAttribute('data-sidenav-size')
        if (document.documentElement.clientWidth >= 767) {
            if (size == 'condensed') {
                this.store.dispatch(changesidebarsize({size: 'default'}))
            } else {
                this.store.dispatch(changesidebarsize({size: 'condensed'}))
            }
        } else {
            document.getElementById('custom-backdrop')?.classList.remove('d-none')
        }
        this.store.select(getSidebarsize).subscribe((size: string) => {
            this.render.setAttribute(
                document.documentElement,
                'data-sidenav-size',
                size
            )
        })
    }

}
