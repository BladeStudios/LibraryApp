import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { UserpanelComponent } from './userpanel/userpanel.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'bookslist', component: BookslistComponent},
  {path: 'userpanel', component: UserpanelComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
