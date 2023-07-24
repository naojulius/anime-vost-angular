import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemesModule } from 'src/@themes/themes.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ApiService } from 'src/@cores/services/api.service';
import { ApiAnimeService } from './services/api-anime.service';
import { AnimeService } from 'src/@cores/services/anime.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingService } from 'src/@cores/services/loading.service';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger,state,style,animate,transition}from '@angular/animations';
import { UserService } from 'src/@cores/services/user.service';
import { ApiUserService } from './services/api-user.service';
import { JsonInterceptor } from './interceptors/json-interceptor';
import { TostService } from 'src/@cores/services/toast.service';
import { SanitizeHtmlPipe } from 'src/@cores/pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    ThemesModule,
    HttpClientModule,
    AuthModule,
    
  ],
  providers: [
    ApiService,
    LoadingService,
    TostService,
    {provide: AnimeService,  useClass: ApiAnimeService},
    {provide: UserService,  useClass: ApiUserService},
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
