import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean>;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.conformAndClose(true);
  }

  onClose() {
    this.conformAndClose(false);
  }

  private conformAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.modalRef.hide();
  }
}
