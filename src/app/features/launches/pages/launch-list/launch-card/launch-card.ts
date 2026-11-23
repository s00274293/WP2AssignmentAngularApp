import { Component } from '@angular/core';
import { Launch } from '../../../models/launch.model';
import { input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-launch-card',
  imports: [RouterLink],
  templateUrl: './launch-card.html',
  styleUrl: './launch-card.css',
})
export class LaunchCard {
  launch = input.required<Launch>();

}
