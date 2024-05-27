import { PlayerStart } from './../../api/player-start';
import { GameInfo } from './../../api/game-info';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../api/card'
import { FormsModule } from '@angular/forms';
import { GameRegisterService } from '../game-register.service';
import { v4 as uuidv4 } from 'uuid';
import { RouterModule } from '@angular/router';
import { GameCreationInfo } from '../../api/game-creation-info';

@Component({
    selector: 'app-pyramid',
    standalone: true,
    template: `
    <div>
      <input type="text" [(ngModel)]="cubeIdInput" placeholder="Enter cube id...">
      <input type="text" [(ngModel)]="player1Name" placeholder="Enter your name...">
      <input type="text" [(ngModel)]="player2Name" placeholder="Enter Player 2 name...">
      <input type="text" [(ngModel)]="draftTokens" placeholder="Enter Draft Token #...">
      
      <a [routerLink]="['/pyramid', this.gameID]">
        <button (click)="createGame()">Create Game</button>
      </a>
    </div>
    <div>
      
      <input type="text" [(ngModel)]="gameID" placeholder="Enter cube id...">
      <input type="text" [(ngModel)]="playerName" placeholder="Enter Player name...">
      <a [routerLink]="['/pyramid', this.gameID, this.playerName]">
        <button (click)="fetchGame()">Find Game</button>
      </a>
    </div>
    `,
    styleUrl: './pyramid.component.css',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class PyramidComponent {

  cardPackList: Card[] = [];
  selectedCard: Card | undefined;
  cubeIdInput: string = '';
  player1Name: string = '';
  player2Name: string = '';
  playerName: string = '';
  draftTokens: number = 0;
  gameID: string = '';
  retrievedPlayers: PlayerStart[] = [];
  testName: string = '';
  gameCreationInfo: GameCreationInfo | undefined;

  constructor(private gameService: GameRegisterService) {}
  
  submit() {
    console.log('Text input:', this.cubeIdInput);
    console.log('Text input:', this.player1Name);
    console.log('Text input:', this.player2Name);
    console.log('Text input:', this.draftTokens);
  }

  createGame() {
    const player1Id = uuidv4();
    const player2Id = uuidv4();
    const player1: PlayerStart = {playerID: player1Id, name: this.player1Name};
    const player2: PlayerStart = {playerID: player2Id, name: this.player2Name};
    
    const players: PlayerStart[] = [ player1, player2 ];
    this.gameID = uuidv4();
    
    this.gameCreationInfo = {gameId: this.gameID,
                             cubeID: this.cubeIdInput,
                             numberOfDoubleDraftPicksPerPlayer: this.draftTokens, 
                             players: players};
    
    this.gameService.gameCreationInfo = this.gameCreationInfo;

    // this.gameService.createGame(info).then(item => {
    //   this.retrievedPlayers = item;
    // });
  }

  fetchGame() {
    this.gameService.getGameInfo(this.gameID).then(lh =>{
      
    })
  }
}