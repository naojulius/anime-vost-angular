import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfo } from 'src/@cores/entity/service/auth-info';
import { User } from 'src/@cores/entity/user';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { UserService } from 'src/@cores/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;
  constructor(
    private loadingService :LoadingService,
    private userService: UserService,
    private toastService: TostService,
    private router: Router,
  ){
    this.authInfo.email = "nao@email.com";
    this.authInfo.password = "123456789";
  }
  authInfo: AuthInfo = new AuthInfo();
  login(){
    this.loading = true;
    this.loadingService.startLoading();
    this.userService.Login(true, this.authInfo).subscribe((response: HttpResponse<string>)=>{
      this.toastService.show("Connexion avec succès.")
     if(response.body){
      localStorage.setItem(environment.jwt, response.body);
     }
      this.loading = false;
      this.loadingService.stopLoading();
      this.router.navigateByUrl(environment.dahboard_uri)
    }, error =>{
      this.loading = false;
      this.loadingService.stopLoading();
    })
  }
}
