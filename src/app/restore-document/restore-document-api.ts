import { RestoreTimeDTO, RestoreWithNameDTO } from './restore-document.component';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import axios from "axios";
import { MessageService } from "primeng/api";


@Injectable(
    { providedIn: "root" }
)
export class RestoreApi {

    baseUrl: string = "http://localhost:1515/v1/back_up"

    constructor(private messageService: MessageService, private http: HttpClient) {

    }



    async restoreBetweenDate(dto: RestoreTimeDTO) {

        await axios.post(this.baseUrl + '/restore',
            dto)
            .then((res: { data: any; }) => {
                console.log("success", res);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Restored' });
                return res.data;
            }).catch((err: any) => {
                console.log("err: ", err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Server Error" });
            }
            );
    }


    async restoreWithName(dto: RestoreWithNameDTO) {

        await axios.post(this.baseUrl + '/restore-with-name',
            dto)
            .then((res: { data: any; }) => {
                console.log("success", res);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Restored' });
                return res.data;
            }).catch((err: any) => {
                console.log("err: ", err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Server Error" });
            }
            );
    }


    async restoreWithDocumentId(documentId: string) {

        await axios.post(this.baseUrl + '/restore-with-documentId/?documentId='+documentId)
            .then((res: { data: any; }) => {
                console.log("success", res);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Restored' });
                return res.data;
            }).catch((err: any) => {
                console.log("err: ", err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Server Error" });
            }
            );
    }



}
