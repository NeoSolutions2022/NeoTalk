import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { LanguagesHeaderComponent } from './components/languages-header/languages-header.component';
import {MatFormField, MatInput, MatPrefix} from "@angular/material/input";
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ChatComponent,
    LanguagesHeaderComponent,
    ChatInputComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatInput,
    MatIcon,
    MatFormField,
    MatPrefix,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
