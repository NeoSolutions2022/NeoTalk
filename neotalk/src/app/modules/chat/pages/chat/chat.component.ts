import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  chatForm: any;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }
}
