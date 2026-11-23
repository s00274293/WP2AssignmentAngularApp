import { Component, inject, input, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateLaunchDto } from '../../../models/launch.model';
import { LaunchService } from '../../../services/launch.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../../shared/validators/not-blank.validator';
import { forbiddenValue } from '../../../../../shared/validators/validatorFactory.validator';

@Component({
  selector: 'app-launch-form',
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    RouterLink
  ],
  templateUrl: './launch-form.html',
  styleUrl: './launch-form.css',
})
export class LaunchForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private launchService = inject(LaunchService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);
  readonly id = input<string>();

  launchForm = this.formBuilder.group({
    missionName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), notBlank, forbiddenValue("test")]],
    rocketName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), notBlank]],
    date: [''],
    notes: ['',[Validators.maxLength(100)]],
    favorite: [false],
  });

  ngOnInit(): void {
    const id = this.id();
    if (!id) return;

    this.launchService.getLaunchById(id).subscribe({
      next: (launch) =>
        this.launchForm.patchValue({
          missionName: launch.missionName,
          rocketName: launch.rocketName,
          date: launch.date
            ? new Date(launch.date).toISOString().slice(0, 10)
            : '',
          notes: launch.notes ?? '',
          favorite: launch.favorite ?? false,
        }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

  onSubmit(): void {
    const { missionName, rocketName, date, notes, favorite } =
      this.launchForm.getRawValue();

    const newLaunch: CreateLaunchDto = {
      missionName: missionName ?? '',
      rocketName: rocketName ?? '',
      date: date ? new Date(date) : undefined,
      favorite: favorite ?? false,
      notes: notes ?? undefined,
    };

    console.log('Submitted Launch:', newLaunch);

    this.saving.set(true);
    this.saveError.set(null);
    this.launchForm.disable();

    const id = this.id();

    const request = id
      ? this.launchService.updateLaunch(id, newLaunch)
      : this.launchService.addLaunch(newLaunch);


    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newLaunch.missionName} ${newLaunch.rocketName} saved`, 'Close', { duration: 10000 });
        console.log('Launch added successfully:', response);
        this.router.navigate(['/launches']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.launchForm.enable() 
      },
    });
  }
}