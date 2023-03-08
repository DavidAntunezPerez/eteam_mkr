import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Team, TeamService } from '../../.';

export const TEAM_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeamShowListComponent),
  multi: true
};

@Component({
  selector: 'app-teamshowlist',
  templateUrl: './teamshowlist.component.html',
  styleUrls: ['./teamshowlist.component.scss'],
  providers:[TEAM_PROFILE_VALUE_ACCESSOR],
})

export class TeamShowListComponent implements OnInit, ControlValueAccessor {

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  selectedTeam:Team | undefined;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private translateService: TranslateService,
    private tamSvc:TeamService
  ) { }


  async writeValue(obj: any) {
    try {
      this.selectedTeam = await this.tamSvc.getTeamById(obj);  
    } catch (error) {
      console.log("Datos no recuperados: "+ error);
    }
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
    return this.tamSvc.getTeamList();
  } 

  onTeamClicked(team:Team, accordion:IonAccordionGroup){
    this.selectedTeam = team;
    accordion.value='';
    this.propagateChange(this.selectedTeam.docId);
  }

}
