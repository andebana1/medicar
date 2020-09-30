import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../shared/operations.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tableHeaders: string[] = ['especialidade', 'nome', 'dia', 'horario', 'button'];
  public groupedColumns: string[] = ['grouped'];
  public tableData: any[] = [];
  public username: string = '';

  constructor(
    private opService: OperationsService, 
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getConsultas();
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(response=>{
      this.userService.setUserData(response);
      this.username = this.userService.getUserName();
    });
  }

  getConsultas(){
    this.opService.getConsultas().subscribe(
      response=>{
        this.tableData = response as any[];
      },err=>{
        this.tableData = [];
      }
    );
  }

  criarConsulta(){
    this.router.navigateByUrl('/nova-consulta');
  }

  desmarcarConsulta(id: number){
    this.opService.uncheckConsulta(id).subscribe(
      response=>{
        this.tableData = this.tableData.filter(tbdt => tbdt.id !== id);
        Swal.fire(
          'Sucesso ao desmarcar consulta',
          'Sua consulta foi desmarcada com sucesso.',
          'success'
        );
      }, erro=>{
        console.log(erro);
        Swal.fire(
          'Erro ao desmarcar consulta',
          'Lembre-se: Consultas de datas e/ou horários que já passaram não podem ser desmarcadas.',
          'error'
        );
      }
    );
  }

  logout(){
    this.userService.logout().subscribe(
      response=>{
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
      }
    );
  }
}
