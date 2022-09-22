import { DisputeDocumentApi } from './dispute-document-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { CommonDocumentDTO } from '../amendment-document/amendment-document.component';
import { MessageService } from 'primeng/api';


@Injectable(
  {
    providedIn: "root"
  }
)
@Component({
  selector: 'app-dispute-document',
  templateUrl: './dispute-document.component.html',
  styleUrls: ['./dispute-document.component.css']
})
export class DisputeDocumentComponent implements OnInit {

  constructor(private amendmentDocumentApi: DisputeDocumentApi, private messageService: MessageService) { }

  disputeDocuments: CommonDocumentDTO[] = [];

  ngOnInit(): void {
    this.getAll();
  }



  getAll() {
    this.disputeDocuments = [];
    this.amendmentDocumentApi.getAll()
      .then(res => {
        console.log("res: ", res);
        this.disputeDocuments = res;
      }).catch(err => {
        console.log(err);
      })
  }


  delete(id: number) {

    this.messageService.clear('c');

    this.amendmentDocumentApi.delete(id)
      .then(() => {
        this.getAll();
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Successfully Deleted' });
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
