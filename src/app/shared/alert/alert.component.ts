import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector:'app-alert',
    templateUrl:'./alert.component.html',
    styleUrls:['./alert.component.css'],
})

export class AlertComponent implements OnInit{
    constructor(private auth: AuthService){}
    ngOnInit(): void {
    }
    @Input()message: string;
    @Output()closeDiag = new EventEmitter<boolean>()
    onClose(){
        this.closeDiag.emit(true)
    }
}
