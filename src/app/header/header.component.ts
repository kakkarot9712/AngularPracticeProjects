import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { UserModel } from "../auth/user.model";
import { DataStorage } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    authSub = new Subscription()
    isLoggedIn = false
    constructor(private datebase: DataStorage, private auth: AuthService){}
    ngOnInit(): void {
        this.authSub = this.auth.user.subscribe((user: UserModel)=>{
            if(user!=null){
                this.isLoggedIn = true
            }
        })
    }
    onSave(){
        this.datebase.saveData();
    }

    onFetch(){
        this.datebase.fetchData().subscribe();
    }

    onLogout(){
        this.auth.logout()
        this.isLoggedIn = false
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe()
    }
}
