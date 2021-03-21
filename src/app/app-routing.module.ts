import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontDetailComponent } from './components/front-detail/front-detail.component';
import { BannerEditComponent } from './components/banner-edit/banner-edit.component';
import { BannerComponent } from './components/banner/banner.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FrontComponent } from './components/front/front.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewBannerComponent } from './components/new-banner/new-banner.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { Page404Component } from './components/page404/page404.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostFrontComponent } from './components/post-front/post-front.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'', component:FrontComponent},
  {path:'details/:id', component:FrontDetailComponent},
  {path:'login', component:LoginComponent},
  {path:'recuperar', component:ForgotPasswordComponent},
  {path:'home' , 
  component:HomeComponent, 
  canActivate:[AuthGuard]},
  {path:'post', 
  component:PostComponent,
  canActivate:[AuthGuard]},
  {path:'post-create', 
  component:NewPostComponent,
  canActivate:[AuthGuard]},
  {path:'post-edit/:id', 
  component:PostEditComponent,
  canActivate:[AuthGuard]},
  {path:'banner', 
  component:BannerComponent,
  canActivate:[AuthGuard]},
  {path:'banner-create', 
  component:NewBannerComponent,
  canActivate:[AuthGuard]},
  {path:'banner-edit/:id', 
  component:BannerEditComponent,
  canActivate:[AuthGuard]},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
