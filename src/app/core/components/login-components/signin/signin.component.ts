import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {


  formLogin: FormGroup;

  constructor(
    private translateService: TranslateService,
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password : new FormControl()
    })
   }

   // CHANGE LANGUAGE
  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

  ngOnInit(): void {}

  onSubmit(){
    this.userService.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/home'])
    })
    .catch(error => console.log(error));
  }

  onRegister(){
    this.router.navigate(['/register'])
  }

  onClick(){
    this.userService.loginWithGoogle()
    .then( response =>{
        console.log(response);
        this.router.navigate(['/home']);
    } )
    .catch( error => console.log(error))
  }

}
