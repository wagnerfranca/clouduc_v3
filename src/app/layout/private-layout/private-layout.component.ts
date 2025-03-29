import {Component, inject, Renderer2} from '@angular/core'
import {Store} from '@ngrx/store'
import {VerticalComponent} from "../vertical/vertical.component";

@Component({
    selector: 'app-private-layout',
    imports: [
        VerticalComponent
    ],
    templateUrl: './private-layout.component.html',
    styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {
    layoutType: string = ''

    private store = inject(Store)
    private render = inject(Renderer2)

    ngOnInit(): void {
        this.store.select('layout').subscribe((data) => {
            this.layoutType = data.LAYOUT
            this.render.setAttribute(
                document.documentElement,
                'data-bs-theme',
                data.LAYOUT_COLOR
            )
            this.render.setAttribute(
                document.documentElement,
                'data-layout-mode',
                data.LAYOUT_MODE
            )
            this.render.setAttribute(
                document.documentElement,
                'data-menu-color',
                data.MENU_COLOR
            )
            this.render.setAttribute(
                document.documentElement,
                'data-topbar-color',
                data.TOPBAR_COLOR
            )
            this.render.setAttribute(
                document.documentElement,
                'data-layout-position',
                data.LAYOUT_POSITION
            )
            this.render.setAttribute(
                document.documentElement,
                'data-sidenav-size',
                data.SIDEBAR_SIZE
            )
        })
        this.render.addClass(document.documentElement, 'menuitem-active')
    }

    /**
     * Check if the horizontal layout is requested
     */
    isHorizontalLayoutRequested() {
        return this.layoutType === 'horizontal'
    }

    /**
     * Check if the vertical layout is requested
     */
    isVerticalLayoutRequested() {
        return this.layoutType === 'vertical'
    }
}
