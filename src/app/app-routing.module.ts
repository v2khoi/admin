import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent }, 
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'admin/groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
