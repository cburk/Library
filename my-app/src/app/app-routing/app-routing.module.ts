import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LibrariesComponent } from '../libraries/libraries.component'
import { LibraryComponent } from '../library/library.component'
import { AddBookComponent } from '../add-book/add-book.component'
import { AdminComponent } from '../admin/admin.component'
import { LoadingIconComponent } from '../loading-icon/loading-icon.component'

const routes: Routes = [
  { path: '', component: LibrariesComponent },
  { path: 'Libraries', component: LibrariesComponent },
  { path: 'Library/:name', component: LibraryComponent },
  { path: 'AddBook/:libraryId', component: AddBookComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'Loading', component: LoadingIconComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
