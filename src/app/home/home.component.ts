import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.health().subscribe({
      next: (value) => value,
    });
  }
}
