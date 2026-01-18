import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './components/products/products';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-integrify');
}
