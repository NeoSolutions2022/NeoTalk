import { Component, NgZone, OnInit } from '@angular/core';
import { PoseService } from '../../../../services/pose.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrl: 'chat.component.scss',
})
export class ChatComponent implements OnInit {
  poseData: any;
  message: string = 'Olá, tudo bem?';
  poseViewer: any;
  recognition: any;
  transcript: string = '';
  loadingContent: boolean = false;
  isListening: boolean = false;

  constructor(private ngZone: NgZone, private poseService: PoseService) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('SpeechRecognition não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR';

    this.recognition.onresult = (event: any) => {
      console.log('Reconhecimento de voz:', event);
      this.ngZone.run(() => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          setTimeout(() => {}, 1000);

          this.message = event.results[i][0].transcript;
        }
      });
    };

    this.recognition.onerror = (event: any) => {
      alert(event.error);
      console.error('Erro no reconhecimento de voz:', event.error);
    };

    this.recognition.onend = () => {
      console.log('Reconhecimento de voz finalizado.');
      this.isListening = false;
    };
  }

  startListening() {
    this.message = '';
    this.transcript = '';
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
    if (!this.message) return;
    this.loadingContent = true;
    this.poseService.getPoseData(this.message).subscribe({
      next: (data) => {
        this.poseData = URL.createObjectURL(data);
        console.log(URL.createObjectURL(data));
        this.poseViewer.setAttribute('src', this.poseData);
        console.log(this.poseViewer);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.transcript = '';
        this.loadingContent = false;
      },
    });
  }

  async ngOnInit() {
    await customElements.whenDefined('pose-viewer').then(() => {
      this.setupPoseViewer('example', 'Olá, tudo bem?');
      this.setupPoseViewer('example2', 'Olá, tudo bem?');
      this.setupPoseViewer('example3', 'Olá, tudo bem?');
      this.setupPoseViewer('example4', 'Olá, tudo bem?');
    });
  }

  private setupPoseViewer(elementId: string, text: string) {
    const poseViewer = document.querySelector(
      `pose-viewer#${elementId}`
    ) as HTMLElement;
    if (poseViewer) {
      poseViewer.setAttribute(
        'src',
        `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text=${text}`
      );
      console.log(poseViewer);
    }
  }

  translateText() {
    if (!this.message) return;
    this.poseViewer.setAttribute(
      'src',
      `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text=${this.message}`
    );
    this.message = '';
    this.transcript = '';
    // this.httpClient.get(`https://sign.mt/api/v1/spoken-text-to-signed-pose?spoken=pt&signed=psr&text=${this.message}`,
    //   {
    //     headers: {
    //     'Authorization': `${atob('TmVvVGFsa18yVWRYdVI5RWZnZ05hTm45cW5ZVHlWckp2YnB2UnN5cE5udkplS3Z4Q0E4b1E0')}`
    //     },
    //     responseType: 'arraybuffer'
    //   })
    //   .subscribe({
    //     next: (response: any) => {
    //       //response é um arraybuffer
    //       //criar um arquivo .pose a partir do arraybuffer
    //       const blob = new Blob([response], { type: 'application/octet-stream' });
    //       console.log(blob);
    //
    //       //criar uma url para o arquivo .pose
    //       this.poseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    //       console.log(this.poseUrl);
    //     },
    //     error: (error: any) => {
    //       console.error(error);
    //     }
    //   });
  }

  protected readonly console = console;
}
