import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private translateService: TranslateService,
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email : new FormControl(),
      password: new FormControl()
    })
   }

   // CHANGE LANGUAGE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit() {}

  onSubmit(){
    this.userService.register(this.formReg.value)
    .then( response => {
      console.log(response)
      this.router.navigate(['/login'])
    } )
    .catch(error => console.log(error))
  }

  onLogin(){
    this.router.navigate(['/login'])
  }
}
