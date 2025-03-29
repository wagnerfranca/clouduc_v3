import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PagetitleComponent} from '../../../shared/page-title/page-title.component';
import {User} from '../../../core/model/auth.models';
import {RestService} from '../../../core/service/rest.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {DataTablesModule} from 'angular-datatables';
import {Config} from "datatables.net";

@Component({
    selector: 'app-users',
    imports: [
        PagetitleComponent,
        DataTablesModule,
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    datalist: User[] = [];
    selecteduser!: User | undefined;


    //models
    users: User[] = [];
    user!: User;

    dtOptions: Config = {}

    @ViewChild('user_change') userChangeModal: TemplateRef<any> | undefined;

    constructor(private rest: RestService, private modalService: NgbModal) {

    }

    ngOnInit(): void {
        let currentuser = this.user;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                this.rest.getAllUsers().subscribe((resp) => {
                    this.users = resp.data;
                    callback({
                        data: resp.data,
                    });
                });
            },
            columns: [
                {title: '#', data: null, render: (_d, _t, _r, _m) => _m.row},
                {title: 'Nome', data: 'full_name'},
                {title: 'Email', data: 'email'},
                {title: 'Usuário', data: 'username'},
                {title: 'Ultimo Logon', data: 'last_logon'},
                {
                    title: 'Ações',
                    data: null,
                    render(_d, _t, r, _m) {
                        return `
                            <div class="hstack gap-3 fs-15" >
                                <a href="javascript:void(0)" class="link-primary edit-btn" data-id="${r.id}" ><i class="ri-edit-2-fill"></i></a>
                                <a href="javascript:void(0)" class="link-primary passwd-btn" data-id="${r.id}"><i class="ri-shield-keyhole-fill"></i></a>
                                <a href="javascript:void(0)" class="link-danger remove-btn"  data-id="${r.id}"><i class="ri-delete-bin-fill"></i></a>
                            </div>
                        `;
                    },
                },
            ],


        }
    }


    ngAfterViewInit(): void {
        $("#table-users").on('click', 'tr td .edit-btn', (event) => {
            let id = $(event.currentTarget).data('id');
            this.selecteduser = this.users.find(user => user.id === id);
            console.log(this.selecteduser);
            this.modalService.open(this.userChangeModal, {size: "lg", backdrop: 'static'});
        })
    }

    load_data(): void {
        this.rest.getAllUsers().subscribe({
            next: d => {
                this.datalist = d.data
            }
        })
    }

    reload_data(): void {
        $('#table-users').DataTable().ajax.reload();
    }


}
