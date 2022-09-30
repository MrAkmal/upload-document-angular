import { RestoreDocumentComponent } from './restore-document/restore-document.component';
import { DisputeDocumentComponent } from './dispute-document/dispute-document.component';
import { AmendmentDocumentComponent } from './amendment-document/amendment-document.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:AmendmentDocumentComponent
  },
  {
    path:"dispute-document",
    component:DisputeDocumentComponent
  },
  {
    path:"restore-document",
    component:RestoreDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
