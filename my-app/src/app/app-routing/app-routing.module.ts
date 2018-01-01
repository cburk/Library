import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LibrariesComponent } from '../libraries/libraries.component'
import { LibraryComponent } from '../library/library.component'

const routes: Routes = [
  { path: '', component: LibrariesComponent },
  { path: 'libraries', component: LibrariesComponent },
  { path: 'library/:name', component: LibraryComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
