import { Component, OnInit } from '@angular/core';
import { Team, TeamService, TeamDetailComponent} from '../../core';
import { ModalController, AlertController } from '@ionic/angular';
// import { AssignService } from '../../core/services';
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
    // private assgnSvc:AssignService,
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

  // async onPersonExistsAlert(task) {
  //   const alert = await this.alert.create({
  //     header: 'Error',
  //     message: 'Cannot delete this person because its assigned to a task.',
  //     buttons: [
  //       {
  //         text: 'Close',
  //         role: 'close',
  //         handler: () => {},
  //       },
  //     ],
  //   });

  //   await alert.present();

  //   const { role } = await alert.onDidDismiss();
  // }

  onDeleteTeam(team : Team) {
    // delete team function
    this.onDeleteAlert(team);

    // if (!this.assgnSvc.getRostersByPlayerId(player.id).length)
    //   this.onDeleteAlert(person);
    // else this.onPersonExistsAlert(person);
  }

}
