import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeListComponent } from './anime-list.component';
import { AnimeListRoutingModule } from './anime-list-routing.module';
import { TrendingsAnimeComponent } from './trendings-anime/trendings-anime.component';



@NgModule({
  declarations: [AnimeListComponent, TrendingsAnimeComponent],
  imports: [
    CommonModule,
    AnimeListRoutingModule
  ]
})
export class AnimeListModule { }
