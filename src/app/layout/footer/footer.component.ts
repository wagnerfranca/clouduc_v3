import {Component} from '@angular/core'

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styles: ``
})
export class FooterComponent {
    year = new Date().getFullYear()
}
