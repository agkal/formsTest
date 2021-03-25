import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SearchUserComponent } from './search-user/search-user.component';

const routes: Routes = [
  {
    component: RegisterUserComponent,
    path: 'register'
  },
  {
    component: ListUserComponent,
    path: 'lists'
  },
  {
    component: SearchUserComponent,
    path: 'search'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
