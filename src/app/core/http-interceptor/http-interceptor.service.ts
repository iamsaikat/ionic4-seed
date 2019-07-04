import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { APP_API } from '@app/app.config';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor (
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request.clone({
      url: request.url.includes('assets/i18n/') ? `${request.url}` : `${APP_API.ROOT_URL}/${request.url}`,
      setHeaders: {
        Authorization: `jwt ${this.authService.getToken()}`
      }
    });

    return next.handle(authRequest)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }, error => {
       // http response status code
        if (error instanceof HttpErrorResponse) {
          if (error.status > 400 && error.status < 500) {
            console.error('Error status code:', error);
          }
        }
      })
    );
  }
}