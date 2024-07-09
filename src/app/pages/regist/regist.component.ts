import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/User'

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent {

  registForm = this.createForm({
    email: '',
    password: '',
    rePassword: '',
    userName: ''
  });

  constructor(private location: Location, protected auth: AuthService, protected router: Router, private formBuilder: FormBuilder, private userService: UserService){

  }

  createForm(model: any) {
    let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    let formGroup = this.formBuilder.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.pattern(emailRegex)]);
    formGroup.get('userName')?.addValidators([Validators.required, Validators.minLength(2)]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
    formGroup.get('rePassword')?.addValidators([Validators.required, Validators.minLength(6)]);
    return formGroup;
  }

  onSubmit(){
    if(this.registForm.get('password')?.value !== this.registForm.get('rePassword')?.value){
      window.alert('Passwords don\'t match');
      return;
    }
 
    this.auth.register(this.registForm.get('email')?.value as string, this.registForm.get('password')?.value as string, this.registForm.get('userName')?.value as string)
    .then(cred => {
      const user : User = {
        id: cred.user?.uid as string,
        email: this.registForm.get('email')?.value as string,
        userName: this.registForm.get('userName')?.value as string,
        
      };
      this.userService.create(user).then(_ => {
        console.log('User added!');
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.log(error);
      });
    }).catch(err => {
      alert(err);
    });
  }

  goBack(){
    this.location.back();
  }

}
