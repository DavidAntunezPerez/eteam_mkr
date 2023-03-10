import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Team, TeamService } from '../../core';

@Component({
  selector: 'app-fteams',
  templateUrl: './fteams.page.html',
  styleUrls: ['./fteams.page.scss'],
})
export class FteamsPage implements OnInit {
  constructor(
    private translateService: TranslateService,
    private teaminfo: TeamService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  getTeam() {
    return this.teaminfo.getTeamSpecificFav();
  }

  // ON UNFAV ALERT
  async onUnfavAlert(team: Team) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.unfavteam'),
      cssClass: 'alertDelete',
      buttons: [
        {
          text: this.translateService.instant('alerts.cancel'),
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
            console.log('Operation cancelled');
          },
        },
        {
          text: this.translateService.instant('alerts.unfav'),
          role: 'confirm',
          cssClass: 'alertConfirm',
          handler: () => {
            if (team.id) {
              this.teaminfo.deleteFavTeam(team);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onUnfavTeam(team: Team) {
    // unfav team function;
    this.onUnfavAlert(team);
  }
}
