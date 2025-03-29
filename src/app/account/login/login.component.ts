import {Component, inject, OnInit} from '@angular/core';
import {AccountWrapperComponent} from "../account-wrapper/account-wrapper.component";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthenticationService} from '../../core/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [
        AccountWrapperComponent,
        RouterLink,
        ReactiveFormsModule
    ],
    styleUrl: 'login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    formSubmited: boolean = false;
    showForm: boolean = false;

    private store = inject(Store)

    constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder) {
        if (this.auth.user) {
            this.router.navigate(['/']);
        }
    }

    get formValues() {
        return this.loginForm.controls
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            emailaddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    onSubmit() {
        this.formSubmited = true;

        if (this.loginForm.valid) {
            console.log(this.formValues);
            let email = this.formValues['emailaddress'].value;
            let password = this.formValues['password'].value;

            this.auth.login(email, password).subscribe({
                next: result => {
                    this.router.navigate(['/']).then(r => {console.log(r);});
                },
                error: err => {
                    console.log(err);
                    alert(err)
                }
            })
        } else {
            console.log("error")
        }
    }

}
