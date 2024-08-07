import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { LanguagesHeaderComponent } from './components/languages-header/languages-header.component';
import {MatInput} from "@angular/material/input";
import { ChatInputComponent } from './components/chat-input/chat-input.component';


@NgModule({
  declarations: [
    ChatComponent,
    LanguagesHeaderComponent,
    ChatInputComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatInput
  ]
})
export class ChatModule { }
