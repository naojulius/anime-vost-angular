import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
