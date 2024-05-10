import { GameInfo } from './../api/game-info';
import { Injectable } from '@angular/core';
import { Card } from '../api/card';
import { PlayerGameInfo } from '../api/player-info';
import { PlayerStart } from '../api/player-start';
import { Player } from '../api/player';

@Injectable({
  providedIn: 'root'
})
export class GameRegisterService {

  gameInfo: GameInfo | undefined;
  url = 'http://localhost:3000/createGame';
  pyramidBaseUrl = 'http://localhost:3000/pyramid';
  testGameCreateUrl = 'http://localhost:3000/players';

  constructor() { 
  }

  async createDummyGame(gameInfo: GameInfo) : Promise<Player[]> {
    const data = await fetch(`${this.testGameCreateUrl}`);
    return await data.json() ?? {};
  }

  async createGame(gameInfo: GameInfo) : Promise<Player[]> {
    const data = await fetch(`${this.url}`);
    return await data.json() ?? {};
  }

  async getRoundPyramidPacks(id: string) : Promise<PlayerGameInfo[]> {
    const data = await fetch(`${this.pyramidBaseUrl}/${id}/nextPackSet`);
    return await data.json() ?? {};
  }

  async draftCard(playerName: String, 
                  packNumber: number, 
                  cardID: string): Promise<Card> {
    const data = await fetch(`${this.pyramidBaseUrl}/${playerName}/draftCard/${packNumber}/${cardID}`);
    return await data.json() ?? {};
  }

  async triggerPackMergeAndSwap() : Promise<Player[]> {
    const data = await fetch(`${this.pyramidBaseUrl}/merge`);
    return await data.json() ?? {};
  }

  async getCurrentPlayers() : Promise<Player[]>{
    const data = await fetch(`${this.pyramidBaseUrl}/fetchPlayerData`);
    return await data.json() ?? {};
  }
}
