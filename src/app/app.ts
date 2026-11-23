import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaunchList } from './features/launches/pages/launch-list/launch-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LaunchList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WP2AssignmentAngularApp');
}
