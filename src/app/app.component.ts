import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
            MatIconModule],
  template: `
  <main>
    <a [routerLink]="['/']">
      <header class="brand-name">     
        <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
      </header>
    </a>
    <!-- <a>
      <div class="cropped-image-container">
        <img src="https://cards.scryfall.io/small/front/0/9/0900e494-962d-48c6-8e78-66a489be4bb2.jpg?1625771770" alt="Drafted List">
      </div>
    </a> -->
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
    styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'draft-tool';
  textInput: string = '';

  submit() {
    
  }
}
