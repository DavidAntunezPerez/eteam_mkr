import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private userService: UserService,private translateService: TranslateService, private router: Router) {}
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }
  ngOnInit() {}

  onClick(){
    this.userService.logout()
    .then(()=>{
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error))
  }
}
