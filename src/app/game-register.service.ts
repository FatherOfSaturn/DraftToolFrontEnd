import { GameInfo } from './../api/game-info';
import { Injectable } from '@angular/core';
import { Card } from '../api/card';
import { PlayerGameInfo } from '../api/player-info';
import { PlayerStart } from '../api/player-start';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Player } from '../api/player';
import { GameCreationInfo } from '../api/game-creation-info';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameRegisterService {

  gameInfo: GameInfo | undefined;
  gameCreationInfo: GameCreationInfo | undefined;
  url = 'http://localhost:3000/createGame';
  pyramidBaseUrl = 'http://localhost:3000/pyramid';
  testGameCreateUrl = 'http://localhost:3000/players';
  gameResourceUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { 
  }

  async createDummyGame(gameInfo: GameInfo) : Promise<Player[]> {
    const data = await fetch(`${this.testGameCreateUrl}`);
    return await data.json() ?? {};
  }

  async createGame(gameCreationInfo: GameCreationInfo) : Promise<GameInfo> {
    return await lastValueFrom(
      this.http.post<GameInfo>(`${this.url}/game`, gameCreationInfo)
    );
  }

  async draftCard(gameID: string,
                  playerID: string,
                  packNumber: number,
                  cardID: string,
                  doublePick: boolean) : Promise<Card> {
    
    let queryParam = new HttpParams();
    queryParam.append("doublePick", doublePick);

    return await lastValueFrom(
      this.http.post<Card>(`${this.url}/game/${gameID}/${playerID}/draftCard/${packNumber}/${cardID}`, null, {params: queryParam})
    );
  }

  async getGameInfo(gameID: string) : Promise<GameInfo> {
    const data = await fetch(`${this.url}/fetchGameData/${gameID}`);
    return await data.json() ?? {};
  }

  async triggerPackMergeAndSwap(gameID: string) : Promise<GameInfo> {
    const data = await fetch(`${this.url}/merge/${gameID}`);
    return await data.json() ?? {};
  }
}
