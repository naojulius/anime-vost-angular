import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/@cores/entity/anime';
import { Favourite } from 'src/@cores/entity/favourite';
import { FavouriteReq } from 'src/@cores/entity/favourite-req';
import { AnimeService } from 'src/@cores/services/anime.service';
import { TostService } from 'src/@cores/services/toast.service';
import { UserService } from 'src/@cores/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trendings-anime',
  templateUrl: './trendings-anime.component.html',
  styleUrls: ['./trendings-anime.component.scss']
})
export class TrendingsAnimeComponent {
  image: string ='';
  trendings: Array<Anime> = [];
  favoutiteLoading: boolean = false;
  constructor(
    private router: Router,
    private animeService: AnimeService,
    private userService: UserService,
    private toastService: TostService
  ){
   
  }

  ngOnInit(){
    this.image = environment.api_host + environment.image_api;
    this.animeService.GetTrendings(true).subscribe((response: HttpResponse<Array<Anime>>)=>{
        this.trendings = response.body as Array<Anime>;
        this.getFavourite();
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
  addToList(anime: Anime){
    this.favoutiteLoading = true;
    let favouriteReq: FavouriteReq = {
      owner: this.userService.getParam("_id"),
      anime: anime._id
    } as FavouriteReq;
    this.animeService.AddToFavourite(true, favouriteReq).subscribe((response: HttpResponse<Favourite>)=>{
     this.toastService.show("Ajout avec succès.")
      this.getFavourite();
      this.favoutiteLoading = false;
    }, error=>{
      this.favoutiteLoading = false;
    })
  }


  getFavourite(){
    this.favoutiteLoading  = true;
    this.animeService.GetFavourite(true, this.userService.getParam("_id")).subscribe((response: HttpResponse<Favourite>)=>{
      let  newTrendins: Array<Anime> = [];
      this.trendings.forEach(anim => {
        let found = response.body?.anime.find(x=>x._id == anim._id);
        if(found){
          anim.favourite = true;
        }else{
          anim.favourite = false;
        }
        newTrendins.push(anim);
        this.favoutiteLoading  = false;
        // console.log(anim);
      });
      this.trendings = newTrendins;
    }, error=>{
      this.favoutiteLoading  = false;
    })
  }
  removeToList(anime: Anime){
    this.favoutiteLoading = true;
    let favouriteReq: FavouriteReq = {
      owner: this.userService.getParam("_id"),
      anime: anime._id
    } as FavouriteReq;
    this.animeService.RemoveToFavourite(true, favouriteReq).subscribe((response: HttpResponse<Favourite>)=>{
     this.toastService.show("Desabonement avec succès.")
      this.getFavourite();
      this.favoutiteLoading = false;
    }, error=>{
      this.favoutiteLoading = false;
    })
  }
}
