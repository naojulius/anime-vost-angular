import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthGuardService{
  constructor(public userService: UserService, public router: Router) { }
  canActivate(): boolean {
    if (!this.userService.IsAuthenticated()) {
      this.router.navigateByUrl(environment.login_page);
      return false;
    }
    return true;
  }
}