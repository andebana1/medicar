import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  public formConsulta: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formConsulta = this._fb.group({
      especialidade: ['', Validators.required],
      medico: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }
}
