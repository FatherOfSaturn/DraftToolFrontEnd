import { PlayerStart } from '../../api/player-start';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from '../../api/card'
import { FormsModule } from '@angular/forms';
import { GameRegisterService } from '../game-register.service';
import { v4 as uuidv4 } from 'uuid';
import { RouterModule } from '@angular/router';
import { GameCreationInfo } from '../../api/game-creation-info';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-pyramid',
    standalone: true,
    template: `

    <div>
      <h3 class="description">The Pyramid Draft aims to spread the decisions evenly throughout the draft process by offering smaller packs at first, and larger packs later. 
        In the beginning, you are open and need to consider all cards in a pack as options. 
        Towards the end, you have already committed to colors and archetypes, and need to consider fewer cards as options.
        Check out the Creator's wordpress 
        <a href="https://desolatelighthouse.wordpress.com/2020/12/21/pyramid-draft/" target="_blank" rel="noopener noreferrer">site!</a>
        None of this would exist without them.
      </h3>
      <div class="new-draft-fields">
        <h1 class="pyramid-text">Enter the following info to <span class="highlighted-word">start a new</span> draft.</h1>
        <mat-form-field>
          <mat-label>Enter cubecobra cube id...</mat-label>
          <input matInput [(ngModel)]="cubeIdInput">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Enter your name...</mat-label>
          <input matInput [(ngModel)]="player1Name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Enter Player 2 name...</mat-label>
          <input matInput [(ngModel)]="player2Name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Enter Super Pick # ...</mat-label>
          <input matInput type="number" [(ngModel)]="draftTokens">
        </mat-form-field>
        <button mat-flat-button class= "create-game-button" (click)="createGame()">Create Game</button>
      </div>
      <div class="join-draft-fields">
        <h1 class="pyramid-text">Or, enter the following info to <span class="highlighted-word">join</span> a draft.</h1>
        <mat-form-field>
          <mat-label>Enter game id...</mat-label>
          <input matInput [(ngModel)]="gameID">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Enter Player name...</mat-label>
          <input matInput [(ngModel)]="playerName">
        </mat-form-field>
        <a [routerLink]="['/pyramid', this.gameID, this.playerName]">
        <button mat-flat-button (click)="fetchGame()">Find Game</button>
        </a>
      </div>
      <div>
        <p>
          Future asked for features:
        </p>
        <ul>
          <li *ngFor="let item of featureList">{{ item }}</li>
        </ul>
      </div>
    </div>
<!-- 
    <span>
      Want to learn more about how Pyramid Drafting works? Check out this wordpress site
      <a href="https://desolatelighthouse.wordpress.com/2020/12/21/pyramid-draft/"> here</a>.
      <br>Search for Cubes 
      <a href="https://cubecobra.com/dashboard">here</a>
      <br><br>
      Or, here are some personal cubes to check out!
      <br>
      Horror of Innistrad: Check the cube 
      <a href="https://cubecobra.com/cube/list/e77c5054-861d-4689-af1a-732736ef789b">here</a>
      , or, Draft this cube: 
      <button (click)="makeGame('e77c5054-861d-4689-af1a-732736ef789b')">here.</button>
      <br>
      WaWa's Vintage+Power Cube: Check the cube 
      <a href="https://cubecobra.com/cube/overview/WaWa">here</a>
      , or, Draft this cube: 
      <button (click)="makeGame('WaWa')">here.</button>
      <br>
    </span> -->
    `,
    styleUrl: './pyramid-landing.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule, 
        MatInputModule
    ]
})
export class PyramidLandingComponent {

  featureList = ["Feature 1", "Feature 2", "Feature 3", "Feature 4"];

  route: ActivatedRoute = inject(ActivatedRoute);
  cardPackList: Card[] = [];
  selectedCard: Card | undefined;
  cubeIdInput: string = '';
  player1Name: string = '';
  player1Id: string = '';
  player2Name: string = '';
  player2Id: string = '';
  playerName: string = '';
  draftTokens: number | null = null;
  gameID: string = '';
  retrievedPlayers: PlayerStart[] = [];
  testName: string = '';
  gameCreationInfo: GameCreationInfo | undefined;

  constructor(private gameService: GameRegisterService, private router: Router) { }
  
  submit() {
    console.log('Text input:', this.cubeIdInput);
    console.log('Text input:', this.player1Name);
    console.log('Text input:', this.player2Name);
    console.log('Text input:', this.draftTokens);
  }

  createGame() {
    this.player1Id = uuidv4();
    this.player2Id = uuidv4();
    const player1: PlayerStart = {playerID: this.player1Id, name: this.player1Name};
    const player2: PlayerStart = {playerID: this.player2Id, name: this.player2Name};
    
    const players: PlayerStart[] = [ player1, player2 ];
    this.gameID = uuidv4();

    if (this.draftTokens === null) {
      this.draftTokens = 0;
    }
    
    this.gameCreationInfo = {gameID: this.gameID,
                             cubeID: this.cubeIdInput,
                             numberOfDoubleDraftPicksPerPlayer: this.draftTokens, 
                             players: players};

    this.gameService.createGame(this.gameCreationInfo).then(item => {
      console.log("Created Game: ", item.gameID);
      this.router.navigate(['/pyramidDraft', this.gameID, this.player1Name]);
    });
  }

  fetchGame() {
    this.gameService.getGameInfo(this.gameID).then(lh => {
      console.log("pyramid Found Game: ", lh.gameID);
      console.log("pyramid PlayerName: " + this.playerName);
    })
  }

  makeGame(cubeID: string) {

    this.player1Name = "Player-1";
    this.player2Name = "Player-2";

    this.cubeIdInput = cubeID;
    this.draftTokens = 5;

    this.createGame();
  }
}