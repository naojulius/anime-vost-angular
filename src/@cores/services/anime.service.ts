import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anime } from "../entity/anime";
import { Episode } from "../entity/episode";
import { DataTableReq } from "../entity/service/data-table-req";
import { DataTable } from "../entity/data-table";
import { FavouriteReq } from "../entity/favourite-req";
import { Favourite } from "../entity/favourite";

@Injectable()
export abstract class AnimeService{
    abstract GetAllAnime(showErrorNotif:boolean): Observable<HttpResponse<Array<Anime>>>;
    abstract GetAnimeTable(showErrorNotif:boolean, table: DataTableReq): Observable<HttpResponse<DataTable>>;
    abstract SearchAnime(showErrorNotif:boolean, key: string): Observable<HttpResponse<Array<Anime>>>;
    abstract GetById(showErrorNotif:boolean, _id: string): Observable<HttpResponse<Anime> | HttpResponse<never>>;
    abstract GetTrendings(showErrorNotif:boolean): Observable<HttpResponse<Array<Anime>> | HttpResponse<never>>;
    abstract GetEpisodesBySeason(showErrorNotif:boolean, season: number, owner: string): Observable<HttpResponse<Array<Episode>> | HttpResponse<never>>;
    abstract NewAnime(showErrorNotif:boolean, formdata: FormData): Observable<HttpResponse<Anime> | HttpResponse<never>>;
    abstract NewEpisode(showErrorNotif:boolean, formdata: FormData): Observable<HttpResponse<Episode> | HttpResponse<never>>;
    abstract AddToFavourite(showErrorNotif:boolean, favouriteReq: FavouriteReq): Observable<HttpResponse<Favourite> | HttpResponse<never>>;
    abstract GetFavourite(showErrorNotif:boolean, owner: string): Observable<HttpResponse<Favourite> | HttpResponse<never>>;
    abstract RemoveToFavourite(showErrorNotif:boolean, favouriteReq: FavouriteReq): Observable<HttpResponse<Favourite> | HttpResponse<never>>;

}

