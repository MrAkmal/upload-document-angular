import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'upload-document-angular';

  items: MenuItem[] = [];
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Amendment Documents',
        icon: 'pi pi-fw pi-folder',
        routerLink:'/'
      },
      {
        label: 'Dispute Documents',
        icon: 'pi pi-fw pi-folder',
        routerLink:'/dispute-document'
      }
    ];
  }



}
