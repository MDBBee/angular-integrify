import { Component } from '@angular/core';
import { Products } from '../../components/products/products';

@Component({
  selector: 'app-home',
  imports: [Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
