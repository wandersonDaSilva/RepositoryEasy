import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Location } from '@angular/common';


import { Candidato } from '../model/candidato';
import { CandidatoService } from '../services/candidato.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertModalService } from './../shared/alert-modal.service';



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
    this.deleteModalRef = this.modalService.show(this.deleteModal);
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
