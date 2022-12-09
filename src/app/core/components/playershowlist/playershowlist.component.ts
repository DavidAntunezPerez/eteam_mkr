import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
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

  selectedPlayer:Player | undefined;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private plySvc:PlayerService
  ) { }


  writeValue(obj: any): void {
    this.selectedPlayer = this.plySvc.getPlayerById(obj);
  }
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
    return this.plySvc.getPlayer();
  } 

  onPlayerClicked(player:Player, accordion:IonAccordionGroup){
    this.selectedPlayer = player;
    accordion.value='';
    this.propagateChange(this.selectedPlayer.id);
  }

}
