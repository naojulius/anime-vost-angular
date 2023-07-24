import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { Anime } from "src/@cores/entity/anime";
import { Episode } from "src/@cores/entity/episode";
import { AuthInfo } from "src/@cores/entity/service/auth-info";
import { RegistrationInfo } from "src/@cores/entity/service/registration-info";
import { User } from "src/@cores/entity/user";
import { AnimeService } from "src/@cores/services/anime.service";
import { ApiService } from "src/@cores/services/api.service";
import { UserService } from "src/@cores/services/user.service";
import { environment } from "src/environments/environment";

@Injectable()

export class ApiUserService extends UserService {

    constructor(
        private apiService: ApiService) {
        super();
    }
    override Login(showErrorNotif: boolean, user: AuthInfo): Observable<HttpResponse<User>> {
        return this.apiService.post<AuthInfo>(environment.auth_login_api, user).pipe(
            map((x: HttpResponse<any> | Observable<User>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override Register(showErrorNotif: boolean, user: RegistrationInfo): Observable<HttpResponse<User>> {
        return this.apiService.post<RegistrationInfo>(environment.auth_register_api, user).pipe(
            map((x: HttpResponse<any> | Observable<User>) => {
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