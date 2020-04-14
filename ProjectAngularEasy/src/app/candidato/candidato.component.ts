import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { take, switchMap } from 'rxjs/operators';


import { Candidato } from '../model/candidato';
import { CandidatoService } from '../services/candidato.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertModalService } from './../shared/alert-modal.service';
import { EMPTY } from 'rxjs';



@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

  candidato: Candidato[];
  idCandidato: any;
  deleteModalRef: MDBModalRef;
  idCandidatoSelecionado: Candidato;
  @ViewChild('deleteModal') deleteModal;

  constructor(
    private candidatoService: CandidatoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: MDBModalService,
    private location: Location,

    ) { }

  ngOnInit(): void {
    this.listCandidato();
  }

  listCandidato() {
        this.candidatoService.listCandidato().subscribe(
      res => {
          this.candidato = res;
      },
      error => {
        this.handleError();
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
    this.idCandidatoSelecionado = id;
    // this.deleteModalRef = this.modalService.show(this.deleteModal);
    const result$ = this.alertService.showConfirm('', 'Tem certeza que deseja remover o candidato?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.candidatoService.delete(id) : EMPTY)
    )
    .subscribe(
      success => {
        this.load();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover candidato!');
      }
    );
  }

  onConfirmDelete() {
    this.candidatoService.delete(this.idCandidatoSelecionado).subscribe(res => {
    this.router.navigate(['']);
    },
    error => {
      this.alertService.showAlertDanger('Erro ao remover candidato!');
    }
  );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  load() {
    location.reload();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar lista. Tente mais tarde.');
  }

}
