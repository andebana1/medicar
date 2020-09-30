import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  createUser(){
    if(this.formRegister.get('password').value !== this.formRegister.get('password2').value){
      Swal.fire(
        'Erro ao criar usuário',
        'As senhas não são iguais. Verifique isso e tente novamente.',
        'error'
      );
    }else{
      this.userservice.createUser(this.formRegister.value).subscribe(
        response => {
          Swal.fire(
            'Usuário criado com sucesso',
            'O seu usuário foi criado com sucesso. Utilize o e-mail informado para logar.',
            'success'
          ).then(data=>{
            this.router.navigateByUrl('/login');
          });  
        }, erro => {
          Swal.fire(
            'Erro ao criar usuário',
            'Verifique os campos e tente novamente',
            'error'
          );
        }
      );
    }
  }
}
