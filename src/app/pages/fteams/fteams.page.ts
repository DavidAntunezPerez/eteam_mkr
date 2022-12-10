import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fteams',
  templateUrl: './fteams.page.html',
  styleUrls: ['./fteams.page.scss'],
})
export class FteamsPage implements OnInit {

  constructor(private translateService: TranslateService) { }

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {
  }

}
