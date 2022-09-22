import { Component, Input, OnInit } from '@angular/core';
import { CommonDocumentDTO } from 'src/app/amendment-document/amendment-document.component';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {


  @Input()
  document: CommonDocumentDTO = {
    id: 0,
    documentName: '',
    documentDescription: '',
    documentSize: '',
    uploadedDate: new Date(),
    uploadedBy: 0,
    commonId: 0,
    versions: []
  };

  @Input()
  common!:string;

  constructor() {

  }

  ngOnInit(): void {
  }

  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }

}
