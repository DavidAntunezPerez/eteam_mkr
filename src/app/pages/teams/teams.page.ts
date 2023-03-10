import { Component, OnInit } from '@angular/core';
import { Team, TeamService, TeamDetailComponent } from '../../core';
import { ModalController, AlertController } from '@ionic/angular';
import { RosterService } from '../../core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  constructor(
    private teaminfo: TeamService,
    private modal: ModalController,
    private alert: AlertController,
    private rosterSvc: RosterService,
    private translateService: TranslateService
  ) {}
  // TRANSLATE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  getTeam() {
    return this.teaminfo.getTeamList();
  }

  async presentPersonForm(team: Team) {
    const modal = await this.modal.create({
      component: TeamDetailComponent,
      componentProps: {
        team: team,
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.teaminfo.addTeam(result.data.team);
            break;
          case 'Edit':
            this.teaminfo.updateTeam(result.data.team);
            break;
          default:
        }
      }
    });
  }

  onNewTeam() {
    // create team function
    this.presentPersonForm(null!);
  }

  onEditTeam(team: Team) {
    // edit team function
    this.presentPersonForm(team);
  }

  async onDeleteAlert(team: Team) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.deleteteam'),
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
          text: this.translateService.instant('alerts.delete'),
          role: 'confirm',
          cssClass: 'alertConfirm',
          handler: () => {
              this.teaminfo.deleteTeam(team);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onTeamExistsAlert(team: any) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.error'),
      message: this.translateService.instant('alerts.cannotdeleteteam'),
      cssClass: 'alertDelete',
      buttons: [
        {
          cssClass: 'alertConfirm',
          text: this.translateService.instant('alerts.close'),
          role: 'close',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteTeam(team: Team) {
    if (!this.rosterSvc.getRostersByTeamId(team.id).length)
      this.onDeleteAlert(team);
    else this.onTeamExistsAlert(team);
  }

  // ON FAV ALERT
  async onFavAlert(team: Team) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.favteam'),
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
              this.teaminfo.addFavTeam(team);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onFavTeam(team: Team) {
    // fav team function;
      this.onFavAlert(team);
  }

  // ON ALREADY FAV ALERT
  async onAlreadyFavTeam(team: any) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.error'),
      message: this.translateService.instant('alerts.alreadyfavteam'),
      cssClass: 'alertDelete',
      buttons: [
        {
          text: this.translateService.instant('alerts.close'),
          cssClass: 'alertConfirm',
          role: 'close',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
