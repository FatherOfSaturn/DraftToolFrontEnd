import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Player } from '../../api/player';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRegisterService } from '../game-register.service';
import { GameInfo } from '../../api/game-info';
import { CardPack } from '../../api/card-pack';
import { Card } from '../../api/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [ CommonModule,
             MatProgressBarModule,
             FormsModule,
             MatSlideToggleModule,
             MatTabsModule
            ],
  template: `
    <mat-progress-bar mode="determinate" [value]="packsDraftedPercent" class="progress-bar"></mat-progress-bar>
    <mat-slide-toggle class="double-draft-toggle" [disabled]="disableCheckboxFlag" [(ngModel)]="checkboxValue">Click to enable double draft Pick</mat-slide-toggle>

    <mat-tab-group>
      <mat-tab label="Draft Pack">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of currentPack?.cardsInPack">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" (click)="handleCardSelection(card)" class = "grid-image">
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Your Selections" *ngIf="player!.cardsDrafted!.length > 0">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of player!.cardsDrafted">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" class="grid-image">
            </div>
          </div>
        </div>
      </mat-tab>

      <!-- <mat-tab label="Your Selections">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of player!.cardsDrafted!">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" class = "grid-image">
            </div>
          </div>
        </div>
      </mat-tab> -->
    </mat-tab-group> 
  `,
  styleUrl: './grid.component.css'
})
export class GridComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  player: Player | undefined;
  gameInfo: GameInfo | undefined;
  gameId: string;
  currentPack: CardPack | undefined;
  packNumber: number = 0;
  packsDraftedPercent: number = 0;
  disableCheckboxFlag: boolean = true;
  checkboxValue: boolean = false;
  showHover: boolean = false;
  playerName: string;

  constructor(private gameService: GameRegisterService, private router: Router) {
    this.gameId = this.route.snapshot.params['gameID'];
    this.playerName = this.route.snapshot.params['playerName'];

    console.log("Swapped to Grid, GameID: " + this.gameId + "\nPlayerName: " + this.playerName);

    gameService.getGameInfo(this.gameId).then(gameInfo => {
      this.gameInfo = gameInfo;
      console.log("Grid gameInfo ID: " + this.gameInfo.gameID + "\nPlayer#: " + this.gameInfo.players.length);
      this.player = this.gameInfo?.players.find(player => player.playerName === this.playerName);
      this.currentPack = this.player?.cardPacks.at(0);
      console.log("Current Pack: \n" + JSON.stringify(this.currentPack));
      this.packNumber = 0;
    });
  }

  handleCardSelection(card: Card) {

    // if they decide to use a double draft pick
    if (this.checkboxValue) {
      console.log("You have selected to double draft");
      console.log("Double picks remaining: ", this.player!.doubleDraftPicksRemaining);
      this.player!.doubleDraftPicksRemaining--;
      this.disableCheckboxFlag = true;
      this.checkboxValue = false;

      this.draftCardAndCheckValue(card, true);
      // do not move on to next pack
      this.currentPack!.cardsInPack = this.currentPack?.cardsInPack.filter(item => item.cardID !== card.cardID)!;
      // make rest call to draft card
    }
    else {
      this.draftCardAndCheckValue(card, false);

      this.packNumber++;
      this.packsDraftedPercent = (this.packNumber / this.player!.cardPacks.length) * 100;
      
      // technically just set the next pack
      this.currentPack = this.player!.cardPacks.at(this.packNumber)!;
      this.evaluateCheckbox();
      if (this.packsDraftedPercent === 100) {
        this.router.navigate(['/waiting', this.gameId, this.player?.playerID]);
      }
    }
  }

  evaluateCheckbox() {
    if (this.player!.doubleDraftPicksRemaining > 0) {
      this.disableCheckboxFlag = false;
    }
    else {
      this.disableCheckboxFlag = true;
    }
  }

  draftCardAndCheckValue(card: Card, doublePick: boolean) {

    console.log("Card Pack For Selection: \n" + JSON.stringify(this.currentPack));
    console.log("Card PackNumber: \n" + this.currentPack?.packNumber);

    this.gameService.draftCard(this.gameId,
                               this.player!.playerID,
                               this.currentPack!.packNumber,
                               card.cardID,
                               doublePick).then(item => 
      {
        if(item.cardID != card.cardID) {
          // Throw some error
          console.log("Card Drafted in back end not equal to current card");
        }
        this.player?.cardsDrafted.push(card);
      });
  }

  showHoverImage(value: boolean): void {
    this.showHover = value;
  }
}
