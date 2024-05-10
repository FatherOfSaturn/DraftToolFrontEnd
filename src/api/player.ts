import { Card } from "./card";
import { CardPack } from "./card-pack";

export interface Player {
    playerName: string;
    cardPacks: CardPack[];
    cardsDrafted: Card[];
    doubleDraftPicksRemaining: number;
}