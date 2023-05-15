import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from 'src/app/views/chat/chat.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { ProductComponent } from 'src/app/views/product/product.component';
import { UploadPage } from 'src/app/views/upload/upload.component';
import { SingleChatComponent } from './views/single-chat/single-chat.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
  path: 'upload',
  component: UploadPage
},
{
  path: 'login',
  component: LoginPageComponent
},
{
  path: 'product/:id',
  component: ProductComponent
},
{
  path: 'chat',
  component: ChatComponent
},
{
  path: 'chat/:id',
  component: SingleChatComponent
},
{
  path: '**',
  redirectTo:"",
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
