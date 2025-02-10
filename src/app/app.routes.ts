import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'messages/create', component: CreateMessageComponent, canActivate: [AuthGuard] },
    { path: 'messages/:id', component: MessageDetailComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent }
    
];
