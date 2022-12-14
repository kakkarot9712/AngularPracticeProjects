import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.user.pipe(take(1),exhaustMap(user => {
            if(!user){
                return next.handle(req)
            }
            const modifiedReq = req.clone({params: new HttpParams().set('auth',user.token)})
            return next.handle(modifiedReq)
        }))
    }
}
