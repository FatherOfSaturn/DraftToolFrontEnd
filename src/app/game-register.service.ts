import { GameInfo } from './../api/game-info';
import { Injectable } from '@angular/core';
import { Card } from '../api/card';
import { Player } from '../api/player';
import { GameCreationInfo } from '../api/game-creation-info';
import { GameStatusMessage } from '../api/game-status-message';
import { AppConfigService } from './app-config.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameRegisterService {

  gameInfo: GameInfo | undefined;
  gameCreationInfo: GameCreationInfo | undefined;

  // For Dev
  // url = 'http://localhost:4200/api';
  url = 'FALED TO OVERRIDE';

  // For AWS
  // url = 'http://pyramiddraft.xyz:8080';

  // url = window.location.hostname;

  constructor(private appConfigService: AppConfigService) { 
    // this.url = this.appConfigService.apiBaseUrl;
  }

  getEnvironmentUrl() {
    this.url = (`${environment.apiUrl}`);
  }

  async createGame(gameCreationInfo: GameCreationInfo) : Promise<GameInfo> {
    const response = await fetch(`${this.url}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameCreationInfo)
    });
    return await response.json() ?? {};
  }

  async draftCard(gameID: string,
                  playerID: string,
                  packNumber: number,
                  cardID: string,
                  doublePick: boolean) : Promise<Card> {

    const url = new URL(`${this.url}/game/${gameID}/${playerID}/draftCard/${packNumber}/${cardID}`);
    url.searchParams.append("doublePick", doublePick.toString());

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return await response.json() ?? {};
  }

  async getGameInfo(gameID: string) : Promise<GameInfo> {
    const data = await fetch(`${this.url}/game/fetchGameData/${gameID}`);
    return await data.json() ?? {};
  }

  async triggerPackMergeAndSwap(gameID: string) : Promise<GameStatusMessage> {
    const data = await fetch(`${this.url}/game/merge/${gameID}`);
    return await data.json() ?? {};
  }

  async triggerGameEnd(gameID: string) : Promise<GameStatusMessage> {
    const data = await fetch(`${this.url}/game/end/${gameID}`);
    return await data.json() ?? {};
  }
}