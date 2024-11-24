import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GameRegisterService } from '../game-register.service';
import { MatTabsModule } from '@angular/material/tabs';
import { GameInfo } from '../../api/game-info';
import { Player } from '../../api/player';
import { Card } from '../../api/card';

@Component({
  selector: 'app-end-room',
  standalone: true,
  imports: [ CommonModule, 
             MatTabsModule,
             MatSlideToggleModule,
             FormsModule ],
  template: `
    
    <p>
      <button (click)="createTextList('DRAFT')">Export Draft List as Text</button>
    </p>
    <p>
      <button (click)="createTextList('DECK')">Export Deck List as Text</button>
    </p>
    <mat-slide-toggle class="cmc-sort-toggle"  [(ngModel)]="sortByCmcFlag">Sort Lists by CMC?</mat-slide-toggle>

    <mat-tab-group>
      <mat-tab label="Drafted Pool">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of this.draftedList">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" (click)="addCardToDeckList(card)" class = "grid-image" (mouseover)="handleHover(card)" (mouseout)="handleOffHover(card)">
            </div>
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Decklist">
        <div class="grid-container">
          <div class="grid-item" *ngFor="let card of this.deckList">
            <div class="image-container">
              <img [src]="card.details.image_normal" alt="Image" class="grid-image" (click)="removeCardFromDeckList(card)" (mouseover)="handleHover(card)" (mouseout)="handleOffHover(card)">
            </div>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group> 
  `,
  styleUrl: './end-room.component.scss'
})
export class EndRoomComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  gameID: string;
  playerName: string;
  gameInfo: GameInfo | undefined;
  player: Player | undefined;
  sortByCmcFlag: boolean = false;

  draftedMap: Map<string, Card>;
  draftedList: Card[];

  deckMap: Map<string, Card> | undefined;
  deckList: Card[];
  
  constructor(private gameService: GameRegisterService, private router: Router) {
    this.gameID = this.route.snapshot.params['gameID'];
    this.playerName = this.route.snapshot.params['playerName'];

    this.draftedMap = new Map<string, Card>();
    this.deckMap = new Map<string, Card>();
    this.deckList = [];
    this.draftedList = [];

    gameService.triggerGameEnd(this.gameID).then(item => {
      console.log("Ended Game: " + this.gameID);
    });
    gameService.getGameInfo(this.gameID).then(gameInfo => {
      this.gameInfo = gameInfo;
      this.player = this.gameInfo?.players.find(player => player.playerName === this.playerName);

      this.player?.cardsDrafted.forEach(card => {
        this.draftedMap!.set(card.cardID, card);
      });
      this.draftedList = this.draftedMap ? Array.from(this.draftedMap.values()) : [];
    });
  }

  createTextList(desiredList: string) {


    let exportList: Card[] = [];
    
    if (desiredList === 'DRAFT') {
      exportList = this.player?.cardsDrafted!;
    } 
    else if (desiredList === 'DECK') {
      exportList = this.deckList;
    }

    // Convert JSON object to a formatted string
    const jsonString = exportList.map((str, index) => {
                          return index === exportList.length - 1 ? str.name : str.name + ',';
                        }).join('\n');


    // Create a new window and write the JSON string
    const newTab = window.open();
    newTab!.document.open();
    newTab!.document.write('<pre>' + jsonString + '</pre>');
    newTab!.document.close();
  }

  addCardToDeckList(card: Card) {
    if (!this.deckMap?.has(card.cardID)) {

      // Fix image issue for flip cards
      if (card.details.image_flip !== null) {
        card.details.image_normal = card.details.image_small;
      }

      this.deckMap?.set(card.cardID, card);
      this.deckList = this.deckMap ? Array.from(this.deckMap?.values()): [];

      this.draftedMap?.delete(card.cardID);
      this.draftedList = this.draftedMap ? Array.from(this.draftedMap?.values()) : [];

      if (this.sortByCmcFlag) {
        this.sortListsByCMC();
      }
    }
  }

  // Remove Card From Decklist
  // Add Card to Drafted List
  removeCardFromDeckList(card: Card) {

    // Fix image issue for flip cards
    if (card.details.image_flip !== null) {
      card.details.image_normal = card.details.image_small;
    }

    this.deckMap?.delete(card.cardID);
    this.deckList = this.deckMap ? Array.from(this.deckMap.values()) : [];

    this.draftedMap?.set(card.cardID, card);
    this.draftedList = this.draftedMap ? Array.from(this.draftedMap?.values()) : [];

    if (this.sortByCmcFlag) {
      this.sortListsByCMC();
    }
  }

  sortListsByCMC() {
    this.draftedList?.sort((a, b) => a.cmc - b.cmc);
    this.deckList?.sort((a, b) => a.cmc - b.cmc);
  }
  
  handleHover(hoveredCard: Card) {

    if (hoveredCard.details.image_flip !== null) {
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