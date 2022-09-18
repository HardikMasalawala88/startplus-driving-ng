import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ModalService } from '../custompopup/modal.service';
//import { ModalService } from '../custompopup';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  
  exform:FormGroup;
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
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {

     this.exform = new  FormGroup({
      'fname' : new FormControl(null,[,Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
      'lname' : new FormControl(null,[,Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
      'drivinglnum' : new FormControl(null,Validators.required),
      'issuedate' : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      'expirydate' : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      'dateofbirth' : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      'country':new FormControl(null,Validators.required),
      'address' : new FormControl(null,Validators.required),
      'city' : new FormControl(null,Validators.required),
      'state' : new FormControl(null,Validators.required),
      'zip' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'phone' : new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),Validators.required]),

     });
  } 
openModal(id: string) {
  if(id){
    var packageType = this.packageList.filter(x =>x.name.toLowerCase() == id.toLowerCase())[0];
    debugger
    this.modalService.open(id);
  }
}

closeModal(id: string) {
    this.modalService.close(id);
}
  clicksub(){
    console.log(this.exform.value);
    this.exform.reset();
  }
  get fname(){
    return this.exform.get('fname');
  }
  get lname(){
    return this.exform.get('lname');
  }
  get drivinglnum(){
    return this.exform.get('drivinglnum');
  }
  get issuedate(){
    return this.exform.get('issuedate');
  }
  get expirydate(){
    return this.exform.get('expirydate');
  }
  get dateofbirth(){
    return this.exform.get('dateofbirth');
  }
  get country(){
    return this.exform.get('country');
  }
  get address(){
    return this.exform.get('address');
  }
  get city(){
    return this.exform.get('city');
  }
  get state(){
    return this.exform.get('state');
  }
  get zip(){
    return this.exform.get('zip');
  }
  get email(){
    return this.exform.get('email');
  }
  get phone(){
    return this.exform.get('phone');
  }
}

//   packageList: any = [
//     {

//       name: "Package 1",
//       totalamount: "693",
//       Fees: "600",
//       MTO: "15",
//       HST: "78",
//       description1: "Basic E-Learning Lesson ( 30 hours digital course)",
//       description2: "In addition 10 hours In Car Training"
//     },
//     {
//       name: "Package 2",
//       totalamount: "906.57",
//       Fees: "789",
//       MTO: "15",
//       HST: "102.57",
//       description1: "Basic E-Learning Lesson (30 hours digital course)",
//       description2: "In addition Test"
//     },
//     {
//       name: "Package 3",
//       totalamount: "62.5",
//       Fees: "55",
//       MTO: "0.00",
//       HST: "7.15",
//       description1: "1 hours Lesson",
//       description2: ""
//     },
//     {
//       name: "Package 4",
//       totalamount: "282.5",
//       Fees: "250",
//       MTO: "0.00",
//       HST: "32.5",
//       description1: "2 hours Lesson & test",
//       description2: ""
//     },
//     {
//       name: "Package 5",
//       totalamount: "406.8",
//       Fees: "360",
//       MTO: "0.00",
//       HST: "46.8",
//       description1: "4 hours Lesson & test",
//       description2: ""
//     },
//     {
//       name: "Package 6",
//       totalamount: "56.50",
//       Fees: "50",
//       MTO: "0.00",
//       HST: "6.50",
//       description1: "1 hours Lesson",
//       description2: ""
//     },
//     {
//       name: "Package 7",
//       totalamount: "203.4",
//       Fees: "180",
//       MTO: "0.00",
//       HST: "23.4",
//       description1: "1 hours lesson & road test",
//       description2: ""
//     },
//     {
//       name: "Package 8",
//       totalamount: "259.9",
//       Fees: "230",
//       MTO: "0.00",
//       HST: "29.9",
//       description1: "2 hours Lesson & test",
//       description2: ""
//     },
//     {
//       name: "Package 9",
//       totalamount: "372.9",
//       Fees: "330",
//       MTO: "0.00",
//       HST: "42.9",
//       description1: "4 hours Lesson & test",
//       description2: ""
//     },
//   ]
//   SelectedElementId: string = "plan1";
//   SelectedCurrency: string = "USD";
//   SelectedAmount: string;
//   closeResult: string;  
  
//   constructor() {}  

//   ngOnInit(): void {
//   }
 
//   displayStyle = "none";
  
//   openPopup(packageName: string) {
//     debugger
//     var selected = this.packageList.filter(x => x.name == packageName)[0];
//     this.SelectedElementId = selected.name.replace(" ","");
//     this.SelectedAmount = selected.totalamount.replace(" ","");
//     this.displayStyle = "block";
//   }
//   closePopup() {
//     this.SelectedElementId = "";
//     this.SelectedAmount = "";
//     this.displayStyle = "none";
//   }
//   onSuccessTrigger(data: any) {
//     // don't forget to unsubscribe
//     if(data)
//     {
//       this.closePopup();
//     }
//   }
// }
