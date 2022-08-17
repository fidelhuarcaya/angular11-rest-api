import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { interceptorSpringProvider } from './interceptors/api-rest.interceptor';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { HomeUserComponent } from './home/home-user/home-user.component';
import { HeaderpatodosComponent } from './home/headerpatodos/headerpatodos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAlumnoComponent } from './home/home-admin/alumno/add-alumno/add-alumno.component';
import { DetailAlumnoComponent } from './home/home-admin/alumno/detail-alumno/detail-alumno.component';
import { CardComponent } from './shared/card/card.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModifyAlumnoComponent } from './home/home-admin/alumno/modify-alumno/modify-alumno.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FooteroffComponent } from './home/footeroff/footeroff.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MenuComponent,
    HomeAdminComponent,
    HomeUserComponent,
    HeaderpatodosComponent,
    AddAlumnoComponent,
    DetailAlumnoComponent,
    CardComponent,
    FooterComponent,
    SpinnerComponent,
    ModifyAlumnoComponent,
    FooteroffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [interceptorSpringProvider,{provide: MatDialogRef,
    useValue: {}}],

  bootstrap: [AppComponent]
})
export class AppModule { }
