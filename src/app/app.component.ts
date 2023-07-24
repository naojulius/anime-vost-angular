import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/@cores/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  loadingSubscription: Subscription = new Subscription();
  title = 'anime_vost';
  loading: any = false;
  constructor(private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
