import { Component, OnInit,HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  globalMail :string = environment.globalMail;
  navbarfixed:boolean=false;
  @HostListener('window:scroll',['$event'])
  onscroll(){
    if(window.scrollY>100){
      this.navbarfixed=true;
    }
    else{
      this.navbarfixed=false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
