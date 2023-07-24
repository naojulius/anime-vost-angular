import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAnimeComponent } from './add-anime.component';
import { AddAnimeRoutingModule } from './add-anime-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddAnimeComponent],
  imports: [
    CommonModule,
    AddAnimeRoutingModule,
    FormsModule
  ]
})
export class AddAnimeModule { }
