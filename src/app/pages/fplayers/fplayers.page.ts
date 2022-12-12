import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Player, PlayerService, PlayerDetailComponent } from '../../core';

@Component({
  selector: 'app-fplayers',
  templateUrl: './fplayers.page.html',
  styleUrls: ['./fplayers.page.scss'],
})
export class FplayersPage implements OnInit {
  constructor(
    private translateService: TranslateService,
    private playerinfo: PlayerService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  getPlayer() {
    return this.playerinfo.getPlayerSpecificFav();
  }

  // ON UNFAV ALERT
  async onUnfavAlert(player: Player) {
    const alert = await this.alert.create({
      header: this.translateService.instant('alerts.unfavplayer'),
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
              this.playerinfo.deleteFavPlayer(player);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onUnfavPlayer(player: Player) {
    // unfav player function;
      this.onUnfavAlert(player);
  }
}
