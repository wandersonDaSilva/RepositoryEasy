import { Injectable } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: MDBModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const modalRef: MDBModalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.type = type;
    modalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => modalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING, 3000);
  }
}
