import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  private credentials: any = undefined;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.credentials = this.userService.getCredentials();
    console.log(this.credentials)
    this.initForms();
  }

  initForms() {
    this.formLogin = this._fb.group({
      username: [this.credentials !== undefined ? this.credentials.username : '', Validators.required],
      password: [this.credentials !== undefined ? this.credentials.password : '', Validators.required],
      savePass: new FormControl(this.credentials !== undefined ? true : false),
    });
  }

  login(){
    this.userService.login(this.formLogin.value).subscribe(
      response=>{
        this.userService.setToken(response);
        if(this.formLogin.get('savePass').value){
          this.userService.saveCredentials(this.formLogin.value);
        }
        this.router.navigateByUrl('/home');
      }, error=>{
        Swal.fire(
          'Erro ao realizar login',
          'Não foi possível realizar o login com essas credenciais. Verifique os dados e tente novamente.',
          'error'
        );
      }
    );
  }
}
