import { AmendmentDocumentApi } from './amendment-document-api';
import { Component, Injectable, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


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

  constructor(private router: Router, private amendmentDocumentApi: AmendmentDocumentApi,
    private messageService: MessageService) { }

  amendmentDocuments: CommonDocumentDTO[] = [];

  ngOnInit(): void {
    this.getAll();
  }



  getAll() {
    this.amendmentDocumentApi.getAll()
      .then(res => {
        console.log("res: ", res);
        // this.amendmentDocuments = res;

        for (let element of res) {
          this.amendmentDocuments.push({
            id: element.id,
            documentName: element.documentName,
            documentDescription: element.documentDescription,
            documentSize: element.documentSize,
            uploadedDate: new Date(element.uploadedDate[0],
              element.uploadedDate[1],
              element.uploadedDate[2],
              element.uploadedDate[3],
              element.uploadedDate[4],
              element.uploadedDate[5],
              element.uploadedDate[6]
            ),
            uploadedBy: element.uploadedBy,
            commonId: element.commonId,
            versions: element.versions
          });
        }

      }).catch(err => {
        console.log(err);
      })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/dispute-document', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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
