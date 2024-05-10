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
    <a [routerLink]="['/pyramid']">
      <button mat-raised-button>Pyramid Draft</button>
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'draft-tool';
  textInput: string = '';

  submit() {
    
  }
}
