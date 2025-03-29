import {Component, ContentChild, TemplateRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'app-account-wrapper',
    standalone: true,
    templateUrl: './account-wrapper.component.html',
    imports: [
        RouterLink,
        NgTemplateOutlet
    ],
    styleUrl: './account-wrapper.component.scss'
})
export class AccountWrapperComponent {
    year = new Date().getFullYear()

    @ContentChild('bottomLinks') bottomLinksTemplate!: TemplateRef<HTMLElement | HTMLElement[]>
}
