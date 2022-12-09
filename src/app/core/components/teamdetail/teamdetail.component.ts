import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../models';
import { ModalController } from '@ionic/angular';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamdetail.component.html',
  styleUrls: ['./teamdetail.component.scss'],
})
export class TeamDetailComponent implements OnInit {

  form: FormGroup; // CREATE FORM
  mode: 'New' | 'Edit' = 'New';

  @Input('team') set team(team: Team) {
    if (team) {
      console.log(team);
      this.form.controls['id'].setValue(team.id);
      this.form.controls['name'].setValue(team.name);
      this.form.controls['tag'].setValue(team.tag);
      this.form.controls['titles'].setValue(team.titles);
      this.form.controls['coach'].setValue(team.coach);
      this.form.controls['wr'].setValue(team.wr);
      this.form.controls['picture'].setValue(team.picture);
      this.mode = 'Edit';
    }
  }

  constructor(
    private formBld: FormBuilder,
    private modal: ModalController,
    // private translateService: TranslateService
  ) {
    this.form = this.formBld.group({
      id: [null],
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      titles: [''],
      coach: ['', Validators.required],
      wr: ['', Validators.required],
      picture: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({ team: this.form.value, mode: this.mode }, 'ok');
  }

  // DISMISS FORM FUNCTION
  onDismiss() {
    this.modal.dismiss(null, 'cancel');
  }
  // language: string = this.translateService.currentLang;
  // languageChange() {
  //   this.translateService.use(this.language);
  // }

}
