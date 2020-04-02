import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';


import { Candidato } from '../model/candidato';
import { CandidatoService } from '../services/candidato.service';



@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

  candidato: Candidato[];
  idCandidato: any;

  constructor(
    private candidatoService: CandidatoService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.listCandidato();
  }

  listCandidato() {
    debugger;
    this.candidatoService.listCandidato().subscribe(
      res => {
          this.candidato = res;
      },
      error => {
      }
    );
  }

  onEditar(id) {
    this.router.navigate(['editar/' + id]);
  }

  onVisualizar(id) {
    this.router.navigate([id], { state: { isDisabled: true } });
  }

  deletar(id) {
    debugger;
    this.candidatoService.delete(id).subscribe(res => {
    });
    this.load();
  }

  load() {
    location.reload();
  }

}
