import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, delay, switchMap } from 'rxjs';
import { Anime } from 'src/@cores/entity/anime';
import { DataTable } from 'src/@cores/entity/data-table';
import { DataTableReq } from 'src/@cores/entity/service/data-table-req';
import { AnimeService } from 'src/@cores/services/anime.service';
import { LoadingService } from 'src/@cores/services/loading.service';
import { UserService } from 'src/@cores/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent {
  animeList: Array<Anime> = [];
  image: string = '';
  trendingAnimeList: Array<Anime> = [];
  tablereq: DataTableReq = new DataTableReq();
  table: DataTable = new DataTable();
  loading: boolean = false;
  searchedAnime: Array<Anime> = [];
  constructor(
    private router: Router,
    private animeService: AnimeService,
    private loadingService :LoadingService,
    public userService: UserService,
  ){
    this.tablereq.page = 0;
    this.tablereq.resultsPerPage = 8;
  }

  ngOnInit(){
    this.image = environment.api_host + environment.image_api;
    this.searchInput.valueChanges.pipe(
      debounceTime(500), // Add a debounce time to wait for user input to stabilize
      switchMap(async (searchTerm) => this.searchData(searchTerm))
    ).subscribe((data) => {
      // Handle the data received from the search
      // console.log(data);
    });
    this.getAnime();

  }

  getAnime() {
    this.loading =true;
    this.loadingService.startLoading()
    this.animeService.GetAnimeTable(true, this.tablereq).subscribe((response: HttpResponse<DataTable>)=>{
      this.table = response.body as DataTable ;
      this.loadingService.stopLoading()
      this.loading = false;
    }, error=>{
      this.loading = false;
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
  PageChange(event: any){
    this.tablereq.page = event - 1;
    this.getAnime();
  }

  onScroll(){
    this.tablereq.page ++;
    this.loading = true;
    // this.loadingService.startLoading()
    this.animeService.GetAnimeTable(true, this.tablereq).subscribe((response: HttpResponse<DataTable>)=>{
      response.body?.data.forEach(el=>{
        if(el){
          this.table.data.push(el);
        }
      });
      this.loading = false;
      // this.table.data.push = response.body as DataTable ;
      // this.loadingService.stopLoading()
    }, error=>{
      this.loading = false;
      // this.loadingService.stopLoading()
    });
  }

  searchInput = new FormControl();
  searchData(searchTerm: string) {
    // Here you can perform an HTTP request or any other operation based on the input
    // For example, perform an HTTP request to fetch search results
    //console.log("SEARCHED=> ", searchTerm);
  if(searchTerm){
    this.searchedAnime = [];
    this.animeService.SearchAnime(false, searchTerm.trimEnd().trimStart()).subscribe((response: HttpResponse<Array<Anime>>)=>{
      if(response.body){
      response.body?.forEach(anim => {
          this.searchedAnime.push(anim);
      });
      }
    }, error=>{

    })
  }else{
    this.searchedAnime = [];
  }
  }
  onLogOut(){
    this.userService.Logout();
  }
}