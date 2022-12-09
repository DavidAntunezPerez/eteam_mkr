import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Team, TeamService } from '../../.';

export const TASK_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeamShowListComponent),
  multi: true
};

@Component({
  selector: 'app-teamshowlist',
  templateUrl: './teamshowlist.component.html',
  styleUrls: ['./teamshowlist.component.scss'],
})

export class TeamShowListComponent implements OnInit, ControlValueAccessor {

  selectedTeam:Team | undefined;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private tamSvc:TeamService
  ) { }


  writeValue(obj: any): void {
    this.selectedTeam = this.tamSvc.getTeamById(obj);
    console.log(obj);
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

  getTeam(){
    return this.tamSvc.getTeam();
  } 

  onTeamClicked(team:Team, accordion:IonAccordionGroup){
    this.selectedTeam = team;
    accordion.value='';
    this.propagateChange(this.selectedTeam.id);
  }

}
