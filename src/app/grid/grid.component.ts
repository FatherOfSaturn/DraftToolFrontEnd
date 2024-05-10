import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Player } from '../../api/player';
import { ActivatedRoute } from '@angular/router';
import { GameRegisterService } from '../game-register.service';
import { GameInfo } from '../../api/game-info';
import { CardPack } from '../../api/card-pack';
import { Card } from '../../api/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  draftBoard: boolean;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [ CommonModule,
             MatProgressBarModule,
             FormsModule,
             MatGridListModule,
             MatSlideToggleModule,
             MatSidenavModule,
             MatListModule
            ],
  template: `
    <mat-progress-bar mode="determinate" [value]="packsDraftedPercent" class="progress-bar"></mat-progress-bar>
    <mat-slide-toggle class="double-draft-toggle" [disabled]="disableCheckboxFlag" [(ngModel)]="checkboxValue">Click to enable double draft Pick</mat-slide-toggle>

  <mat-grid-list cols="4" rows="6">
  @for (tile of tiles; track tile) {
    <mat-grid-tile
      [colspan]="tile.cols"
      [rowspan]="tile.rows"
      [style.background]="tile.color">

    <div class="grid-container" *ngIf="tile.draftBoard">
      <div class="grid-item" *ngFor="let card of currentPack?.cardsInPack">
        <div class="image-container">
          <img [src]="card.details.image_normal" alt="Image" (click)="handleCardSelection(card)">
        </div>
      </div>
    </div>
    <div *ngIf="!tile.draftBoard">
      <mat-list>
        <mat-list-item *ngFor="let card of players.at(0)!.cardsDrafted!" class="custom-list-item" style="align-items: flex-start;">
        <div class="list-item-content">
          {{card.name}}
        </div>
        </mat-list-item>
      </mat-list>
    </div>
    </mat-grid-tile>
  }
  </mat-grid-list>
  `,
  styleUrl: './grid.component.css'
})
export class GridComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  players: Player[] = [];
  gameInfo: GameInfo | undefined;
  gameId: string;
  currentPack: CardPack | undefined;
  packNumber: number = 0;
  packsDraftedPercent: number = 0;
  disableCheckboxFlag: boolean = true;
  checkboxValue: boolean = false;
  showHover: boolean = false;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 6, color: 'lightblue', draftBoard: true},
    {text: 'Two', cols: 1, rows: 6, color: 'lightgreen', draftBoard: false},
  ];

  constructor(private gameService: GameRegisterService) {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameInfo = this.gameService.gameInfo;

    if (this.gameInfo !== undefined) {
      this.gameService.createDummyGame(this.gameInfo).then(item => {

        this.players = item;
        this.currentPack = item.at(0)!.cardPacks.at(this.packNumber)!;
        item.at(0)!.cardsDrafted = [];
        this.evaluateCheckbox();
      });
    } 
  }

  handleCardSelection(card: Card) {

    // if they decide to use a double draft pick
    if (this.checkboxValue) {
      console.log("You have selected to double draft");
      console.log("Double picks remaining: ", this.players.at(0)!.doubleDraftPicksRemaining);
      this.players.at(0)!.doubleDraftPicksRemaining--;
      this.disableCheckboxFlag = true;
      this.checkboxValue = false;

      this.draftCardAndCheckValue(card);
      // do not move on to next pack
      this.currentPack!.cardsInPack = this.currentPack?.cardsInPack.filter(item => item.cardID !== card.cardID)!;
      // make rest call to draft card
    }
    else {
      this.packNumber++;
      this.packsDraftedPercent = (this.packNumber / this.players.at(0)!.cardPacks.length) * 100;

      // technically just set the next pack
      this.currentPack = this.players.at(0)!.cardPacks.at(this.packNumber)!;
      this.draftCardAndCheckValue(card);
      this.evaluateCheckbox();
    }
  }

  evaluateCheckbox() {
    if (this.players.at(0)!.doubleDraftPicksRemaining > 0) {
      this.disableCheckboxFlag = false;
    }
    else {
      this.disableCheckboxFlag = true;
    }
  }

  draftCardAndCheckValue(card: Card) {

    // this.gameService.draftCard(this.players.at(0)!.playerName,
    //                            this.currentPack!.packNumer,
    //                            card.cardID).then(item => 
    //   {
    //     if(item.cardID != card.cardID) {
    //       // Throw some error
    //       console.log("Card Drafted in back end not equal to current card");
    //     }
    //   });

    this.players.at(0)?.cardsDrafted.push(card);
  }

  showHoverImage(value: boolean): void {
    this.showHover = value;
  }
}
