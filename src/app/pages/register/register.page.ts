import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private translateService: TranslateService) {}

  // CHANGE LANGUAGE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}
}
