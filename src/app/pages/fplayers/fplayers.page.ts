import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fplayers',
  templateUrl: './fplayers.page.html',
  styleUrls: ['./fplayers.page.scss'],
})
export class FplayersPage implements OnInit {

  constructor(private translateService: TranslateService) { }

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {
  }

}
