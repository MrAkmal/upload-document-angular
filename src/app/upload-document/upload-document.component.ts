import { UploadApi } from './upload-document-api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AmendmentDocumentComponent } from '../amendment-document/amendment-document.component';
import { DisputeDocumentComponent } from '../dispute-document/dispute-document.component';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  userTypes: string[] = ['AmendmentDocuments', 'DisputeDocuments'];

  uploadForm: FormGroup;

  multipartFile!: File;

  isAmendment: boolean = false;
  isDispute: boolean = false;
  selectedUserType!: string;

  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }

  onSelect(event: any) {
    console.log('event :' + event);
    console.log(event.value);
    if (event.value === 'AmendmentDocuments') {
      this.isDispute = false;
      this.isAmendment = true;
    } else if (event.value === 'DisputeDocuments') {
      this.isAmendment = false;
      this.isDispute = true;
    }
  }

  constructor(private fb: FormBuilder, private uploadApi: UploadApi, private messageService: MessageService,
    private amendmentDocument: AmendmentDocumentComponent, private disputeDocument: DisputeDocumentComponent) {
    this.uploadForm = this.fb.group({
      userId: '',
      commonId: '',
      fileDescription: '',
      userType: ''
    });
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);
    this.multipartFile = event.target.files[0];
  }

  save() {

    const val = this.uploadForm.value;
    console.log(val)
    if (val.userId && val.fileDescription && val.userType && val.commonId) {


      let dto: FileUploadDTO = {
        file: this.multipartFile,
        fileDescription: val.fileDescription,
        userId: val.userId,
        commonId: val.commonId,
        userType: val.userType
      };

      this.uploadApi.save(dto)
        .then(res => {
          console.log(res);
          this.uploadForm = this.fb.group({
            userId: '',
            commonId: '',
            fileDescription: '',
            userType: ''
          });

          this.multipartFile;
          this.disputeDocument.getAll();
          this.amendmentDocument.getAll();


        }).catch(err => {
          console.log(err);

        });

      this.displayModal = false;
      this.isAmendment = false;
      this.isDispute = false;

    }

  }
}

export interface FileUploadDTO {

  file: File;
  fileDescription: string;

  userId: number;

  commonId: number;

  userType: string;



}
