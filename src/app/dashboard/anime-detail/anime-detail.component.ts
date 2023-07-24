import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ActionConfig } from 'src/@cores/entity/action-config';
import { Anime } from 'src/@cores/entity/anime';
import { Episode } from 'src/@cores/entity/episode';
import { NewEpisode } from 'src/@cores/entity/service/new-episode-req';
import { StreamInfo } from 'src/@cores/entity/service/stream-info.service';
import { AnimeService } from 'src/@cores/services/anime.service';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
})
export class AnimeDetailComponent{
  actionConfigs: Array<ActionConfig> = new Array<ActionConfig>();
  private state$!: Observable<any>;
  newEpisode: NewEpisode = new NewEpisode();
  image: string = '';
  video: string = "/assets/video/";
  anime: Anime = new Anime();
  episodes: Array<Episode> = [];
  streamInfo: StreamInfo = new StreamInfo();
  uploadForm: FormGroup = new FormGroup({});
  videoStream: string = "";
  loading: boolean = false;
  constructor(
    private animeService: AnimeService,
    private activatedRouter: ActivatedRoute,
    private elRef: ElementRef,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private toastService: TostService
  ){
    
  }

  ngOnInit(){
    this.newEpisode.type = "Episode";
    this.uploadForm = this.formBuilder.group({
      video: ['']
    });
    this.image = environment.api_host + environment.image_api;
    this.loadingService.startLoading()
    this.state$ = this.activatedRouter.paramMap.pipe(map(() => window.history.state))
    this.state$.subscribe(data => {  
      if(data.id){
        // this.anime = data.data
        this.animeService.GetById(true, data.id).subscribe((response: HttpResponse<Anime>)=>{
          this.anime = response.body as Anime;
          if (this.anime.trailer){
            this.videoStream = environment.stream_video + this.anime.trailer.video + "&" + 'trailers';
            
          }
          this.getSeason();
        }, error=>{
          this.loadingService.stopLoading()
        })
      }else{
       window.history.back();
      }
    });
  }
  SetVideoReader($video: string,  type: string, episode?: number, season?: number ){
    this.loadingService.startLoading()
    this.videoStream =  environment.stream_video + $video + "&" + type;
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();
    if (episode && season){
      this.streamInfo.episode = episode;
      this.streamInfo.season = season;
    }else{
      this.streamInfo = new StreamInfo();
    }
    this.loadingService.stopLoading()
  }
  save(){
    this.newEpisode.owner = this.anime._id;
    this.loading = true;
    this.loadingService.startLoading();
    let formData = new FormData();
    formData.append('files', this.uploadForm.get('video')?.value);
    formData.append('owner', this.newEpisode.owner);
    formData.append('season', this.newEpisode.season);
    formData.append('episode', this.newEpisode.episode);
    this.animeService.NewEpisode(true, formData).subscribe((response: HttpResponse<Episode>)=>{
      this.getSeason();
      this.toastService.show("Ajout avec succès.")
      this.loading = false;
    this.loadingService.stopLoading();
    }, error=>{
      this.loading = false;
      this.loadingService.stopLoading();
    })

  }
  videoName: string = "";
  addVideo(event: any){
    const file = event.target.files[0];
    if (file){
      this.videoName = file.name;
      this.uploadForm.get('video')?.setValue(file);
    }
  }
  onChangeSeason(event: any){
    this.getSeason(event.target.value);

  }
  show_cover_img: boolean = false;
  getSeason(val?: number){
    let saison: number = 1;
    if (val){
      saison = val;
    }
    this.loading = true;
    this.loadingService.startLoading();
    this.animeService.GetEpisodesBySeason(true, saison , this.anime._id).subscribe((response: HttpResponse<Array<Episode>>)=>{
      this.episodes = response.body as Array<Episode>;
      
      let episode_1: Episode = this.episodes.find(x=>x.episode == 1) as Episode;
      if(episode_1){
        this.videoStream = environment.stream_video + episode_1.video + "&" + 'episodes';
        this.show_cover_img = false;
      }else{
        this.show_cover_img = true;
      }
      
      this.loading = false;
      this.loadingService.stopLoading()
    }, error=>{
      this.loading = false;
      this.loadingService.stopLoading()
    })
  }
}
