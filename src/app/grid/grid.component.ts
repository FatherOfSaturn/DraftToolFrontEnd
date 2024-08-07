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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [ CommonModule,
             MatProgressBarModule,
             FormsModule,
             MatSlideToggleModule,
             MatTabsModule,
             MatSnackBarModule
            ],
  template: `
    <mat-progress-bar mode="determinate" [value]="packsDraftedPercent" class="progress-bar"></mat-progress-bar>
    <mat-slide-toggle class="double-draft-toggle" [disabled]="disableCheckboxFlag" [(ngModel)]="checkboxValue">
      <span class ="draft-pick-text">
      Click to enable double draft Pick, you have {{this.player?.doubleDraftPicksRemaining}} remaining.
      </span>
    </mat-slide-toggle>
    <p class="game-text">Your Game ID is {{this.gameId}}, Your Draft partner's name is {{this.partnerName}}. Current Pack: {{this.packNumber}}</p>
    <mat-tab-group class="draft-board">
      <!-- Adding a class to this causes the progress bar stying to go away -->
      <mat-tab class="header"label="Draft Pack">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of currentPack?.cardsInPack">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" (click)="handleCardSelection(card)" class = "grid-image" (mouseover)="handleHover(card)" (mouseout)="handleOffHover(card)">
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Your Selections" *ngIf="player!.cardsDrafted!.length > 0">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of player!.cardsDrafted">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" class="grid-image" (mouseover)="handleHover(card)" (mouseout)="handleOffHover(card)">
            </div>
          </div>
        </div>
      </mat-tab>
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
  partnerName: string | undefined;

  constructor(private gameService: GameRegisterService, private router: Router, private _snackBar: MatSnackBar) {
    this.gameId = this.route.snapshot.params['gameID'];
    this.playerName = this.route.snapshot.params['playerName'];

    console.log("Swapped to Grid, GameID: " + this.gameId + "\nPlayerName: " + this.playerName);

    gameService.getGameInfo(this.gameId).then(gameInfo => {
      this.gameInfo = gameInfo;
      console.log("Grid gameInfo ID: " + this.gameInfo.gameID + "\nPlayer#: " + this.gameInfo.players.length);
      this.player = this.gameInfo?.players.find(player => player.playerName === this.playerName);
      this.partnerName = this.gameInfo?.players.find(player => !(player.playerName === this.playerName))?.playerName;
      this.currentPack = this.player?.cardPacks.find(pack => (pack.packNumber === this.player?.currentDraftPack));
      this.packNumber = this.player?.currentDraftPack ?? 0;
      console.log("Pack Number: " + this.packNumber);
      this.evaluateCheckbox();
      this.packsDraftedPercent = (this.packNumber / this.player!.cardPacks.length) * 100;
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

      console.log("GAME STATE: " + this.gameInfo?.gameState);

      // technically just set the next pack
      this.currentPack = this.player?.cardPacks.find(pack => (pack.packNumber === this.packNumber));
      this.evaluateCheckbox();
      if (this.packsDraftedPercent === 100 && this.gameInfo?.gameState !== 'GAME_MERGED') {
        this.router.navigate(['/waiting', this.gameId, this.player?.playerName]);
      }
      else if (this.packsDraftedPercent === 100 && (this.gameInfo?.gameState === 'GAME_MERGED' || this.gameInfo?.gameState === 'GAME_COMPLETE')) {
        this.router.navigate(['/endGame', this.gameId, this.player?.playerName]);
      }
    }
  }

  evaluateCheckbox() {

    if (this.currentPack?.doubleDraftedFlag) {
      console.log("pack flagged as being double drafted");
      this.disableCheckboxFlag = true;
    }
    else if (this.player!.doubleDraftPicksRemaining > 0) {
      console.log("You have double drafts left.");
      this.disableCheckboxFlag = false;
    }
    else {
      this.disableCheckboxFlag = true;
    }
  }

  draftCardAndCheckValue(card: Card, doublePick: boolean) {

    console.log("Card PackNumber: \n" + this.currentPack?.packNumber);
    
    // Fix image issue for flip cards
    if (card.details.image_flip !== null) {
      card.details.image_normal = card.details.image_small;
    }

    this.gameService.draftCard(this.gameId,
                               this.player!.playerID,
                               this.currentPack!.packNumber,
                               card.cardID,
                               doublePick).then(item => 
      {
        if (item.cardID != card.cardID) {
          // Throw some error
          console.log("Card Drafted in back end not equal to current card");
          return false;
        }
        this.player?.cardsDrafted.push(card);
        return true;
      }).then(success => {
        if (success) {
          console.log("Successfully drafted " + card.name + " for " + this.playerName);
          this._snackBar.open("Successfully drafted " + card.name + " for " + this.playerName, '', {
            duration: 3000
          });
        }
        else {
          console.log("Error drafting: blah, opening dialog box to refresh the page.");
        }
      });
  }

  handleHover(hoveredCard: Card) {

    if (hoveredCard.details.image_flip !== null) {
      console.log("Card has a flip: " + hoveredCard.name);
      // Probably not the cleanest but I dont use the small image anyway
      hoveredCard.details.image_small = hoveredCard.details.image_normal;

      hoveredCard.details.image_normal = hoveredCard.details.image_flip;
    }
  }

  handleOffHover(offHoverCard: Card) {

    if (offHoverCard.details.image_flip !== null) {

      offHoverCard.details.image_normal = offHoverCard.details.image_small
      
    }
  }
}
