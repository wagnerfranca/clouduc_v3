import {Component} from '@angular/core';
import {PagetitleComponent} from '../../shared/page-title/page-title.component';

@Component({
    selector: 'app-default',
    imports: [
        PagetitleComponent
    ],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
