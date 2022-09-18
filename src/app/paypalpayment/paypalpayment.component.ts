import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-paypalpayment',
  templateUrl: './paypalpayment.component.html',
  styleUrls: ['./paypalpayment.component.scss']
})
export class PaypalpaymentComponent implements OnInit {

  @Output()
  onSuccess = new EventEmitter<any>()
  
  @Input() ControlElementId = "";
  @Input() ControlCurrency = "";
  @Input() ControlAmount = "";
  _controlElementId: string = "";
  
  constructor() {}
  ngOnInit(): void {
    this._controlElementId = "#" + this.ControlElementId;
    render({
      id: this._controlElementId,
      currency: this.ControlCurrency,
      value: this.ControlAmount,
      onApprove(details) {
        console.log(details)
        this.onSuccess.emit(this.form.value);
        alert("Transaction successfull");
      },
      
    })
  }

   
}
