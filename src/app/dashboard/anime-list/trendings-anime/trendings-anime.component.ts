import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/@cores/entity/anime';
import { AnimeService } from 'src/@cores/services/anime.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trendings-anime',
  templateUrl: './trendings-anime.component.html',
  styleUrls: ['./trendings-anime.component.scss']
})
export class TrendingsAnimeComponent {
  image: string ='';
  trendings: Array<Anime> = [];
  constructor(
    private router: Router,
    private animeService: AnimeService,
  ){
   
  }

  ngOnInit(){
    this.image = environment.api_host + environment.image_api;
    this.animeService.GetTrendings(true).subscribe((response: HttpResponse<Array<Anime>>)=>{
        this.trendings = response.body as Array<Anime>;
    }, err=>{

    });
  }
  OnClickWatchButton(anime: Anime){
    this.router.navigateByUrl(environment.anime_detail_uri, {
      state: {
        id: anime._id
      } as any
    });
  }
}
