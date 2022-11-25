import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../models';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-playerdetail',
  templateUrl: './playerdetail.component.html',
  styleUrls: ['./playerdetail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  form: FormGroup; // CREATE FORM
  mode: 'New' | 'Edit' = 'New';

  @Input('player') set player(ply: Player) {
    if (ply) {
      this.form.controls['id'].setValue(ply.id);
      this.form.controls['name'].setValue(ply.name);
      this.form.controls['surname'].setValue(ply.surname);
      this.form.controls['nick'].setValue(ply.nick);
      this.form.controls['age'].setValue(ply.age);
      this.form.controls['kda'].setValue(ply.kda);
      this.form.controls['role'].setValue(ply.role);
      this.form.controls['picture'].setValue(ply.picture);
      this.mode = 'Edit';
    }
  }

  constructor(
    private formBld: FormBuilder,
    private modal: ModalController,
    private translateService: TranslateService
  ) {
    this.form = this.formBld.group({
      id: [null],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      nick: ['', Validators.required],
      age: ['', Validators.required],
      kda: ['', Validators.required],
      role: ['', Validators.required],
      picture: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({ person: this.form.value, mode: this.mode }, 'ok');
  }

  // DISMISS FORM FUNCTION
  onDismiss() {
    this.modal.dismiss(null, 'cancel');
  }
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }
}
