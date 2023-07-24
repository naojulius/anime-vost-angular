import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { SanitizeHtmlPipe } from 'src/@cores/pipes/sanitize-html.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    BannerComponent
  ]
})
export class ThemesModule { }
