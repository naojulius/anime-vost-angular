import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { ThemesModule } from 'src/@themes/themes.module';
import { AnimeListModule } from './anime-list/anime-list.module';
import { AnimeDetailModule } from './anime-detail/anime-detail.module';
import { AddAnimeModule } from './add-anime/add-anime.module';
import { SanitizeHtmlPipe } from 'src/@cores/pipes/sanitize-html.pipe';
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [
    DashboardComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    ThemesModule,
    AnimeListModule,
    AnimeDetailModule,
    AddAnimeModule,
    AdminModule,
    ProfileModule
  ]
})
export class DashboardModule { }
