import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anime } from "../entity/anime";
import { Episode } from "../entity/episode";
import { AuthInfo } from "../entity/service/auth-info";
import { User } from "../entity/user";
import { RegistrationInfo } from "../entity/service/registration-info";

@Injectable()
export abstract class UserService{
    abstract Login(showErrorNotif:boolean, user: AuthInfo): Observable<HttpResponse<User>>;
    abstract Register(showErrorNotif:boolean, user: RegistrationInfo): Observable<HttpResponse<User>>;
}