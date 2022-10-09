import { Component, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponse, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:"./auth.component.html"
})

export class AuthComponent implements OnDestroy{
    constructor(private authservice: AuthService, private router: Router, /* private factory: ComponentFactoryResolver - prior v13*/){}
    @ViewChild(PlaceholderDirective)alertHost: PlaceholderDirective
    inLogin = true
    isLoading = false
    error: string = null
    close: Subscription;

    onSwitchMode(){
        this.inLogin = !this.inLogin
    }

    closeDiag(){
        this.error = null
    }

    onSubmit(auth: NgForm){
        let authobs = new Observable<AuthResponse>()
        this.isLoading = true
        if(this.inLogin){
            authobs =  this.authservice.login(auth.value.email, auth.value.password)
        }
        else{
            authobs = this.authservice.signup(auth.value.email, auth.value.password)
        }
        authobs.subscribe({
            next:(response)=>{
                this.isLoading = false
                this.router.navigate(['/recipe']);
                console.log("after Nav")
            },
            error:(errormsg)=>{
                this.showErrorAlert(errormsg)
                this.error = errormsg
                this.isLoading = false
            }
        })
        auth.reset()
    }
    
    private showErrorAlert(message: string){
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const ComponentRef = hostViewContainerRef.createComponent(AlertComponent);
        ComponentRef.instance.message = message
        this.close = ComponentRef.instance.closeDiag.subscribe((resp: boolean)=>{
            hostViewContainerRef.clear();
        })
    }

    ngOnDestroy(): void {
        if (this.close){
            this.close.unsubscribe()
        }
    }
}