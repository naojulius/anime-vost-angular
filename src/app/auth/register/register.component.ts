import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegistrationInfo } from 'src/@cores/entity/service/registration-info';
import { User } from 'src/@cores/entity/user';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { UserService } from 'src/@cores/services/user.service';

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
  ){}
  loading: boolean = false;
  registrationInfo: RegistrationInfo = new RegistrationInfo();
  password_not_matched: string = "";
  register(){
    if (this.registrationInfo.password != this.registrationInfo.password_confirm){
      this.password_not_matched = "input-bordered input-warning ";
    }else{
    this.password_not_matched = "";

    this.userService.Register(true, this.registrationInfo).subscribe((response: HttpResponse<User>)=>{
      this.toastService.show("Souscription avec succès.")
      this.loading = false;
      this.loadingService.stopLoading();
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
