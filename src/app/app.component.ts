import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, 
            MatIconModule,
            MatSelectModule,
            MatFormFieldModule,
            MatInputModule,
            FormsModule,
            MatToolbarModule,
            MatButtonModule],
  template: `
  
  <main>
    <div class="page-container">
      <header>
        <mat-toolbar class="toolbar" color="primary">
          <a [routerLink]="['/']">
            <button mat-icon-button class="home-button" aria-label="Example Home Icon">
              <mat-icon class="large-icon" color="accent">home</mat-icon>
            </button>
          </a>
          <div class="center-buttons">
            <a [routerLink]="['/pyramid']">
              <button mat-flat-button class="toolbar-button" color="primary">Pyramid Draft</button>
            </a>
            <a [routerLink]="['/deckBuilder']">
              <button mat-flat-button class="toolbar-button" color="primary">Deck Builder</button>
            </a>
            <a [routerLink]="['/mulligan']">
              <button mat-flat-button class="toolbar-button" color="primary">Mulligan Sim</button>
            </a>
            <button mat-flat-button class="toolbar-button"  color="primary">Battle Box</button>
          </div>
          <button mat-icon-button aria-label="User profile" class="account-button">
            <mat-icon color="accent">account_circle</mat-icon>
          </button>
        </mat-toolbar>
      </header>

      <main class="content">
        <div class="content-container">
          <router-outlet></router-outlet>
        </div>
      </main>

        <footer class="footer">
          <div class="footer-content">
            <div class="footer-icons">
              <img src="assets/icons/gmail.svg" alt="GitHub" class="social-icon" />
              <img src="assets/icons/discord.svg" alt="GitHub" class="social-icon" />
              <a href="https://github.com/FatherOfSaturn" target="_blank" rel="noopener noreferrer">
                <img src="assets/icons/github.svg" alt="GitHub" class="social-icon" />
              </a>
              <img src="assets/icons/linkedin.svg" alt="LinkedIn" class="social-icon" />
            </div>
            <div class="footer-links">
              <h3>Helpful Links</h3>
              <p>Cube Cobra</p>
              <p>Scryfall</p>
            </div>
          </div>
        </footer>

      </div>

  </main>
  `,
  providers: [
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'draft-tool';
  textInput: string = '';
  selectedBackground: string = "url(/assets/Lands_Background.jpg)";

  constructor() {}

}