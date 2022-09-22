import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AmendmentDocumentComponent } from './amendment-document/amendment-document.component';
import { DisputeDocumentComponent } from './dispute-document/dispute-document.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { AmendmentDownloadComponent } from './amendment-document/components/amendment-download/amendment-download.component';
import { AmendmentVersionComponent } from './amendment-document/components/amendment-version/amendment-version.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ViewDocumentComponent } from './common/view-document/view-document.component'
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadDocumentComponent,
    AmendmentDocumentComponent,
    DisputeDocumentComponent,
    AmendmentDownloadComponent,
    AmendmentVersionComponent,
    ViewDocumentComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    AccordionModule,
    ReactiveFormsModule,
    ToastModule,
    MenubarModule,
    ConfirmDialogModule,
    RippleModule,
    DynamicDialogModule,
    ConfirmPopupModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
