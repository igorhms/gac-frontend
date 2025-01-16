import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor {
  authIntercept(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> {
    const loginService = inject(LoginService);

    const token = loginService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          loginService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
