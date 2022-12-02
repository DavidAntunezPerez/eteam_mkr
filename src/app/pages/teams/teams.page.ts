import { Component, OnInit } from '@angular/core';
import { Team, TeamService, TeamDetailComponent} from '../../core';
import { ModalController, AlertController } from '@ionic/angular';
import { RosterService } from '../../core';
// import { TranslateService } from '@ngx-translate/core';

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
    private rosterSvc:RosterService,
    // private translateService: TranslateService
  ) {}
  // TRANSLATE
  // language: string = this.translateService.currentLang;
  // languageChange() {
  //   this.translateService.use(this.language);
  // }

  ngOnInit() {}

  getTeam() {
    return this.teaminfo.getTeam();
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
            console.log(result.data)
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

  async onDeleteAlert(team:Team) {
    const alert = await this.alert.create({
      header: 'Do you want to delete this team?',
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
            if(team.id){
              this.teaminfo.deleteTeamById(team.id);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onTeamExistsAlert(team:any) {
    const alert = await this.alert.create({
      header: 'Error',
      message: 'Cannot delete this team because it has signed players.',
      cssClass:'alertDelete',
      buttons: [
        {
          cssClass:'alertConfirm',
          text: 'Close',
          role: 'close',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteTeam(team : Team) {
    if (!this.rosterSvc.getRostersByTeamId(team.id).length)
      this.onDeleteAlert(team);
    else this.onTeamExistsAlert(team);
  }

}
