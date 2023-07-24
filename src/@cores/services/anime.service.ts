import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anime } from "../entity/anime";
import { Episode } from "../entity/episode";

@Injectable()
export abstract class AnimeService{
    abstract GetAllAnime(showErrorNotif:boolean): Observable<HttpResponse<Array<Anime>>>;
    abstract GetById(showErrorNotif:boolean, _id: string): Observable<HttpResponse<Anime> | HttpResponse<never>>;
    abstract GetTrendings(showErrorNotif:boolean): Observable<HttpResponse<Array<Anime>> | HttpResponse<never>>;
    abstract GetEpisodesBySeason(showErrorNotif:boolean, season: number, owner: string): Observable<HttpResponse<Array<Episode>> | HttpResponse<never>>;
    abstract NewAnime(showErrorNotif:boolean, formdata: FormData): Observable<HttpResponse<Anime> | HttpResponse<never>>;
    abstract NewEpisode(showErrorNotif:boolean, formdata: FormData): Observable<HttpResponse<Episode> | HttpResponse<never>>;
}