import { Injectable } from "@angular/core";
import axios from "axios";
import { MessageService } from "primeng/api";
import { FileUploadDTO } from "./upload-document.component";


@Injectable(
    { providedIn: "root" }
)
export class UploadApi {

    baseUrl: string = "http://localhost:9090/v1/file/upload"

    constructor(    private messageService: MessageService) {

    }

    async save(dto: FileUploadDTO) {


        await axios.post(this.baseUrl,
            dto,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res: { data: any; }) => {
                console.log("success",res);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Uploaded' });
                return res.data;
            }).catch((err: any) => {
                console.log("err: ",err);
                console.log("err response: ",err.response);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.response.data.message });
            }
            );
    }



}
