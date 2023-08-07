import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { Anime } from "src/@cores/entity/anime";
import { DataTable } from "src/@cores/entity/data-table";
import { Episode } from "src/@cores/entity/episode";
import { AuthInfo } from "src/@cores/entity/service/auth-info";
import { DataTableReq } from "src/@cores/entity/service/data-table-req";
import { RegistrationInfo } from "src/@cores/entity/service/registration-info";
import { User } from "src/@cores/entity/user";
import { AnimeService } from "src/@cores/services/anime.service";
import { ApiService } from "src/@cores/services/api.service";
import { UserService } from "src/@cores/services/user.service";
import { environment } from "src/environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()

export class ApiUserService extends UserService {



    constructor(
        private apiService: ApiService,
        public jwtHelper: JwtHelperService,
        ) {
        super();
    }

    override IsAuthenticated(): boolean {
        let token= localStorage.getItem(environment.jwt);
        if(token){
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
    }
    override Logout(): void {
        localStorage.removeItem(environment.jwt);
        window.location.reload();
    }
    override getParam(param: string): string {
        let token= localStorage.getItem(environment.jwt);
        if(token){
            var j = this.jwtHelper.decodeToken(token)[param]
            if(param == "roles"){
               return typeof j == "string"? [j] : j;
            }
            return j;
        }
        return "";
    }

    override GetCookie(showErrorNotif: boolean): Observable<HttpResponse<any>> {
        return this.apiService.get("/cookie").pipe(
            map((x: HttpResponse<any> | Observable<any>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override GetTable(showErrorNotif: boolean, table: DataTableReq): Observable<HttpResponse<DataTable>> {
        return this.apiService.post<DataTableReq>(environment.get_usertable_api, table).pipe(
            map((x: HttpResponse<any> | Observable<DataTable>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override Login(showErrorNotif: boolean, user: AuthInfo): Observable<HttpResponse<string>> {
        return this.apiService.post<AuthInfo>(environment.auth_login_api, user).pipe(
            map((x: HttpResponse<any> | Observable<string>) => {
                return this.handleResponse<any>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }
    override Register(showErrorNotif: boolean, user: RegistrationInfo): Observable<HttpResponse<string>> {
        return this.apiService.post<RegistrationInfo>(environment.auth_register_api, user).pipe(
            map((x: HttpResponse<any> | Observable<string>) => {
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