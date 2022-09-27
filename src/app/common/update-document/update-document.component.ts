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

  userTypes: string[] = ['AmendmentDocuments', 'DisputeDocuments'];
  encryptionAlgorithms: string[] = ['AES', 'RSA', 'NAN', 'TripleDES'];

  uploadForm: FormGroup;

  multipartFile!: File;

  @Input()
  userType!: string;

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
  showModalDialog() {
    this.displayModal = true;
  }



  constructor(private fb: FormBuilder, private uploadApi: UploadApi, private messageService: MessageService,
    private amendmentDocument: AmendmentDocumentComponent, private disputeDocument: DisputeDocumentComponent) {
    this.uploadForm = this.fb.group({
      fileDescription: '',
      algorithm: ''
    });
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);
    this.multipartFile = event.target.files[0];
  }

  update() {

    const val = this.uploadForm.value;
    console.log(val)
    if (val.fileDescription && val.algorithm) {


      let dto: FileUploadUpdateDTO = {
        file: this.multipartFile,
        fileDescription: val.fileDescription,
        userId: this.document.uploadedBy,
        commonId: this.document.commonId,
        userType: this.userType,
        algorithm: val.algorithm,
        id: this.document.id
      };

      console.log("Dto: ",dto);

      this.uploadApi.update(dto)
        .then(res => {
          console.log(res);

          this.uploadForm = this.fb.group({
            fileDescription: '',
            algorithm: ''
          });

          this.multipartFile;
          this.displayModal = false;

        }).catch(err => {
          console.log(err);
          this.displayModal = false;
        });

    }

  }
}

export interface FileUploadUpdateDTO {

  id: number;

  file: File;
  fileDescription: string;

  userId: number;

  commonId: number;

  userType: string;

  algorithm: string;



}