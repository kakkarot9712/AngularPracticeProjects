import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from 'rxjs'
import { UserModel } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment"; 

export interface AuthResponse{
    idToken: string,
    email: string,
    refreshToken : string,
    expiresIn: string,
    localId: string
    registered?: boolean
}

@Injectable({providedIn:'root'})

export class AuthService {
    constructor(private http: HttpClient, private router: Router){}
    // Set firebase api key in environment.ts and environment.prod.ts with key firebaseKey
    private apikey = environment.firbaseKey;
    user = new BehaviorSubject<UserModel>
    (null);
    private logouttimer: any
    signup(email: string, password: string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}`,{
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError))
    }
    
    login(email: string, password: string){
        return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}`,{
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError),tap((response)=>{
           this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn)
        }))
    }

    logout(){
        this.user.next(null)
        localStorage.removeItem('userData')
        this.router.navigate(['auth'])
        if(this.logouttimer){
            clearTimeout(this.logouttimer)
        }
    }

    autoLogout(expirytime: number){
        console.log(expirytime)
        this.logouttimer = setTimeout(()=>{
            this.logout()
        }, expirytime)
    }

    autoLogin(){
        const userData: {
            email: string, 
            id: string,
            _token: string,
            _tokenExpiresIn: string
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return
        }
        const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpiresIn))
        if(loadedUser.token){
            this.user.next(loadedUser)
            const expiry = new Date((userData._tokenExpiresIn)).getTime() - new Date().getTime()
            this.autoLogout(expiry)
        }
    }

    private handleAuth(email: string, userId:string, token: string, expiresIn: number){
        const expiry = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserModel(email, userId, token, expiry);
        this.user.next(user);
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse){
        let errormsg = "An unknown error occured!"
            if(errorRes == null || errorRes.error.error == null){
                return throwError(() => new Error(errormsg))
            }
            switch(errorRes.error.error.message){
                case "EMAIL_NOT_FOUND":
                    errormsg = "Provided email does not exists"
                    break;
                
                case "INVALID_PASSWORD":
                    errormsg = "Provided Password is invalid!"
                    break;
                
                case "EMAIL_EXISTS":
                    errormsg = "This email is already exists"
                    break;
            }
            return throwError(()=> new Error(errormsg))
        }
}
