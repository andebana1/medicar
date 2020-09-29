import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { OperationsService } from '../../shared/operations.service';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  public formConsulta: FormGroup;

  public especialidades: any[] = [];
  public medicos: any[] = [];
  public agendas: any[] = [];
  public datas: any[] = [];
  public horarios: any[] = [];
  private agenda_final: any;

  constructor(
    private _fb: FormBuilder,
    private ops: OperationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initFormSubs();
    this.getEspecialidades();
  }

  initForm(){
    this.formConsulta = this._fb.group({
      especialidade: ['', Validators.required],
      medico: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  getDatas(){
    this.agendas.map(agenda => {
      if(this.datas.indexOf(agenda.dia) === -1){
        this.datas.push(agenda.dia);
      }
    });
  }

  initFormSubs(){
    this.formConsulta.get('especialidade').valueChanges.subscribe(value=>{
      this.formConsulta.get('medico').setValue('');
      this.formConsulta.get('data').setValue('');
      this.formConsulta.get('hora').setValue('');
      this.agenda_final = undefined;
      if(value !== '')
        this.ops.getMedicos('especialidade=' + this.formConsulta.get('especialidade').value).subscribe(
          response=>{
            this.medicos = response as any[];
          }
        );  
    });

    this.formConsulta.get('medico').valueChanges.subscribe(value=>{
      this.formConsulta.get('data').setValue('');
      this.formConsulta.get('hora').setValue('');
      this.agenda_final = undefined;
      if(value !== '')
        this.
          ops.
          getAgendas('especialidade=' + this.formConsulta.get('especialidade').value + '&medico=' + this.formConsulta.get('medico').value)
          .subscribe(response=>{
            this.agendas = response as any[];
            this.getDatas();
          });
    });

    this.formConsulta.get('data').valueChanges.subscribe(value=>{
      this.formConsulta.get('hora').setValue('');
      if(value !== ''){
        const query_params = `especialidade=${this.formConsulta.get('especialidade').value}` 
                              + `&medico=${this.formConsulta.get('medico').value}`
                              + `&data_inicio=${this.formConsulta.get('data').value}&data_final=${this.formConsulta.get('data').value}`
        this.ops.getAgendas(query_params).subscribe(response=>{
          this.horarios = response[0].horarios;
          this.agenda_final = response[0];
        });
      }
    });
  }

  especialidadeValida(formControlField){
    // return this.formConsulta.controls.especialidade.value === '';
    return formControlField.value === '';
  }

  async getEspecialidades(){
    this.ops.getEspecialidades().subscribe(
      response => {
        this.especialidades = response as any[];
      }
    );
  }

  cancelConsulta(){
    this.router.navigateByUrl('/home');
  }

  createConsulta(){
    this.ops.createConsulta(this.agenda_final.id, this.formConsulta.get('hora').value).subscribe(response=>{
      Swal.fire(
        'Sucesso!',
        'Consulta agendada com sucesso.',
        'success'
      ).then(result=>{
        this.router.navigateByUrl('/home');
      });
    },erro=>{
      Swal.fire(
        'Erro!',
        'Erro ao agenda consulta. Verifique se os campos estão preeenchidos corretamente e tente novamente.',
        'error'
      );
    });
  }
}
