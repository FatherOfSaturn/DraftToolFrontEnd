import { Routes } from '@angular/router';
import { PyramidLandingComponent } from './pyramid-landing/pyramid-landing.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PyramidDraftComponent } from './pyramid-draft/pyramid-draft.component';
import { DeckBuilderComponent } from './deck-builder.component/deck-builder.component';
import { MulliganComponent } from './mulligan.component/mulligan.component';

const routeConfig: Routes = [
  {
    path: '',
    component: WelcomeComponent, // Set AppComponent as the root component
    title: 'Home page'
  },
  {
    path: 'pyramid',
    component: PyramidLandingComponent,
    title: 'Pyramid Landing Page'
  },
  {
    // path: 'pyramidDraft',
    path: 'pyramidDraft/:gameID/:playerName',
    component: PyramidDraftComponent,
    title: 'Pyramid Draft Started'
  },
  {
    path: 'waiting/:gameID/:playerName',
    // path: "waiting",
    component: WaitingRoomComponent,
    title: 'Waiting'
  },
  {
    // path: 'deckBuilder',
    path: 'deckBuilder/:gameID/:playerName',
    component: DeckBuilderComponent,
    title: 'Deck Builder'
  },
  {
    path: 'mulligan',
    component: MulliganComponent,
    title: 'Mulligan'
  }
];

export default routeConfig;
