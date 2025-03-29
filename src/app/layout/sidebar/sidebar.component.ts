import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core'
import {MENU} from '../shared/menu-meta'
import {SimplebarAngularModule} from 'simplebar-angular'
import {MenuItem} from '../shared/models/menu.model'
import {NavigationEnd, Router, RouterModule} from '@angular/router'
import {NgbCollapse, NgbCollapseModule, NgbTooltipModule,} from '@ng-bootstrap/ng-bootstrap'
import {CommonModule} from '@angular/common'
import {findAllParent, findMenuItem} from '../shared/helper/utils'

@Component({
    selector: 'app-sidebar',
    imports: [
        SimplebarAngularModule,
        RouterModule,
        NgbCollapseModule,
        CommonModule,
        NgbTooltipModule,

    ],
    templateUrl: './sidebar.component.html',
    styles: ``,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent implements OnInit, AfterViewInit {
    menuItems: MenuItem[] = []
    activeMenuItems: string[] = []

    constructor(
        router: Router
    ) {

        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this._activateMenu()
                this.hideBackdrop()
            }
        }).then(_r => {
        })
    }

    ngOnInit(): void {
        this.initMenu()
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this._activateMenu()
        })
    }

    /**
     * initialize menuitems
     */
    initMenu(): void {
        this.menuItems = MENU
    }

    _activateMenu(): void {
        const div = document.querySelector('.side-nav')
        let matchingMenuItem = null

        if (div) {
            let items: HTMLCollectionOf<HTMLAnchorElement> =
                div.getElementsByClassName(
                    'side-nav-link-ref'
                ) as HTMLCollectionOf<HTMLAnchorElement>

            for (let i = 0; i < items.length; ++i) {
                if (window.location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i]
                    break
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key')
                const activeMt = findMenuItem(this.menuItems, mid!)
                if (activeMt) {
                    const matchingObjs = [
                        activeMt['key']!,
                        ...findAllParent(this.menuItems, activeMt),
                    ]

                    this.activeMenuItems = matchingObjs
                    this.menuItems.forEach((menu: MenuItem) => {
                        menu.collapsed = !matchingObjs.includes(menu.key!)
                    })
                }
            }
        }
    }

    /**
     * Returns true or false if given menu item has child or not
     * @param menu
     */
    hasSubmenu(menu: MenuItem): boolean {
        return !!menu.subMenu
    }

    /**
     * toggles open menu
     * @param menuItem clicked menuitem
     * @param collapse collpase instance
     */
    toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
        collapse.toggle()
        let openMenuItems: string[]
        if (!menuItem.collapsed) {
            openMenuItems = [
                menuItem['key']!,
                ...findAllParent(this.menuItems, menuItem),
            ]
            this.menuItems.forEach((menu: MenuItem) => {
                if (!openMenuItems.includes(menu.key!)) {
                    menu.collapsed = true
                }
            })
        }
    }

    // Hide Backdrop
    hideBackdrop() {
        document.getElementById('custom-backdrop')?.classList.add('d-none')
        document.documentElement.classList.toggle('sidebar-enable')
    }
}
