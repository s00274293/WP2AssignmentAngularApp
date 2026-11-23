import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { LaunchService } from '../../services/launch.service';
import { Observable } from 'rxjs';
import { Launch } from '../../models/launch.model';
import { AsyncPipe } from '@angular/common';
import { LaunchCard } from './launch-card/launch-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-launch-list',
  imports: [AsyncPipe, LaunchCard, RouterLink, MatButtonModule],
  templateUrl: './launch-list.html',
  styleUrl: './launch-list.css',
})
export class LaunchList{
  private launchService = inject(LaunchService);

  state = toSignal(withLoadState(this.launchService.getLaunches()), { requireSync: true });
  readonly showFavorites = signal(false);
  readonly visibleLaunches = computed(() => {
    const state = this.state();
    if (state.status !== 'loaded') return [];

    return this.showFavorites()
      ? state.data.filter((launch) => launch.favorite)
      : state.data;
  });

}
