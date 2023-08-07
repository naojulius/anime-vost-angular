import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetailComponent } from './anime-detail.component';
import { AnimeDetailRoutingModule } from './anime-detail-routing.module';
import { FormsModule } from '@angular/forms';
import { PermissionDirectiveModule } from 'src/@cores/directives/permission.directive.module';



@NgModule({
  declarations: [
    AnimeDetailComponent
  ],
  imports: [
    CommonModule,
    AnimeDetailRoutingModule,
    FormsModule,
    PermissionDirectiveModule
  ]
})
export class AnimeDetailModule { }
