import { AmendmentDocumentApi } from './amendment-document-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable(
  {
    providedIn: "root"
  }
)
@Component({
  selector: 'app-amendment-document',
  templateUrl: './amendment-document.component.html',
  styleUrls: ['./amendment-document.component.css']
})
export class AmendmentDocumentComponent implements OnInit {

  constructor(private amendmentDocumentApi: AmendmentDocumentApi,
    private messageService: MessageService) { }

  amendmentDocuments: CommonDocumentDTO[] = [];

  ngOnInit(): void {
    this.getAll();
  }



  getAll() {
    this.amendmentDocuments = [];
    this.amendmentDocumentApi.getAll()
      .then(res => {
        console.log("res: ", res);
        this.amendmentDocuments = res;
      }).catch(err => {
        console.log(err);
      })
  }


  delete(id: number) {

    this.messageService.clear('c');

    this.amendmentDocumentApi.delete(id)
      .then(() => {
        this.getAll();
      }).catch((err: any) => {
        console.log(err);
        this.getAll();
      });
  }

  showConfirm(id: any) {
    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true,
      severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', id: id
    });
  }


  onReject() {
    this.messageService.clear('c');
    this.messageService.add({
      severity: "info",
      summary: "Cancelled",
      detail: "Deleteing Cancelled"
    });
  }


}


export interface CommonDocumentDTO {
  id: number;
  documentName: string;
  documentDescription: string;
  documentSize: string;
  uploadedDate: Date;
  uploadedBy: number;
  commonId: number;
  versions: string[];
}
