import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DefaultComponent} from './default/default.component';
import {UsersComponent} from './manager/users/users.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {GroupsComponent} from './manager/groups/groups.component';
import {AuditComponent} from './manager/audit/audit.component';
import {ConfigurationsComponent} from './manager/configurations/configurations.component';

export const PAGES_ROUTES: Route[] = [
    {path: '', component: DefaultComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'manager/users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'manager/groups', component: GroupsComponent, canActivate: [AuthGuard]},
    {path: 'manager/audit', component: AuditComponent, canActivate: [AuthGuard]},
    {path: 'manager/configurations', component: ConfigurationsComponent, canActivate: [AuthGuard]},
]
