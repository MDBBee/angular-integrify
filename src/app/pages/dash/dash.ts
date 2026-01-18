import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '../../services/store';
import { Product } from '../../models/product.type';
import { TitleCasePipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar, lucideStarHalf } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-dash',
  imports: [TitleCasePipe, HlmIcon, NgIcon, NgClass],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
  providers: [provideIcons({ lucideStar, lucideStarHalf })],
})
export class Dash implements OnInit {
  storeService = inject(Store);
  products = computed<Product[]>(() => this.storeService.products());

  ngOnInit(): void {
    this.storeService.findAllProducts().subscribe((products) => {
      this.storeService.products.set(products);
    });
  }

  getStars(rate: number) {
    const stars = [];
    const fullStars = Math.floor(rate);
    const fractional = rate - fullStars;

    const hasHalfStar = fractional >= 0.1;

    for (let i = 0; i < fullStars; i++) {
      stars.push('lucideStar');
    }
    if (hasHalfStar) stars.push('lucideStarHalf');

    return stars;
  }
}
