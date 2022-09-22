import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  items: MenuItem[] = [];

  ngOnInit(): void {
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
