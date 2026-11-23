import { Routes } from '@angular/router';
import { LaunchList } from './features/launches/pages/launch-list/launch-list';
import { LaunchDetails } from './features/launches/pages/launch-list/launch-details/launch-details';
import { LaunchForm } from './features/launches/pages/launch-list/launch-form/launch-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'launches',
    pathMatch: 'full'
  },
  {
    path: 'launches',
    component: LaunchList
  },
  {
    path: 'launches/new',
    component: LaunchForm
  },
  {
    path: 'launches/:id',
    component: LaunchDetails
  },
  {
    path: 'launches/:id/edit',
    component: LaunchForm
  },
];
