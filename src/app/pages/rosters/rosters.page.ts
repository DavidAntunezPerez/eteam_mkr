import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RosterDetailComponent,RosterService, Roster } from '../../core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.page.html',
  styleUrls: ['./rosters.page.scss'],
})
export class RostersPage implements OnInit {

  // THIS IS THE ROSTERS PAGE, THIS PAGE WILL CONTAIN ALL DIFERENT ROSTERS CHANGES. THE PLAYERS ARE SIGNED FOR ONLY ONE TEAM, A TEAM CAN HAVE MANY PLAYERS AND EACH PLAYER CAN COMPETE WITH MANY DIFFERENT TEAMS (NOT THE COMMON THING BUT STILL POSSIBLE), WHEN A TEAM SIGNS A PLAYER THEY CANT BE DELETED IN THEIR RESPECTIVE PAGES. YOU CAN SEE THE SIGNING DETAILS TO CHANGE THE PLAYER, TEAM OR DATE OF SIGN.
  
  
  constructor(
    private translateService: TranslateService,
    private rosterSvc: RosterService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  getRosters() {
    return this.rosterSvc.getRosters();
  }

  async RosterForm(roster: Roster) {
    const modal = await this.modal.create({
      component: RosterDetailComponent,
      componentProps: {
        roster:roster
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.rosterSvc.addRoster(result.data.roster);
            break;
          case 'Edit':
            this.rosterSvc.updateRoster(result.data.roster);
            break;
          default:
        }
      }
    });
  }

  onEditRoster(roster:any) {
    this.RosterForm(roster);
  }

  async onDeleteAlert(roster:any) {
    const alert = await this.alert.create({
      header: 'Do you want to fire this player?',
      cssClass: 'alertDelete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
            console.log('Operation cancelled');
          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'alertConfirm',
          handler: () => {
            this.rosterSvc.deleteRosterById(roster.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteRoster(roster:any) {
    this.onDeleteAlert(roster);
  }

  async presentRosterForm(roster: Roster) {
    const modal = await this.modal.create({
      component: RosterDetailComponent,
      componentProps: {
        roster: roster,
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.rosterSvc.addRoster(result.data.roster);
            break;
          case 'Edit':
            this.rosterSvc.updateRoster(result.data.roster);
            break;
          default:
        }
      }
    });
  }

  onNewRoster() {
    // create a new roster new
    this.presentRosterForm(null!);
  }
}
