import {Component, OnInit} from '@angular/core';
import {PagetitleComponent} from '../../shared/page-title/page-title.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        PagetitleComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    homeform!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.homeform = this.fb.group({
            inputEmail4: ['valor do inputEmail4', [Validators.required, Validators.email]],
            inputPassword4: ['aasdasdas', [Validators.required]],
            inputAddress: ['asdasdasd', [Validators.required]],
            inputAddress2: ['asdasdada', [Validators.required]],
            inputZip: ['asdasda', [Validators.required]],
            customCheck11: ['asdasd', [Validators.required]]
        })
    }

    get formValues() {
        return this.homeform.controls;
    }

    onSubmit() {
        for (const v in this.homeform.controls) {
            console.log(`key: ${v}  value ${this.homeform.controls[v].value}`);
        }
    }

}
