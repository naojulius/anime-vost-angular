import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeListComponent } from './anime-list.component';
import { AnimeListRoutingModule } from './anime-list-routing.module';
import { TrendingsAnimeComponent } from './trendings-anime/trendings-anime.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AnimeListComponent, TrendingsAnimeComponent],
  imports: [
    CommonModule,
    AnimeListRoutingModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AnimeListModule { }
