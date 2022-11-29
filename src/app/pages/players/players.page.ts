import { Component, OnInit } from '@angular/core';
import { Player, PlayerService, PlayerDetailComponent} from '../../core';
import { ModalController, AlertController } from '@ionic/angular';
// import { AssignService } from '../../core/services';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  constructor(
    private playerinfo: PlayerService,
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

  getPlayer() {
    return this.playerinfo.getPlayer();
  }

  async presentPersonForm(player: Player) {
    const modal = await this.modal.create({
      component: PlayerDetailComponent,
      componentProps: {
        player: player,
      },
    });
    modal.present();
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            this.playerinfo.addPlayer(result.data.player);
            break;
          case 'Edit':
            this.playerinfo.updatePlayer(result.data.player);
            break;
          default:
        }
      }
    });
  }

  onNewPlayer() {
    // create player function
    this.presentPersonForm(null!);
  }

  onEditPlayer(player: Player) {
    // edit player function
    this.presentPersonForm(player);
  }

  async onDeleteAlert(player: Player) {
    const alert = await this.alert.create({
      header: 'Do you want to delete this person?',
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
            if(player.id){
              this.playerinfo.deletePlayerById(player.id);
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

  onDeletePlayer(player : Player) {
    // delete player function
    this.onDeleteAlert(player);

    // if (!this.assgnSvc.getAssignmentsByPlayerId(player.id).length)
    //   this.onDeleteAlert(person);
    // else this.onPersonExistsAlert(person);
  }
}
