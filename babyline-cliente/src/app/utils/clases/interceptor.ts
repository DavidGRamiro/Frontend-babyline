import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HeaderService } from "../../components/auth/services/header.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> |HttpUserEvent<any>> {
    
      // Excluir la URL de login
      if (req.url.includes('/login')) {
        return next.handle(req);
      }
    
    const authToken = inject(HeaderService).getHeaders();
        const authReq = req.clone({
      headers: req.headers.set('Authorization', `Token ${authToken}`)
    });

    return next.handle(authReq);
  }
}