import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { ModalService } from '../custompopup';
import { environment } from 'src/environments/environment';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { HttpClient } from '@angular/common/http';
// import { DatePipe,CurrencyPipe } from '@angular/common';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { ModalService } from '../custompopup/modal.service';



@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {
  
  @Output()
  onSuccess = new EventEmitter<any>()
  @Input() PackageName = "";
    
  @ViewChild('orderreceipt') orderreceipt: ElementRef;
  hostAppURL = environment.mailAppURL;
  
  IsCongratulation = false;
  ShowMailError = false;
  openPackageType: any = '';
  submittedValue: any = '';
  exform: FormGroup;
  bodyText: string;
  dateMask: string = '99/99/9999';
  packageList: any = [
    {
      name: "Package 1",
      totalamount: "693",
      Fees: "600",
      MTO: "15",
      HST: "78",
      description1: "Basic E-Learning Lesson ( 30 hours digital course)",
      description2: "In addition 10 hours In Car Training"
    },
    {
      name: "Package 2",
      totalamount: "906.57",
      Fees: "789",
      MTO: "15",
      HST: "102.57",
      description1: "Basic E-Learning Lesson (30 hours digital course)",
      description2: "In addition Test"
    },
    {
      name: "Package 3",
      totalamount: "62.5",
      Fees: "55",
      MTO: "0.00",
      HST: "7.15",
      description1: "1 hours Lesson",
      description2: ""
    },
    {
      name: "Package 4",
      totalamount: "282.5",
      Fees: "250",
      MTO: "0.00",
      HST: "32.5",
      description1: "2 hours Lesson & test",
      description2: ""
    },
    {
      name: "Package 5",
      totalamount: "406.8",
      Fees: "360",
      MTO: "0.00",
      HST: "46.8",
      description1: "4 hours Lesson & test",
      description2: ""
    },
    {
      name: "Package 6",
      totalamount: "56.50",
      Fees: "50",
      MTO: "0.00",
      HST: "6.50",
      description1: "1 hours Lesson",
      description2: ""
    },
    {
      name: "Package 7",
      totalamount: "203.4",
      Fees: "180",
      MTO: "0.00",
      HST: "23.4",
      description1: "1 hours lesson & road test",
      description2: ""
    },
    {
      name: "Package 8",
      totalamount: "259.9",
      Fees: "230",
      MTO: "0.00",
      HST: "29.9",
      description1: "2 hours Lesson & test",
      description2: ""
    },
    {
      name: "Package 9",
      totalamount: "372.9",
      Fees: "330",
      MTO: "0.00",
      HST: "42.9",
      description1: "4 hours Lesson & test",
      description2: ""
    },
  ]
  constructor(private modalService: ModalService,private http: HttpClient,
    private currency_pipe_object: CurrencyPipe,
    public datepipe: DatePipe
    ) { }
  
  ngOnInit(): void {
    this.openPackageType = this.packageList.filter(x => x.name.toLowerCase() == this.PackageName.toLowerCase())[0];
    this.exform = new FormGroup({
      'fname': new FormControl(null, [, Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
      'lname': new FormControl(null, [, Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
      'drivinglnum': new FormControl(null, Validators.required),
      'issuedate': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'expirydate': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'dateofbirth': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'country': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'zip': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/), Validators.required]),
      'orderdate': new FormControl(''),
      'ordernumber': new FormControl(''),
    });
  }
  openModal(id: string) {
    this.IsCongratulation = false;
    this.openPackageType = '';
    this.submittedValue = '';
    if (id) {
      this.openPackageType = this.packageList.filter(x => x.name.toLowerCase() == id.toLowerCase())[0];
      this.modalService.open(id);
    }
  }

  closeModal(id: string) {
    this.IsCongratulation = false;
    this.openPackageType = '';
    this.submittedValue = '';
    this.exform.reset();
    this.modalService.close(this.PackageName);
    this.modalService.close(id);
  }
  clicksub() {
    this.openPackageType = this.packageList.filter(x => x.name.toLowerCase() == this.PackageName.toLowerCase())[0];
    this.IsCongratulation = true;
    this.exform.get('orderdate').setValue(new Date());
    this.exform.get('ordernumber').setValue(Date.now());
    this.submittedValue = this.exform.value;
    var htmlMailBody = this.GetEmailTemplate();
    var ccMail = '';
    if (environment.addCC) {
      ccMail = environment.ccMail + "," + this.submittedValue.email;
    }
    this.http.post(this.hostAppURL, 
    {
      "to" : environment.toMail,
      "subject" : this.GetEmailSubject(),
      "body": htmlMailBody,
      "cc" : ccMail
    }
    ).subscribe(data => {
      if(data =="Email Sent")
      {
        this.exform.reset();
        this.IsCongratulation = false;
        this.modalService.close(this.openPackageType.name); 
      }else{
        this.IsCongratulation = false;
        this.ShowMailError = true;
      }
    })
    
  }
GetEmailSubject(){
  return "Star plus inquiry notification OrderId- " + this.submittedValue.ordernumber + " Name- " + this.submittedValue.fname +" "+ this.submittedValue.lname;
}
get fname() {
  return this.exform.get('fname');
  }
  get lname() {
    return this.exform.get('lname');
  }
  get drivinglnum() {
    return this.exform.get('drivinglnum');
  }
  get issuedate() {
    return this.exform.get('issuedate');
  }
  get expirydate() {
    return this.exform.get('expirydate');
  }
  get dateofbirth() {
    return this.exform.get('dateofbirth');
  }
  get country() {
    return this.exform.get('country');
  }
  get address() {
    return this.exform.get('address');
  }
  get city() {
    return this.exform.get('city');
  }
  get state() {
    return this.exform.get('state');
  }
  get zip() {
    return this.exform.get('zip');
  }
  get email() {
    return this.exform.get('email');
  }
  get phone() {
    return this.exform.get('phone');
  }
  
  public downloadReceiptPdf() {
    const doc = new jsPDF();
    
    const pdfTable = this.orderreceipt.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
    
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
    
  }
  
  GetEmailTemplate(){
    var htmlStringtemplate = '<table border="0" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="m_-5016142525234961042top-padding" style="padding:20px 15px 0 15px" align="center" bgcolor="#f5f5f5"><table border="0" width="" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding:0" align="center" width="600"><table class="m_-5016142525234961042responsive-table" border="0" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding-bottom:20px" align="center"><a href="#m_-5016142525234961042_"><img style="display:inline;float:none;text-align:center;width:260px" src="http://starplusdrivingschool.ca/assets/images/Logo.png" alt="Logo" width="260" height="48" class="CToWUd"></a></td></tr></tbody></table><table class="m_-5016142525234961042responsive-table" border="0" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding-bottom:15px" align="center" bgcolor="#ffffff" width="600"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="m_-5016142525234961042zero-padding" style="width:100%;padding-left:0;padding-right:0;background:0 0" align="center" width="100%"><a href="#m_-5016142525234961042_" rel="noopener noreferrer"><img class="m_-5016142525234961042img-max CToWUd" style="max-width:100%;width:100%;height:auto!important;display:block;color:#555;font-size:16px" src="https://images.unsplash.com/photo-1516862523118-a3724eb136d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" alt="OLA" width="600" height="auto" border="0"></a></td></tr><tr><td style="padding-left:5%;padding-right:5%" bgcolor="#ffffff"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="m_-5016142525234961042wysiwyg-tmp-selected-cell" style="line-height:23px;font-size:16px;color:#555;font-family:HelveticaNeue-Light,Arial,sans-serif;padding:10px 0 0 0" align="left"><div #orderreceipt class="orderreceipt"><div class="row text-center"><h4 style="display:flex;justify-content:center">Star Plus Drivings School</h4><h4 style="display:flex;justify-content:center">Acknowledgement of order received.</h4><h4>PAYMENT METHOD: Pay Cash at Office or Using Interact Transfer to &nbsp;<b>starplusdrive@gmail.com</b></h4><hr><div class="d-flex justify-content-between"><span>ORDER DATE</span><span style="float:right"><b>{{submittedValueorderdate}}</b></span></div><div class="d-flex justify-content-between"><span>TOTAL ORDER AMOUNT</span><span class="mx-2" style="float:right"><b>{{openPackageTypetotalamount}}</b></span></div></div><div class="row d-flex justify-content-between"><span class="col-7">UNIQUE ORDER NUMBER</span><span class="col-5" style="float:right"><b>{{submittedValueordernumber}}</b></span><hr></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Customer Name</b></span><span class="col-5" style="float:right"><b>{{submittedValuefnamelname}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Contact Number</b></span><span class="col-5" style="float:right"><b>{{submittedValuephone}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Client Email</b></span><span class="col-5" style="float:right"><b>{{submittedValueemail}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Address</b></span><span class="col-5" style="float:right"><b>{{submittedValueaddress}},{{submittedValuecity}},{{submittedValuestate}},{{submittedValuecountry}},{{submittedValuezip}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Product</b></span><span class="col-5" style="float:right"><b>{{openPackageTypename}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Subtotal</b></span><span class="col-5 d-flex justify-content-end" style="float:right"><b>{{openPackageTypeFees}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>MTO</b></span><span class="col-5 d-flex justify-content-end" style="float:right"><b>{{openPackageTypeMTO}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>HST</b></span><span class="col-5 d-flex justify-content-end" style="float:right"><b>{{openPackageTypeHST}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7"><b>Total</b></span><span class="col-5 d-flex justify-content-end" style="float:right"><b>{{openPackageTypetotalamount1}}</b></span></div><div class="row d-flex justify-content-between"><span class="col-7">Driver Licence Number</span><span class="col-5" style="float:right">{{submittedValuedrivinglnum}}</span></div><div class="row d-flex justify-content-between"><span class="col-7">Issue Date</span><span class="col-5" style="float:right">{{submittedValueissuedate}}</span></div><div class="row d-flex justify-content-between"><span class="col-7">Expiry Date</span><span class="col-5" style="float:right">{{submittedValueexpirydate}}</span></div><div class="row d-flex justify-content-between"><span class="col-7">Date of Birth</span><span class="col-5" style="float:right">{{submittedValuedateofbirth}}</span></div><div class="row d-flex justify-content-between"><span class="col-7">Postcode / ZIP</span><span class="col-5" style="float:right">{{submittedValuezip}}</span></div></div></td></tr><tr><td class="m_-5016142525234961042wysiwyg-tmp-selected-cell" style="line-height:23px;font-size:16px;color:#555;font-family:HelveticaNeue-Light,Arial,sans-serif;padding:5px 0 5px 0" align="left"><p style="margin:0;line-height:23px;font-size:16px;color:#555;font-family:HelveticaNeue-Light,Arial,sans-serif;padding:10px 0 5px 0">Experience the convenience of <strong>Star Plus Driving School</strong>.</p></td></tr><tr><td style="padding-top:20px;padding-bottom:20px" align="center"><table><tbody><tr><td style="font-family:HelveticaNeue-Light,Arial,sans-serif;color:#000;font-size:18px;text-transform:uppercase;line-height:24px;font-weight:700;text-align:center;background:#e81d4f;border-radius:5px;padding:4px 10px 4px 10px"><a class="m_-5016142525234961042img-max" style="font-family:HelveticaNeue-Light,Arial,sans-serif;font-size:18px;text-transform:uppercase;line-height:24px;font-weight:700;text-align:center;background:#e81d4f;border-radius:5px;text-decoration:none;color:#fff;display:block;padding:4px 10px 4px 10px" href="tel:+14168469924" rel="noopener noreferrer" target="_blank" data-saferedirecturl="tel:+14168469924">Call Now</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><small style="display:flex;justify-content:center">copyright &copy; Star plus drivings school.</small></td></tr></tbody></table>';
    return htmlStringtemplate
    .replace('{{submittedValueorderdate}}',this.DateFormatting(this.submittedValue.orderdate))
    .replace('{{openPackageTypetotalamount}}',this.CurrencyCADFormatting(this.openPackageType.totalamount))
    .replace('{{submittedValueordernumber}}',this.submittedValue.ordernumber)
    .replace('{{openPackageTypename}}',this.openPackageType.name)
    .replace('{{submittedValuefnamelname}}',this.submittedValue.fname + " " +this.submittedValue.lname)
    .replace('{{submittedValuephone}}',this.submittedValue.phone)
    .replace('{{submittedValueemail}}',this.submittedValue.email)
    .replace('{{submittedValueaddress}}',this.submittedValue.address)
    .replace('{{submittedValuecity}}',this.submittedValue.city)
    .replace('{{submittedValuestate}}',this.submittedValue.state)
    .replace('{{submittedValuecountry}}',this.submittedValue.country)
    .replace('{{submittedValuezip}}',this.submittedValue.zip)
    .replace('{{openPackageTypeFees}}',this.CurrencyCADFormatting(this.openPackageType.Fees))
    .replace('{{openPackageTypeMTO}}',this.CurrencyCADFormatting(this.openPackageType.MTO))
    .replace('{{openPackageTypeHST}}',this.CurrencyCADFormatting(this.openPackageType.HST))
    .replace('{{openPackageTypetotalamount1}}',this.CurrencyCADFormatting(this.openPackageType.totalamount))
    .replace('{{submittedValuedrivinglnum}}',this.submittedValue.drivinglnum)
    .replace('{{submittedValueissuedate}}',this.DateFormatting(this.submittedValue.issuedate))
    .replace('{{submittedValueexpirydate}}',this.DateFormatting(this.submittedValue.expirydate))
    .replace('{{submittedValuedateofbirth}}',this.DateFormatting(this.submittedValue.dateofbirth))
    .replace('{{submittedValuezip}}',this.submittedValue.zip)
  }
  DateFormatting(dateValue:string){
    return this.datepipe.transform(dateValue, 'MMM d, y');
  }
  CurrencyCADFormatting(amountValue:string){
    debugger
    return this.currency_pipe_object.transform(amountValue, 'CAD');
  }
}
