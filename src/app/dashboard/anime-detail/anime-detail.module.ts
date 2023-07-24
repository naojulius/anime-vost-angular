import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetailComponent } from './anime-detail.component';
import { AnimeDetailRoutingModule } from './anime-detail-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnimeDetailComponent
  ],
  imports: [
    CommonModule,
    AnimeDetailRoutingModule,
    FormsModule
  ]
})
export class AnimeDetailModule { }
