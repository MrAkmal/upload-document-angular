import { Injectable } from "@angular/core";
import axios from "axios";
import { MessageService } from "primeng/api";


@Injectable(
  { providedIn: "root" }
)
export class DisputeDocumentApi {

  baseUrl: string = "http://localhost:9090/v1/dispute"

  constructor(private messageService: MessageService) {

  }

  async getAll() {

    try {
      const res = await axios.get(this.baseUrl);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: number) {


    await axios.delete(this.baseUrl + '/' + id)
      .then(res => {
        console.log(res);
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Successfully Deleted' });
        return res.data;
      }).catch(err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.response.data.message });
      }
      );
  }



}
