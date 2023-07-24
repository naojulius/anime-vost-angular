import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/@cores/entity/anime';
import { AnimeService } from 'src/@cores/services/anime.service';
import { LoadingService } from 'src/@cores/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent {
  animeList: Array<Anime> = [];
  image: string = '';
  trendingAnimeList: Array<Anime> = [
    
  ]
  constructor(
    private router: Router,
    private animeService: AnimeService,
    private loadingService :LoadingService,
  ){
    
  }

  ngOnInit(){
    this.image = environment.api_host + environment.image_api;
    this.getAnime();

  }

  getAnime() {
    this.loadingService.startLoading()
    this.animeService.GetAllAnime(true).subscribe((response: HttpResponse<Array<Anime>>)=>{
      this.animeList = response.body as Array<Anime>;
      this.animeList.forEach(element => {
        //console.log(element._id);
      });
      this.loadingService.stopLoading()
    }, error=>{
      this.loadingService.stopLoading()
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