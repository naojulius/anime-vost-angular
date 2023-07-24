import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { Anime } from "src/@cores/entity/anime";
import { Episode } from "src/@cores/entity/episode";
import { AnimeService } from "src/@cores/services/anime.service";
import { ApiService } from "src/@cores/services/api.service";
import { environment } from "src/environments/environment";

@Injectable()

export class ApiAnimeService extends AnimeService {
    override NewEpisode(showErrorNotif: boolean, formdata: FormData): Observable<HttpResponse<never> | HttpResponse<Episode>> {
        return this.apiService.postMultipart<FormData>(environment.new_episode_api, formdata).pipe(
            map((x: HttpResponse<any> | Observable<Episode>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override NewAnime(showErrorNotif: boolean, formdata: FormData): Observable<HttpResponse<Anime> | HttpResponse<never>> {
        return this.apiService.postMultipart<FormData>(environment.new_anime_api, formdata).pipe(
            map((x: HttpResponse<any> | Observable<Anime>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override GetEpisodesBySeason(showErrorNotif: boolean, season: number, owner: string): Observable<HttpResponse<never> | HttpResponse<Episode[]>> {
        return this.apiService.get(environment.get_season_api + "/" + season + "&" + owner).pipe(
            map((x: HttpResponse<any> | Observable<Array<Episode>>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override GetTrendings(showErrorNotif: boolean): Observable<HttpResponse<Anime[]> | HttpResponse<never>> {
        return this.apiService.get(environment.get_anime_trendings_api).pipe(
            map((x: HttpResponse<any> | Observable<Array<Anime>>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override GetById(showErrorNotif: boolean, _id: string): Observable<HttpResponse<Anime> | HttpResponse<never>> {
        return this.apiService.get(environment.get_anime_by_id_api + _id).pipe(
            map((x: HttpResponse<any> | Observable<Anime>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    constructor(
        private apiService: ApiService) {
        super();
    }
    override GetAllAnime(showErrorNotif: boolean): Observable<HttpResponse<Array<Anime>>> {
        return this.apiService.get(environment.all_anime_api).pipe(
            map((x: HttpResponse<any> | Observable<Array<Anime>>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }


    catchError(showErrorNotif: boolean, error: any): Observable<never> {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            if (showErrorNotif) {
                //  console.log(error, 'Erreur');
            }
            throw new Error(error);
        }
    } 
    handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T> {
        if (showErrorNotif && response.status == 202) {
            // console.log(response.body, 'Erreur');
            throw new Error(response.body.toString());
        }
        return response;
    }
    downLoadFile(data: any, type: string) {
        let blob = new Blob([data], { type: type });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
    }
} 