import { UploadApi } from 'src/app/upload-document/upload-document-api';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-amendment-download',
  templateUrl: './amendment-download.component.html',
  styleUrls: ['./amendment-download.component.css']
})
export class AmendmentDownloadComponent implements OnInit {

  @Input()
  documentId!: number;
  @Input()
  selectedVersion!: string;

  @Input()
  folder!: string;


  constructor(
    private uploadApi: UploadApi,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
  }



  download() {
    console.log("version: " + this.selectedVersion);
    if (this.selectedVersion && this.documentId) {
      this.downloadFile(this.documentId);
    }
    else if (!this.selectedVersion) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Version' });
    }

  }



  downloadFile(id: number) {


    this.uploadApi.downloadFile(id, this.folder, this.selectedVersion)
      .subscribe(response => {
        const keys = response.headers.keys();
        console.log("headers: ", keys);
        const fileName: string = response.headers.get('file-name') as string;

        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.setAttribute('download', fileName);
        a.href = window.URL.createObjectURL(blob);
        a.click();
        this.messageService.add({ severity: 'success', summary: 'Download', detail: 'Successfully Downloaded' });

      })


  }

}
