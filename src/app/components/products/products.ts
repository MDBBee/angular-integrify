import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '../../services/store';
import { Product } from '../../models/product.type';
import {
  HlmCard,
  HlmCardHeader,
  HlmCardTitle,
  HlmCardContent,
  HlmCardFooter,
} from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { GroupByProductPipe } from '../../pipes/group-by-product-pipe';
import { KeyValuePipe } from '@angular/common';
import {
  hlmBlockquote,
  hlmH1,
  hlmH2,
  hlmH3,
  hlmLead,
  hlmP,
  hlmUl,
  HlmMuted,
  HlmLarge,
} from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-products',
  imports: [
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardContent,
    HlmCardFooter,
    HlmButton,
    GroupByProductPipe,
    KeyValuePipe,
    HlmMuted,
    HlmLarge,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  storeService = inject(Store);
  products = computed<Product[]>(() => this.storeService.products());

  ngOnInit(): void {
    this.storeService.findAllProducts().subscribe((products) => {
      this.storeService.products.set(products);
    });
  }

  handleAddToCart(product: Product) {
    this.storeService.cart.update((cur) => [...cur, product]);
  }
}
