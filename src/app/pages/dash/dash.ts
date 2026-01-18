import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '../../services/store';
import { Product } from '../../models/product.type';
import { TitleCasePipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar, lucideStarHalf } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmCode } from '@spartan-ng/helm/typography';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogHeader,
  HlmDialogDescription,
  HlmDialogTitle,
} from '@spartan-ng/helm/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { BrnDialogTrigger, BrnDialogContent, BrnDialogClose } from '@spartan-ng/brain/dialog';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-dash',
  imports: [
    TitleCasePipe,
    HlmIcon,
    NgIcon,
    NgClass,
    HlmCode,
    HlmDialog,
    HlmButton,
    BrnDialogTrigger,
    HlmDialogContent,
    BrnDialogContent,
    HlmDialogHeader,
    HlmDialogDescription,
    ProductForm,
    HlmDialogTitle,
    BrnDialogClose,
  ],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
  providers: [provideIcons({ lucideStar, lucideStarHalf })],
})
export class Dash implements OnInit {
  storeService = inject(Store);
  products = computed<Product[]>(() => this.storeService.products());

  constructor() {
    console.log(this.products());
  }

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
