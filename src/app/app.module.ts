import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderBannerComponent } from './shared/header-banner/header-banner.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { FrontComponent } from './components/front/front.component';
import { PostFrontComponent } from './components/post-front/post-front.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { BannerComponent } from './components/banner/banner.component';
import { NewBannerComponent } from './components/new-banner/new-banner.component';
import { Page404Component } from './components/page404/page404.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BannerEditComponent } from './components/banner-edit/banner-edit.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { FrontDetailComponent } from './components/front-detail/front-detail.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    FrontComponent,
    PostFrontComponent,
    NewPostComponent,
    PostEditComponent,
    BannerComponent,
    NewBannerComponent,
    Page404Component,
    ForgotPasswordComponent,
    BannerEditComponent,
    HeaderBannerComponent,
    FrontDetailComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
