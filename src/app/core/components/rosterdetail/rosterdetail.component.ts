import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roster } from '../../.';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rosterdetail',
  templateUrl: './rosterdetail.component.html',
  styleUrls: ['./rosterdetail.component.scss'],
})
export class RosterDetailComponent implements OnInit {

  form: FormGroup; // CREATE FORM
  mode: 'New' | 'Edit' = 'New';

  @Input('roster') set roster(roster: Roster) {
    if (roster) {
      this.form.controls['id'].setValue(roster.id);
      this.form.controls['idPlayer'].setValue(roster.idPlayer);
      this.form.controls['idTeam'].setValue(roster.idTeam);
      this.form.controls['joinDate'].setValue(roster.joinDate);
      this.mode = 'Edit';
    }
  }

  constructor(private formBld: FormBuilder, private modal: ModalController, 
    private translateService: TranslateService
    ) {
      this.form = this.formBld.group({
        id:[null],
        idTeam:[0, [Validators.min(1)]],
        idPlayer:[0, [Validators.min(1)]],
        joinDate:['', [Validators.required]],
      });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({ roster: this.form.value, mode: this.mode }, 'ok');
  }

  // DISMISS FORM FUNCTION
  onDismiss() {
    this.modal.dismiss(null, 'cancel');
  }

  onChangeJoinDate(joinDate:any){
    this.form.controls['joinDate'].setValue(joinDate);
  }
  
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

}
