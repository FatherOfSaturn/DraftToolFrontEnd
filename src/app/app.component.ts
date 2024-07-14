import { GameRegisterService } from './game-register.service';
import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface Background {
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, 
            MatIconModule, 
            HttpClientModule,
            MatSelectModule,
            MatFormFieldModule,
            MatInputModule,
            FormsModule],
  template: `
  <main>
      <header class="brand-name">
        <!-- <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon> -->
        <a [routerLink]="['/']">
          <button mat-button class="home-button">
            <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
            Home
          </button>
        </a>
        <mat-form-field class="background-field">
          <mat-label>Background</mat-label>
          <mat-select [(ngModel)]="selectedBackground" name="food" (selectionChange)="changeBackground(selectedBackground)">
            @for (background of backgrounds; track background) {
              <mat-option [value]="background.value">{{background.viewValue}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppConfigService],
    //   useFactory: (appConfigService: AppConfigService) => {
    //     return () => {
    //       //Make sure to return a promise!
    //       return appConfigService.loadAppConfig();
    //     };
    //   }
    // }
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'draft-tool';
  textInput: string = '';
  selectedBackground: string = "url(/assets/Lands_Background.jpg)";
  backgrounds: Background[] = [
    { value: 'url(/assets/Griselbrand.jpg)', viewValue: "Griselbrand" },
    { value: 'url(/assets/Lands_Background.jpg)', viewValue: "Lands" },
    { value: 'url(/assets/Serra_Angel.png)', viewValue: "Serra" },
    { value: 'url(/assets/Rakdos.png)', viewValue: "Rakdos" },
    { value: 'url(/assets/Counterspell.jpg)', viewValue: "Counterspell" }
  ]

  constructor(private renderer: Renderer2) {}

  changeBackground(imageLink: string) {
    this.renderer.setStyle(document.body, 'background-image', imageLink);
  }
}