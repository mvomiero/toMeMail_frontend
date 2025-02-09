import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'messages/create', component: CreateMessageComponent},
    { path: 'messages/:id', component: MessageDetailComponent },
    
];
