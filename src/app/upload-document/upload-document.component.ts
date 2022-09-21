import { UploadApi } from './upload-document-api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  userTypes: string[] = ['BidderDocuments', 'DisputeDocuments'];
  documentTypes: string[] = ['TenderDocuments', 'DisputeFiles'];


  uploadForm: FormGroup;

  multipartFile!: File;

  isBidder: boolean = false;
  isDispute: boolean = false;
  selectedUserType!: string;

  displayModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
  }

  onSelect(event: any) {
    console.log('event :' + event);
    console.log(event.value);
    if (event.value === 'BidderDocuments') {
      this.isDispute = false;
      this.isBidder = true;
    } else if (event.value === 'DisputeDocuments') {
      this.isBidder = false;
      this.isDispute = true;
    }
  }

  constructor(private fb: FormBuilder, private uploadApi: UploadApi, private messageService: MessageService) {
    this.uploadForm = this.fb.group({
      userId: '',
      disputeId: '',
      fileDescription: '',
      userType: '',
      documentType: ''
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
    if (val.userId && val.fileDescription && val.userType) {


      let dto: FileUploadDTO = {
        file: this.multipartFile,
        fileDescription: val.fileDescription,
        userId: val.userId,
        disputeId: val.disputeId,
        userType: val.userType,
        documentType: val.documentType
      };

      this.uploadApi.save(dto)
        .then(res => {
          console.log(res);
          this.uploadForm = this.fb.group({
            userId: '',
            disputeId: '',
            fileDescription: '',
            userType: '',
            documentType: ''
          });

          this.multipartFile;


        }).catch(err => {
          console.log(err);

        });

      this.displayModal = false;
      this.isBidder = false;
      this.isDispute = false;

    }

  }
}

export interface FileUploadDTO {

  file: File;
  fileDescription: string;

  userId: number;

  disputeId: number;

  userType: string;

  documentType: string;


}