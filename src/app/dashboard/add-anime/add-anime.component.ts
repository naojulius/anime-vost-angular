import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Anime } from 'src/@cores/entity/anime';
import { NewAnimeReq } from 'src/@cores/entity/service/new-anime-req';
import { AnimeService } from 'src/@cores/services/anime.service';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.scss']
})
export class AddAnimeComponent {
  constructor(
    private formBuilder: FormBuilder,
    private animeService: AnimeService,
    private loadingService: LoadingService,
    private toastService: TostService,
    private router: Router
  ){}
uploadForm: FormGroup = new FormGroup({});
newAnimeReq: NewAnimeReq = new NewAnimeReq();
loading: boolean = false;
step: string = "type";
currentStep: number = 0;
typeClass: string = 'step-warning';
coverClass: string = '';
infoClass: string = "";
image_cover: string = 'background-image: url("/assets/images/covers/4.jpg"); background-repeat: no-repeat; background-size: cover;';
ngOnInit(){
  this.newAnimeReq.category = "Animé";
  this.uploadForm = this.formBuilder.group({
    cover: ['']
  });
}
OnClickNextStep(){
  this.currentStep++;
  if (this.currentStep > 3){
    this.currentStep = 3;
  }
  this.check()
  }
  OnClickPrevStep(){
    this.currentStep--;
    if (this.currentStep <= 0){
      this.currentStep = 0;
    }
    this.check()
    }
check(){
  switch (this.currentStep) {
    case 0:
      this.step =  'type';
      this.typeClass = 'step-warning';
      this.coverClass = '';
      this.infoClass = ''
      
      break;
    case 1:
      this.step =  'cover';
      this.typeClass = 'step-warning';
      this.coverClass = 'step-warning';
      this.infoClass = ''
      break;
    case 2:
      this.step =  'info';
      this.typeClass = 'step-warning';
      this.coverClass = 'step-warning';
      this.infoClass = 'step-warning'
      break;
  }
}



  coverImage64: string = '';
  addCoverPhoto(event: any){
    const file = event.target.files[0];
    if (file){
      this.uploadForm.get('cover')?.setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverImage64 = 'background-image: url("'+reader.result?.toString()+'"); background-repeat: no-repeat; background-size: cover;'
      };
    }

  }
  closing: boolean = false;
  closeButtonClicked(){
    this.closing = true
  }
  save(){
    this.loading = true;
    this.loadingService.startLoading();
    let formData = new FormData();
    formData.append('files', this.uploadForm.get('cover')?.value);
    formData.append('title', this.newAnimeReq.title);
    formData.append('category', this.newAnimeReq.category);
    formData.append('rating', this.newAnimeReq.rating.toString());
    formData.append('synopsys', this.newAnimeReq.synopsys);

    this.animeService.NewAnime(true, formData).subscribe((response: HttpResponse<Anime>)=>{
      this.loading = false;
      this.toastService.show("Enregistrement avec succès.");
      this.router.navigateByUrl(environment.anime_detail_uri, {
        state: {
          id: response.body?._id
        } as any
      });
      this.loadingService.stopLoading();
      console.log(response.body);
    }, error=>{
      this.loading = false;
      this.loadingService.stopLoading();
    })
  }
}
