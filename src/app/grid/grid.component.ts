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
      <mat-tab label="Your Selections">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of player!.cardsDrafted!">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" class = "grid-image">
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
  // players: Player[] = [];
  player: Player | undefined;
  gameInfo: GameInfo | undefined;
  gameId: string;
  currentPack: CardPack | undefined;
  packNumber: number = 0;
  packsDraftedPercent: number = 0;
  disableCheckboxFlag: boolean = true;
  checkboxValue: boolean = false;
  showHover: boolean = false;
  

  // constructor(private gameService: GameRegisterService, private player: Player) {
  //   this.gameId = this.route.snapshot.params['gameId'];
  //   this.currentPack = player.cardPacks.at(0)!;
  //   this.player = player;

  // }

  constructor(private gameService: GameRegisterService, private router: Router) {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameInfo = this.gameService.gameInfo;

    if (this.gameInfo !== undefined) {
      this.gameService.createDummyGame(this.gameInfo).then(item => {

        this.player = item.at(0)!;
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
      console.log("Double picks remaining: ", this.player!.doubleDraftPicksRemaining);
      this.player!.doubleDraftPicksRemaining--;
      this.disableCheckboxFlag = true;
      this.checkboxValue = false;

      this.draftCardAndCheckValue(card);
      // do not move on to next pack
      this.currentPack!.cardsInPack = this.currentPack?.cardsInPack.filter(item => item.cardID !== card.cardID)!;
      // make rest call to draft card
    }
    else {
      this.packNumber++;
      this.packsDraftedPercent = (this.packNumber / this.player!.cardPacks.length) * 100;

      // technically just set the next pack
      this.currentPack = this.player!.cardPacks.at(this.packNumber)!;
      this.draftCardAndCheckValue(card);
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

  draftCardAndCheckValue(card: Card) {

    // this.gameService.draftCard(this.player!.playerName,
    //                            this.currentPack!.packNumer,
    //                            card.cardID).then(item => 
    //   {
    //     if(item.cardID != card.cardID) {
    //       // Throw some error
    //       console.log("Card Drafted in back end not equal to current card");
    //     }
    //   });

    this.player?.cardsDrafted.push(card);
  }

  showHoverImage(value: boolean): void {
    this.showHover = value;
  }
}
