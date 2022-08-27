import { Component, Input, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-paypalpayment',
  templateUrl: './paypalpayment.component.html',
  styleUrls: ['./paypalpayment.component.scss']
})
export class PaypalpaymentComponent implements OnInit {

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
        debugger
        console.log(details)
        alert("Transaction successfull");
      },
      
    })
  }
}
