import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoadingService } from 'src/@cores/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    
    if (!req.url.endsWith(environment.new_anime_api) && !req.url.endsWith(environment.new_episode_api)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    }
    return this.handleRequest(req, next);
  }
  handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    // const JWT = `Bearer ${this.authService.getToken()}`;
    const JWT = '';
    req = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next.handle(req);
  }
}