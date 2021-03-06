
import { Candidato } from './../model/candidato';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidatoService } from '../services/candidato.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from '../shared/alert-modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-novo-candidato',
  templateUrl: './novo-candidato.component.html',
  styleUrls: ['./novo-candidato.component.css']
})
export class NovoCandidatoComponent implements OnInit {

  candidato = new Candidato();

  horasPorDia = [
    { valor: '1', desc: 'Até 4 horas por dia' },
    { valor: '2', desc: 'De 4 á 6 horas por dia' },
    { valor: '3', desc: 'De 6 á 8 horas por dia' },
    { valor: '4', desc: 'Acima de 8 horas por dia (tem certeza?)' },
    { valor: '5', desc: 'Apenas finais de semana' },
  ];

  horarioParaTrabalho = [
    { valor: '1', desc: 'Manhã (de 08:00 ás 12:00)' },
    { valor: '2', desc: 'Tarde (de 13:00 ás 18:00)' },
    { valor: '3', desc: 'Tarde (de 13:00 ás 18:00)' },
    { valor: '4', desc: 'Madrugada (de 22:00 em diante)' },
    { valor: '5', desc: 'Comercial (de 08:00 as 18:00)' },
  ];



  // VARIAVEIS //
  form: FormGroup;
  submitted = false;
  formRadioOpition: any[];
  formRadioOpitionTwo: any[];
  isDisabled = false;
  isInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private candidatoService: CandidatoService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: AlertModalService,
    private location: Location,
  ) {

    const param = this.route.snapshot.params;
    if (param) {
      this.candidato.id = param.id;
    }
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.isDisabled = state.isDisabled;
    }
  }

  ngOnInit(): void {
    this.formRadioOpition = this.horasPorDia;
    this.formRadioOpitionTwo = this.horarioParaTrabalho;

    if (this.candidato.id) {
      this.candidatoService.loadById(this.candidato.id).subscribe((resp: Candidato) => {
        this.candidato = resp;
      });
    }

    this.form = this.fb.group({
      nome: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      email: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      telefone: [{ value: null, disabled: this.isDisabled }, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      estado: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      cidade: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      salario: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      skype: [{ value: null, disabled: this.isDisabled },],
      linkedin: [{ value: null, disabled: this.isDisabled },],
      portfolio: [{ value: null, disabled: this.isDisabled },],
      formRadio: [{ value: null, disabled: this.isDisabled }],
      formRadioTwo: [{ value: null, disabled: this.isDisabled }],
    });


  }

  hasError(field: any) {
    this.isInvalid = true;
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.candidato.id) {
      this.update(this.candidato.id);
    } else {
      this.createCandidato();
    }
  }

  createCandidato() {
    this.candidatoService.createCandidato(this.candidato).subscribe(
      res => {
        this.modal.showAlertSuccess('Candidato salvo com sucesso!');
        this.location.back();
      },
      error => {
        this.isInvalid = true;
        this.modal.showAlertDanger('Erro ao adicionar candidato. Tente mais tarde.');
        // this.router.navigate(['']);
      }
    );
  }

  update(id) {
    this.candidatoService.update(id, this.candidato).subscribe(
      resp => {
        this.modal.showAlertWarning('Alteração feita com sucesso!');
        this.router.navigate(['']);
      },
      error => {
        this.modal.showAlertDanger('Erro ao editar candidato. Tente mais tarde.');
        this.router.navigate(['']);
      }
    );
  }

  onCancel() {
    this.submitted = false;
    this.router.navigate(['']);
  }
}
