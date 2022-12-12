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

  // ON DELETE ALERT
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
            if (player.id) {
              this.playerinfo.deletePlayerById(player.id);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  onDeletePlayer(player: Player) {
    // delete player function;
      this.onDeleteAlert(player);
  }
}
