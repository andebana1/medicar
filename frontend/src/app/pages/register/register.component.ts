import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public hide: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(){
    this.formRegister = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      savePass: new FormControl(false),
    });
  }
}
