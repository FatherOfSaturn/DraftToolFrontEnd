import { Routes } from '@angular/router';
import { PyramidComponent } from './pyramid/pyramid.component';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';

const routeConfig: Routes = [
  {
    path: '',
    component: PyramidComponent,
    title: 'Home page'
  },
  {
    path: 'pyramid/:gameID/:playerName',
    component: GridComponent,
    title: 'Pyramid Draft In Progress'
  }
  // {
  //   path: 'waiting/:gameId/:playerID',
  //   component: WaitingRoomComponent,
  //   title: 'Waiting'
  // }
];

export default routeConfig;
