import { Routes } from '@angular/router';
import { PyramidComponent } from './pyramid/pyramid.component';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';

const routeConfig: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'Home page'
  },
  {
    path: 'pyramid',
    component: PyramidComponent,
    title: 'Pyramid Draft'
  },
  {
    path: 'pyramid/:gameId',
    component: GridComponent,
    title: 'Pyramid Draft In Progress'
  }
];

export default routeConfig;
