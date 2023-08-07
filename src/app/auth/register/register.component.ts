import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationInfo } from 'src/@cores/entity/service/registration-info';
import { User } from 'src/@cores/entity/user';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { UserService } from 'src/@cores/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private loadingService: LoadingService,
    private userService: UserService,
    private toastService: TostService,
    private router: Router,
  ){}
  loading: boolean = false;
  registrationInfo: RegistrationInfo = new RegistrationInfo();
  password_not_matched: string = "";
  register(){
    if (this.registrationInfo.password != this.registrationInfo.password_confirm){
      this.password_not_matched = "input-bordered input-warning ";
    }else{
    this.password_not_matched = "";

    this.userService.Register(true, this.registrationInfo).subscribe((response: HttpResponse<string>)=>{
      this.toastService.show("Souscription avec succès.")
      if(response.body){
        localStorage.setItem(environment.jwt, response.body);
       }
     
      this.loading = false;
      this.loadingService.stopLoading();
      this.router.navigateByUrl(environment.dahboard_uri)
    }, error =>{
      this.toastService.show("Une Erreur s'est produite.")
      this.loading = false;
      this.loadingService.stopLoading();
    })


    this.loading = true;
    this.loadingService.startLoading();
    console.log(this.registrationInfo);
    }
    
  }
}
