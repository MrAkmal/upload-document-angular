import { Component, OnInit, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { RestoreApi } from './restore-document-api';

@Component({
  selector: 'app-restore-document',
  templateUrl: './restore-document.component.html',
  styleUrls: ['./restore-document.component.css']
})
export class RestoreDocumentComponent implements OnInit {

  value!: Date;

  date1!: Date;

  date2!: Date;

  date3!: Date;

  date4!: Date;

  date5!: Date;

  date6!: Date;

  date7!: Date;

  date8!: Date;

  date9!: Date;

  date10!: Date;

  date11!: Date;

  date12!: Date;

  date13!: Date;

  date14!: Date;

  dates!: Date[];

  begin!: Date;
  end!: Date;

  minDate!: Date;

  maxDate!: Date;

  es: any;

  invalidDates!: Array<Date>

  constructor(private messageService: MessageService, private restoreApi: RestoreApi) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  documentId!: string;

  documentType!:string;
  userId!:number;
  commonId!: number;
  documentName!:string;

  restoreWithDocumentId() {
    if (this.documentId) {

      this.restoreApi.restoreWithDocumentId(this.documentId)
        .then(res => {
          console.log(res);
          this.documentId = '';
        }).catch(err => {
          console.log(err)
        });


    } else {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please Enter Document Id' });
    }
  }

  restoreBetweenDate() {
    console.log("Begin : ", this.begin);
    console.log("End : ", this.end);

    if (this.begin && this.end) {
      const dto: RestoreTimeDTO = {
        begin: this.begin,
        end: this.end,
        userType: ''
      }

      console.log("DTO : ",dto)

      this.restoreApi.restoreBetweenDate(dto)
        .then(res => {
          console.log(res);
          this.begin = new Date;
          this.end = new Date;
        }).catch(err => {
          console.log(err)
        });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please Select Date' });
    }
  }

  restoreWithName() {


    if (this.documentName && this.documentType && this.commonId && this.userId) {
      const dto: RestoreWithNameDTO = {
        documentType: this.documentType,
        userId: this.userId,
        commonId: this.commonId,
        documentName: this.documentName
      }

      this.restoreApi.restoreWithName(dto)
        .then(res => {
          console.log(res);
          this.begin = new Date;
          this.end = new Date;
        }).catch(err => {
          console.log(err)
        });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please Enter Necessary filed' });
    }
  }

}


export interface RestoreTimeDTO {

  begin: Date;

  end: Date;

  userType: string;

}

export interface RestoreWithNameDTO {

  documentType: string;

  userId: number;

  commonId: number;

  documentName: string;


}

