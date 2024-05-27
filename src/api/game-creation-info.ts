import { PlayerStart } from './player-start';

export interface GameCreationInfo {
    gameId: string;
    cubeID: string;
    numberOfDoubleDraftPicksPerPlayer: number;
    players: PlayerStart[];
}