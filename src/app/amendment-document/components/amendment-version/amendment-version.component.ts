import { CommonDocumentDTO } from './../../amendment-document.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amendment-version',
  templateUrl: './amendment-version.component.html',
  styleUrls: ['./amendment-version.component.css']
})
export class AmendmentVersionComponent implements OnInit {

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
  selectedVersion!: string;

  @Input()
  folder!:string;

  constructor(
  ) { }

  ngOnInit() {
  }


  onClick(id: string) {
    this.selectedVersion = id;
  }



}
