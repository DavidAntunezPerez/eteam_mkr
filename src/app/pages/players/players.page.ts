import { Component, OnInit } from '@angular/core';
import {
  Player,
  PlayerService,
  PlayerDetailComponent,
  RosterService,
} from '../../core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    private rosterSvc: RosterService,
    private translateService: TranslateService
  ) {}
  // TRANSLATE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  getPlayer() {
    return this.playerinfo.player$;
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
      header: this.translateService.instant('alerts.deleteplayer'),
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
              this.playerinfo.deletePlayer(player);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onPlayerExistsAlert(player: any) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.error'),
      message: this.translateService.instant('alerts.cannotdelete'),
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

  onDeletePlayer(player: Player) {
    // delete player function;
    if (!this.rosterSvc.getRostersByPlayerId(player.id).length)
      this.onDeleteAlert(player);
    else this.onPlayerExistsAlert(player);
  }

  // ON FAV ALERT
  async onFavAlert(player: Player) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.favplayer'),
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
            if (player.id) {
              this.playerinfo.addFavPlayer(player);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onFavPlayer(player: Player) {
    // fav player function;
      this.onFavAlert(player);
  }

  // FUNCTION ALREADY FAV
  async onAlreadyFavPlayer(player: any) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.error'),
      message: this.translateService.instant('alerts.alreadyfavplayer'),
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
