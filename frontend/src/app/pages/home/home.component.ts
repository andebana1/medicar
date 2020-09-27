import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../shared/operations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tableHeaders: string[] = ['especialidade', 'nome', 'dia', 'horario', 'button'];
  public groupedColumns: string[] = ['grouped'];
  public tableData: any[] = [];

  constructor(private opService: OperationsService) { }

  ngOnInit(): void {
    this.getConsultas();
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

}
