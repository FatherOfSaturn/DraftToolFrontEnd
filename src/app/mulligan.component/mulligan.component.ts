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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-end-room',
  standalone: true,
  imports: [ CommonModule, 
             MatTabsModule,
             MatSlideToggleModule,
             FormsModule,
             MatGridListModule,
             MatCheckboxModule,
             MatSelectModule ],
  template: `

<div style="width: 100%; height: auto;">
  <mat-grid-list cols="10" rowHeight="2.5:3.5">
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/d/5/d573ef03-4730-45aa-93dd-e45ac1dbaf4a.jpg?1559591645" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
      <mat-grid-tile>
        <img src="https://cards.scryfall.io/normal/front/9/6/96ff9de6-f9ae-4b1c-9fd1-4ba9663922af.jpg?1643589644" 
             alt="Card Image" 
             style="width: 100%; height: 100%; object-fit: cover;">
      </mat-grid-tile>
    </mat-grid-list>
</div>

  `,
  styleUrl: './mulligan.component.scss'
})
export class MulliganComponent {

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
    // gameService.getGameInfo(this.gameID).then(gameInfo => {
    //   this.gameInfo = gameInfo;
    //   this.player = this.gameInfo?.players.find(player => player.playerName === this.playerName);

    //   this.player?.cardsDrafted.forEach(card => {
    //     this.draftedMap!.set(card.cardID, card);
    //   });
    //   this.draftedList = this.draftedMap ? Array.from(this.draftedMap.values()) : [];
    // });

    
    this.playerName = "Josh";
    gameService.getFakeGameData().then(gameInfo => {
      this.gameInfo = gameInfo;
      this.gameID = gameInfo.gameID;
      console.log("Grid gameInfo ID: " + this.gameInfo.gameID + "\nPlayer#: " + this.gameInfo.players.length);
      this.player = this.gameInfo?.players.find(player => player.playerName === this.playerName);

      console.log(this.player!.cardsDrafted.length);
      
      // Do not use a map, it will remove multiple copies of a card

      this.player?.cardsDrafted.forEach(card => {
        this.draftedMap!.set(card.cardID, card);
      });
      this.draftedList = this.draftedMap ? Array.from(this.draftedMap.values()) : [];
    });
  }

  getResponsiveCols(): number {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) return 4; // Desktop
    if (screenWidth > 768) return 3;  // Tablet
    return 2;                         // Mobile
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
      if (card.details.image_flip !== undefined) {
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
    if (card.details.image_flip !== undefined) {
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

    if (hoveredCard.details.image_flip !== undefined) {
      // Probably not the cleanest but I dont use the small image anyway
      hoveredCard.details.image_small = hoveredCard.details.image_normal;

      hoveredCard.details.image_normal = hoveredCard.details.image_flip;
    }
  }

  handleOffHover(offHoverCard: Card) {

    if (offHoverCard.details.image_flip !== undefined) {

      offHoverCard.details.image_normal = offHoverCard.details.image_small
      
    }
  }
}
