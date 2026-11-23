import { Component, inject, input, signal } from '@angular/core';
import { Launch } from '../../../models/launch.model';
import { LaunchService } from '../../../services/launch.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadState, withLoadState } from '../../../../../shared/load-state';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-launch-details',
  imports: [RouterLink],
  templateUrl: './launch-details.html',
  styleUrl: './launch-details.css',
})
export class LaunchDetails {

  private launchService = inject(LaunchService);
  private readonly router = inject(Router);
  readonly deleting = signal(false);
  
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();
  readonly launch = signal<Launch | null>(null);
  readonly initial: LoadState<Launch> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.launchService.getLaunchById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteLaunch(launch: Launch): void {
  if (!confirm(`Delete ${launch.missionName} ${launch.rocketName}?`)) return;
  this.deleting.set(true);
  this.deleteError.set(null);



  this.launchService.deleteLaunch(launch._id).subscribe({
    next: () => this.router.navigate(['/launches']),
    error: (err: Error) => {
      this.deleteError.set(err.message);
      this.deleting.set(false);
    },

  });
}

}