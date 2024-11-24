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
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexPlotOptions, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
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
             NgApexchartsModule,
             MatSelectModule ],
  template: `
<!--     
    <p>
      <button (click)="createTextList('DRAFT')">Export Draft List as Text</button>
    </p>
    <p>
      <button (click)="createTextList('DECK')">Export Deck List as Text</button>
    </p>
    <mat-slide-toggle class="cmc-sort-toggle"  [(ngModel)]="sortByCmcFlag">Sort Lists by CMC?</mat-slide-toggle> -->

    <p>Export Deck List as:
      <mat-form-field>
        <mat-label>Select</mat-label>
        <mat-select>
          <mat-option value="one">First option</mat-option>
          <mat-option value="two">Second option</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-flat-button>Export</button>
      Export Draft Pool as:
      <mat-form-field>
        <mat-label>Select</mat-label>
        <mat-select>
          <mat-option value="one">First option</mat-option>
          <mat-option value="two">Second option</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-flat-button>Export</button>
    </p>

    <mat-grid-list cols="4" rowHeight="2:1">
      <mat-grid-tile class="mat-grid-tile tileOne">
        <ul class="left-align">
          <div class="filterBoxes">
            <li>
              <mat-checkbox>Creatures</mat-checkbox>
            </li> 
          </div>
          <li>
          <mat-checkbox>Instants</mat-checkbox>
          </li>
          <li>
          <mat-checkbox>Sorceries</mat-checkbox>
          </li>
          <li>
          <mat-checkbox>Enchantment</mat-checkbox>
          </li>
          <li>
          <mat-checkbox>Land</mat-checkbox>
          </li>
        </ul>
      </mat-grid-tile>
      <mat-grid-tile>
      <div>
        <apx-chart
          [series]="colorChartData"
          [chart]="pieChartType"
          [title]="colorChartTitle"
          [labels]="colorChartLabels"
          [colors]="colorChartColors">
        </apx-chart>
      </div>
      </mat-grid-tile>
      <mat-grid-tile>
      <div>
        <apx-chart
          [series]="cardTypeData"
          [chart]="pieChartType"
          [title]="cardTypesChartTitle"
          [labels]="cardTypeChartLabels"
          [colors]="cardTypeChartColors">
        </apx-chart>
      </div>
      </mat-grid-tile>
      <mat-grid-tile>
      <div>
        <apx-chart
          [series]="[ { name: 'CMC', data: cmcBarGraphData } ]"
          [chart]="cmcChartDetails"
          [title]="cmcChartTitle"
          [xaxis]="cmcChartXAxis"
          [yaxis]="cmcChartYAxis"
          [plotOptions]="cmcChartPlotOptions">
        </apx-chart>
      </div>
      </mat-grid-tile>
    </mat-grid-list>

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
  styleUrl: './deck-builder.component.scss'
})
export class DeckBuilderComponent {

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

      this.updateGraphs(card, false);
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
    
    this.updateGraphs(card, true);
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

  updateGraphs(card: Card, remove: boolean) {

    // Create better Vars/Organization for the Graphs to use, also make vars for the pie charts
    // Add a conditional to this to either add or remove a card from the charts to call

    console.log("cmc:" + card.cmc);

    if (remove) {
      // remove from the graphs
      const currentValue = this.cmcBarGraphMap.get(card.cmc) || 0;
      if (currentValue > 1) {
        this.cmcBarGraphMap.set(card.cmc, currentValue - 1);
      } else {
        this.cmcBarGraphMap.delete(card.cmc);
      }

      // update color chart
      this.determineManaCost(card, true);

    } else {
      // you want to add to the graphs
      // Update Bar Graph
      this.cmcBarGraphMap.set(card.cmc, (this.cmcBarGraphMap.get(card.cmc) || 0) + 1);
      
      // update color chart
      this.determineManaCost(card, false);
    }
    
    // Update bar graph
    this.cmcBarGraphLabels = Array.from(this.cmcBarGraphMap.keys()).sort((a, b) => a - b);
    this.cmcBarGraphData = this.cmcBarGraphLabels.map(key => this.cmcBarGraphMap.get(key)!);
    this.cmcChartXAxis = { ...this.cmcBarGraphData, categories: this.cmcBarGraphLabels };
  }

  determineManaCost(card: Card, remove: boolean) {
    // how does phyrexian mana look?
    card.details.parsed_cost.forEach((cost) => {
      switch (cost) {
        case 'w':
          this.whiteCardCount += remove ? -1 : 1;
          break;
        case 'u':
          this.blueCardCount += remove ? -1 : 1;
          break;
        case 'b':
          this.blackCardCount += remove ? -1 : 1;
          break;
        case 'r':
          this.redCardCount += remove ? -1 : 1;
          break;
        case 'g':
          this.greenCardCount += remove ? -1 : 1;
          break;
        default:
          break;
      }
    });
    // Update Graph Data
    this.colorChartData = [this.whiteCardCount, this.blueCardCount, this.blackCardCount, this.redCardCount, this.greenCardCount, this.colorlessCardCount];

    const words = ["artifact", "creature", "enchantment", "land", "instant", "sorcery", "planeswalker", "battle"];
    const wordActions = new Map<string, () => void>([
      ["artifact", () => this.artifactCardCount += remove ? -1 : 1],
      ["creature", () => this.creatureCardCount += remove ? -1 : 1],
      ["enchantment", () => this.enchantmentCardCount += remove ? -1 : 1],
      ["land", () => this.landCardCount += remove ? -1 : 1],
      ["instant", () => this.instantCardCount += remove ? -1 : 1],
      ["sorcery", () => this.sorceryCardCount += remove ? -1 : 1],
      ["planeswalker", () => this.planeswalkerCardCount += remove ? -1 : 1],
      ["battle", () => this.battleCardCount += remove ? -1 : 1],
    ]);

    const foundWords = words.filter((word) => card.type_line.toLowerCase().includes(word));

    if (foundWords.length > 0) {
      // Perform actions for each found word
      foundWords.forEach((word) => {
        wordActions.get(word)?.();
      });
    } else {
      console.log("Unable to find card type: " + card.type_line);
      this.unknownCardCount+= remove ? -1 : 1;
    }
    
    // Update Graph Data
    this.cardTypeData = [this.artifactCardCount, 
                        this.creatureCardCount, 
                        this.enchantmentCardCount, 
                        this.landCardCount, 
                        this.instantCardCount, 
                        this.sorceryCardCount,
                        this.planeswalkerCardCount,
                        this.battleCardCount,
                        this.unknownCardCount];
  }

// *****************************************************************
// **********************BAR GRAPH START****************************
// *****************************************************************
    // Make the Key the Labels
    // Make the Values the # of cards
    cmcBarGraphMap = new Map<number, number>();

    // CMC cost bar
    cmcBarGraphLabels: number[] = Array.from(this.cmcBarGraphMap.keys());
    cmcBarGraphData: number[] = Array.from(this.cmcBarGraphMap.values());
  
    // Chart details configuration
    cmcChartDetails: ApexChart = {
      type: 'bar',
    };
    // Title Configuration
    cmcChartTitle: ApexTitleSubtitle = {
      text: 'Converted Mana Cost',
    };
  
    // X-Axis Configuration
    cmcChartXAxis: ApexXAxis = {
      categories: this.cmcBarGraphLabels, // Month names
    };
  
    // Y-Axis Configuration
    cmcChartYAxis: ApexYAxis = {
      title: {
        text: '# of Cards',
      },
    };
  
    // Plot Options for the Bar Chart
    cmcChartPlotOptions: ApexPlotOptions = {
      bar: {
        horizontal: false, // Set to true for horizontal bar chart
        columnWidth: '60%', // Adjust the width of the columns
      },
    };
  
    // Data Labels Configuration (optional)
    cmcChartDataLabels: ApexDataLabels = {
      enabled: true, // Show data labels
      formatter: (val: number) => `${val} units`, // Custom formatter for data labels
    };
    
// *****************************************************************
// ***********************BAR GRAPH END#****************************
// *****************************************************************

// *****************************************************************
// *********************COLOR GRAPH START***************************
// *****************************************************************
  whiteCardCount = 0;
  blueCardCount = 0;
  blackCardCount = 0;
  redCardCount = 0;
  greenCardCount = 0;
  colorlessCardCount = 0;

  colorChartLabels: string[] = ['White', 'Blue', 'Black', 'Red', 'Green', "Colorless"];
  colorChartColors: string[] = [
    '#FFCC00', // Yellow-ish // White is #FFFFFF
    '#0000FF', // Blue
    '#000000', // Black
    '#FF0000', // Red
    '#008000', // Green
    '#808080', // Gray
  ];

  colorChartData: ApexNonAxisChartSeries = [this.whiteCardCount, this.blueCardCount, this.blackCardCount, this.redCardCount, this.greenCardCount, this.colorlessCardCount];
  pieChartType: ApexChart = {
    type: 'pie',
  };
  colorChartTitle: ApexTitleSubtitle = {
    text: 'Color Breakdown Chart',
  };
// *****************************************************************
// **********************COLOR GRAPH END****************************
// *****************************************************************


// *****************************************************************
// *********************TYPE GRAPH START****************************
// *****************************************************************

  artifactCardCount = 0;
  creatureCardCount = 0;
  enchantmentCardCount = 0;
  landCardCount = 0;
  instantCardCount = 0;
  sorceryCardCount = 0;
  planeswalkerCardCount = 0;
  battleCardCount = 0;
  unknownCardCount = 0;

  cardTypeChartColors: string[] = [
    '#FFCC00',
    '#8B4513',
    '#4B0082',
    '#4682B4',
    '#FF69B4',
    '#9400D3',
    '#FFD700',
    '#FFA500',
    '#708090',
  ];

  cardTypesChartTitle: ApexTitleSubtitle = {
    text: 'Card Types Chart',
  };
  cardTypeData: ApexNonAxisChartSeries = [this.artifactCardCount, 
                                          this.creatureCardCount, 
                                          this.enchantmentCardCount, 
                                          this.landCardCount, 
                                          this.instantCardCount, 
                                          this.sorceryCardCount,
                                          this.planeswalkerCardCount,
                                          this.battleCardCount,
                                          this.unknownCardCount];

  cardTypeChartLabels: string[] = ['Artifact', 
                                  'Creature', 
                                  'Enchantment', 
                                  'Land', 
                                  'Instant', 
                                  'Sorcery',
                                  'Planeswalker',
                                  'Battle',
                                  'Unknown'];
// *****************************************************************
// ***********************TYPE GRAPH END****************************
// *****************************************************************
}