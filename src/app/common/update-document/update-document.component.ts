import { DocumentTypeDTO } from './../../upload-document/upload-document.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AmendmentDocumentComponent, CommonDocumentDTO } from 'src/app/amendment-document/amendment-document.component';
import { DisputeDocumentComponent } from 'src/app/dispute-document/dispute-document.component';
import { UploadApi } from 'src/app/upload-document/upload-document-api';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})
export class UpdateDocumentComponent implements OnInit {

  documentTypes: DocumentTypeDTO[] = [];
  availableExtensions: string[] = [];
  encryptionAlgorithms: string[] = ['AES', 'RSA', 'NAN', 'TripleDES'];

  uploadForm: FormGroup;

  documentTypeId!: number;

  multipartFile!: File;

  @Input()
  documentType!: string;

  selectedFileExtension: boolean = false;
  selectedFileSize: boolean = false;
  maxSize!: number;
  isDisabled: boolean = true;

  @Input()
  document: CommonDocumentDTO = {
    id: 0,
    documentName: '',
    documentDescription: '',
    documentSize: '',
    uploadedDate: new Date,
    uploadedBy: 0,
    commonId: 0,
    versions: []
  };


  displayModal!: boolean;



  constructor(private fb: FormBuilder,
    private uploadApi: UploadApi,
    private messageService: MessageService,
    private amendmentDocument: AmendmentDocumentComponent,
    private disputeDocument: DisputeDocumentComponent) {
    this.uploadForm = this.fb.group({
      fileDescription: '',
      algorithm: ''
    });
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);


    this.selectedFileSize = this.checkFileSize(event.target.files[0].size, this.documentTypeId);
    this.selectedFileExtension = this.checkFileExtension(event);

    if (this.selectedFileSize && this.selectedFileExtension) {
      this.multipartFile = event.target.files[0];
    } else {
      this.warning();
    }
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
        for (var element of this.documentTypes) {
          if (element.type === this.documentType) {
            this.documentTypeId = element.id
            this.isDisabled = false;
          }
        }
      }).catch(err => {
        console.log(err);
      })
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

  update() {

    const val = this.uploadForm.value;
    console.log(val)
    if (val.fileDescription && val.algorithm && this.documentTypeId && this.multipartFile) {


      let dto: FileUploadUpdateDTO = {
        file: this.multipartFile,
        fileDescription: val.fileDescription,
        userId: this.document.uploadedBy,
        commonId: this.document.commonId,
        documentTypeId: this.documentTypeId,
        algorithm: val.algorithm,
        id: this.document.id
      };

      console.log("Dto: ", dto);

      this.uploadApi.update(dto)
        .then(res => {
          console.log(res);

          this.uploadForm = this.fb.group({
            fileDescription: '',
            algorithm: ''
          });

          if (this.documentType === 'DisputeDocuments') {
            this.disputeDocument.reloadCurrentRoute();
          } else {
            this.amendmentDocument.reloadCurrentRoute();
          }

          this.multipartFile;
          this.displayModal = false;
          this.isDisabled = true;
          this.selectedFileExtension = false;
          this.selectedFileSize = false;
          this.maxSize=0;

        }).catch(err => {
          console.log(err);
          this.displayModal = false;
          this.isDisabled = true;
          this.selectedFileExtension = false;
          this.selectedFileSize = false;
          this.maxSize=0;
        });

    }else if (!this.multipartFile) {
      this.warning();
    }

  }
}

export interface FileUploadUpdateDTO {

  id: number;

  file: File;
  fileDescription: string;

  userId: number;

  commonId: number;

  documentTypeId: number;

  algorithm: string;



}
