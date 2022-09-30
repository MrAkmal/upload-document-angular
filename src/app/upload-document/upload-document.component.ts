import { UploadApi } from './upload-document-api';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AmendmentDocumentComponent } from '../amendment-document/amendment-document.component';
import { DisputeDocumentComponent } from '../dispute-document/dispute-document.component';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  documentTypes: DocumentTypeDTO[] = [];
  encryptionAlgorithms: string[] = ['AES', 'RSA', 'NAN', 'TripleDES'];
  availableExtensions: string[] = [];

  uploadForm: FormGroup;



  multipartFile!: File;

  isAmendment: boolean = false;
  isDispute: boolean = false;
  selectedUserType!: string;


  selectedFileExtension: boolean = false;
  selectedFileSize: boolean = false;
  maxSize!: number;
  isDisabled: boolean = true;

  displayModal!: boolean;

  constructor(private fb: FormBuilder, private uploadApi: UploadApi, private messageService: MessageService,
    private amendmentDocument: AmendmentDocumentComponent, private disputeDocument: DisputeDocumentComponent) {
    this.uploadForm = this.fb.group({
      userId: '',
      commonId: '',
      fileDescription: '',
      documentTypeId: '',
      algorithm: ''
    });
  }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.getAllDocumentTypes();
    this.getAvailableExtension();

    this.displayModal = true;
  }

  getAvailableExtension() {
    this.uploadApi.getAvailableExtension()
      .then(res => {
        console.log(res);
        this.availableExtensions = res;
      }).catch(err => {
        console.log(err);
      })
  }

  getAllDocumentTypes() {
    this.uploadApi.getAllDocumentTypes()
      .then(res => {
        console.log(res);
        this.documentTypes = res;
      }).catch(err => {
        console.log(err);
      })
  }

  onSelect(event: any) {
    console.log('event :' + event);
    console.log(event.value);
    if (event.value === 2) {
      this.isDispute = false;
      this.isAmendment = true;
    } else if (event.value === 1) {
      this.isAmendment = false;
      this.isDispute = true;
    }
    this.isDisabled = false;
  }

  onChange(event: any) {
    const val = this.uploadForm.value;


    this.selectedFileSize = this.checkFileSize(event.target.files[0].size, val.documentTypeId);
    this.selectedFileExtension = this.checkFileExtension(event);

    if (this.selectedFileSize && this.selectedFileExtension) {
      this.multipartFile = event.target.files[0];
    } else {
      this.warning();
    }

  }


  warning() {
    if (!this.selectedFileSize && !this.selectedFileExtension) {
      this.messageService.add({
        severity: 'error', summary: 'Warning', detail: "Allowed File Type \n" +
          this.availableExtensions.toString() + "\nMax file size " + this.maxSize
      });
    }
    else if (!this.selectedFileSize) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: "Max file size " + this.maxSize });
    } else if (!this.selectedFileExtension) {
      this.messageService.add({
        severity: 'error', summary: 'Warning', detail: "Allowed File Type " +
          this.availableExtensions.toString()
      });
    }
  }
  save() {

    const val = this.uploadForm.value;
    console.log(val);


    if (val.userId && val.fileDescription && val.documentTypeId && val.commonId && this.multipartFile) {


      let dto: FileUploadDTO = {
        file: this.multipartFile,
        fileDescription: val.fileDescription,
        userId: val.userId,
        commonId: val.commonId,
        documentTypeId: val.documentTypeId,
        algorithm: val.algorithm
      };

      this.uploadApi.save(dto)
        .then(res => {
          console.log(res);

          this.uploadForm = this.fb.group({
            userId: '',
            commonId: '',
            fileDescription: '',
            documentTypeId: '',
            algorithm: ''
          });

          this.multipartFile;

          if (this.isDispute) {
            this.disputeDocument.reloadCurrentRoute();
          } else {
            this.amendmentDocument.reloadCurrentRoute();
          }
          this.displayModal = false;
          this.isAmendment = false;
          this.isDispute = false;
          this.isDisabled = true;
          this.selectedFileExtension = false;
          this.selectedFileSize = false;
          this.maxSize = 0;

        }).catch(err => {
          console.log(err);
          this.displayModal = false;
          this.isAmendment = false;
          this.isDispute = false;
          this.isDisabled = true;
          this.selectedFileExtension = false;
          this.selectedFileSize = false;
          this.maxSize = 0;
        });

    } else if (!this.multipartFile) {
      this.warning();
    }

  }


  checkFileSize(event: any, documentTypeId: number): boolean {


    for (var element of this.documentTypes) {
      if (element.id === documentTypeId && element.size >= event) {
        return true;
      } else if (element.id === documentTypeId) {
        this.maxSize = element.size;
      }
    }

    return false;
  }

  checkFileExtension(event: any): boolean {
    for (var element of this.availableExtensions) {
      if (element .toLocaleLowerCase()== event.target.files[0].name.split(".").pop().toLocaleLowerCase()) {
        return true;
      }
    }
    return false;
  }

}

export interface FileUploadDTO {

  file: File;
  fileDescription: string;

  userId: number;

  commonId: number;

  documentTypeId: number;

  algorithm: string;

}

export interface DocumentTypeDTO {

  id: number;
  type: string;
  size: number;

}
function ViewChild(arg0: string) {
  throw new Error('Function not implemented.');
}

