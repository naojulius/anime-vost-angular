import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anime } from "../entity/anime";
import { Episode } from "../entity/episode";
import { AuthInfo } from "../entity/service/auth-info";
import { User } from "../entity/user";
import { RegistrationInfo } from "../entity/service/registration-info";
import { DataTableReq } from "../entity/service/data-table-req";
import { DataTable } from "../entity/data-table";

@Injectable()
export abstract class UserService{
    abstract Login(showErrorNotif:boolean, user: AuthInfo): Observable<HttpResponse<string>>;
    abstract Register(showErrorNotif:boolean, user: RegistrationInfo): Observable<HttpResponse<string>>;
    abstract GetTable(showErrorNotif:boolean, table: DataTableReq): Observable<HttpResponse<DataTable>>;
    abstract GetCookie(showErrorNotif:boolean): Observable<HttpResponse<any>>;
    abstract IsAuthenticated(): boolean;
    abstract Logout(): void;
    abstract getParam(param: string): string;
}