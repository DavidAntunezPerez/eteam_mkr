import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Player,PlayerService } from '../../';

export const PLAYER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlayerShowListComponent),
  multi: true
};

@Component({
  selector: 'app-playershowlist',
  templateUrl: './playershowlist.component.html',
  styleUrls: ['./playershowlist.component.scss'],
  providers:[PLAYER_PROFILE_VALUE_ACCESSOR],
})
export class PlayerShowListComponent implements OnInit, ControlValueAccessor {

  // TRANSLATE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  selectedPlayer:Player | undefined;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private plySvc:PlayerService,
    private translateService: TranslateService
  ) { }

  async writeValue(obj: any) {
    try {
      this.selectedPlayer = await this.plySvc.getPlayerById(obj);  
    } catch (error) {
      console.log("Datos no recuperados: "+ error);
    }
  }
    

  // writeValue(obj: any): void {
  //   this.selectedPlayer = this.plySvc.getPlayerById(obj);
  // }



  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getPlayer(){
    return this.plySvc.getPlayerList();
  } 

  onPlayerClicked(player:Player, accordion:IonAccordionGroup){
    this.selectedPlayer = player;
    accordion.value='';
    this.propagateChange(this.selectedPlayer.docId);
  }

}
