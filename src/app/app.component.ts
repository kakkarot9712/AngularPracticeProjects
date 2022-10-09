import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'project-1';
  constructor(private auth: AuthService, private logservice: LoggingService){}
  ngOnInit(): void {
    this.auth.autoLogin()
    this.logservice.printLog("Hello from appcomponent")
  }
}
