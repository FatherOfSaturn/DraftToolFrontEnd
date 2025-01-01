import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRegisterService } from '../game-register.service';
import { Player } from '../../api/player';
import { Card } from '../../api/card';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
    <b>Game ID: </b>{{ this.gameID }}<br />
    <b>Draft Partner's Name: </b>{{ this.partnerName }}, click <a [href]="partnerUrl" target="_blank">HERE</a> for a URL to give them. DO NOT PICK ANY CARDS FOR THEM >:(<br />
    <b>Number of Cards drafted: </b>{{ player!.cardsDrafted.length }}<br />
    <b>Super Picks Remaining: </b>{{ this.superPicksRemaining }} <br />
    Waiting for your Draft Partner to Finish. Look through your Drafted Cards while you wait!</p>
    <div class="grid-container">
      <div class="grid-item" *ngFor="let card of player!.cardsDrafted">
        <div class="image-container">
          <img [src]="card.details.image_normal" alt="Image" class="grid-image" (mouseover)="handleHover(card)" (mouseout)="handleOffHover(card)">
        </div>
      </div>
    </div>
  `,
  styleUrl: './waiting-room.component.scss'
})
export class WaitingRoomComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  gameID: string;
  playerName: string;
  player: Player | undefined;
  partnerName: string | undefined;
  superPicksRemaining: number | undefined;
  private intervalId: any;
  partnerUrl: string | undefined;
  
  constructor(private gameService: GameRegisterService, private router: Router) {
    this.gameID = this.route.snapshot.params['gameID'];
    this.playerName = this.route.snapshot.params['playerName'];
    this.startInterval();
    
    // DEV ENV CALLS
    // gameService.getFakeGameData().then(gameInfo => {
    //   this.playerName = "Josh";
    //   this.gameID = gameInfo.gameID;
    //   this.player = gameInfo?.players.find(player => player.playerName === this.playerName);
    //   this.partnerName = gameInfo?.players.find(player => !(player.playerName === this.playerName))?.playerName;
    //   this.superPicksRemaining = this.player?.doubleDraftPicksRemaining;
    // });
  
    gameService.getGameInfo(this.gameID).then(gameInfo => {
      // this.playerName = "Josh";
      // this.gameID = gameInfo.gameID;
      this.player = gameInfo?.players.find(player => player.playerName === this.playerName);
      this.partnerName = gameInfo?.players.find(player => !(player.playerName === this.playerName))?.playerName;
      this.superPicksRemaining = this.player?.doubleDraftPicksRemaining;
      this.partnerUrl = `${environment.hostname}/pyramidDraft/${this.gameID}/${this.partnerName}`;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.myMethod();
    }, 10000);
  }

  myMethod(): void {
    console.log('Checking Game State.');

    this.gameService.triggerPackMergeAndSwap(this.gameID).then(item => {

      console.log('Recieved Item: ' + item.toString);
      console.log("GameID: " + item.gameID);
      console.log("Was Game Merged: " + item.gameState);

      if (item.gameState === "GAME_MERGED") {
        clearInterval(this.intervalId);
        this.router.navigate(['/pyramidDraft', this.gameID, this.playerName]);
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