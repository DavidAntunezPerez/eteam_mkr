import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RosterDetailComponent,RosterService, Roster } from '../../core';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.page.html',
  styleUrls: ['./rosters.page.scss'],
})
export class RostersPage implements OnInit {

  // THIS IS THE ROSTERS PAGE, THIS PAGE WILL CONTAIN ALL DIFERENT ROSTERS, WHICH CONSIST OF A TEAM AND ONE OR MORE PLAYERS (DEPENDING ON THE SITUATION, GAME...). EVERY TEAM WILL BE IN THIS PAGE WITH SOME OR ANY PLAYERS, BUT NOT ALL THE PLAYERS WILL BE IN THIS PAGE, SOME PLAYERS HAVE NO TEAM (USUALLY WE SAY THEY ARE LFT (LOOKING FOR TEAM)), SO THEY WILL NOT APPEAR IN HERE. IN THIS PAGE YOU WILL BE ABLE TO CHECK TEAM ROSTERS AND DELETE SOME PLAYERS FROM IT (FIRE THE PLAYER FROM THE TEAM).
  
  
  constructor(
    // private translateService: TranslateService,
    private rosterSvc: RosterService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  // language: string = this.translateService.currentLang;
  // languageChange() {
  //   this.translateService.use(this.language);
  // }

  ngOnInit() {}

  getRosters() {
    return this.rosterSvc.getRosters();
  }

  async RosterForm(roster: Roster) {
    const modal = await this.modal.create({
      component: RosterDetailComponent,
      componentProps: {
        assignment:roster
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
}
