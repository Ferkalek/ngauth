import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this._authService.getToken();

    let tokenizedReq = request.clone({
      setHeaders: {
        Autorization: `Bearer ${token}`
      }
    });
    return next.handle(tokenizedReq)
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     alert(`Error:${request.url}`);
    //     return throwError(error);
    //   }),

    //   // request tracing
    //   finalize(() => console.log(`${request.method}: ${request.urlWithParams}`))
    // );
  }
}
