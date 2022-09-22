import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  downloadForm: FormGroup;

  @Input()
  folder!: string;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService) {

    this.downloadForm = this.fb.group({
      name: ''
    });

  }

  ngOnInit(): void {
  }

  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
    this.downloadForm = this.fb.group({
      name: ''
    });
  }


  download() {
    console.log("version: " + this.selectedVersion);
    const val = this.downloadForm.value;
    if (this.selectedVersion && this.documentId && val.name) {
      this.downloadFile(this.documentId, val.name);
    }
    else if (!this.selectedVersion && !val.name) {
      this.displayModal = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select version and type file name' });
    }
    else if (!val.name) {
      this.displayModal = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Type File Name' });
    } else {
      this.displayModal = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Version' });
    }

  }



  downloadFile(id: number, fileName: string) {

    const baseUrl = 'http://localhost:9090/v1/' + this.folder + '/' + id + '/' + this.selectedVersion;


    this.http.get(baseUrl, { responseType: 'blob' }).subscribe(
      (response) => {

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (fileName)
          downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )

    this.displayModal = false;
    this.messageService.add({ severity: 'success', summary: 'Download', detail: 'Successfully Downloaded' });
  }

}
