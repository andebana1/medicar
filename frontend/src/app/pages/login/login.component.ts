import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public hide: boolean = true;
  private serverErrorMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.formLogin = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.userService.login(this.formLogin.value).subscribe(
      response=>{
        console.log('response => ', response)
        this.userService.setToken(response);
        this.router.navigateByUrl('/home');
      }, error=>{
        console.log(error);
        this.serverErrorMessage = error;        
      }
    );
  }
}
