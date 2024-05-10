import { PlayerStart } from './player-start';

export interface GameInfo {
    gameId: string;
    name: string;
    numberOfDoubleDraftPicksPerPlayer: number;
    players: PlayerStart[];
}