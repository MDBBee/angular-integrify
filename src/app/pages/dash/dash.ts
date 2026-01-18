import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '../../services/store';
import { Product } from '../../models/product.type';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-dash',
  imports: [TitleCasePipe, HlmIcon, NgIcon],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
  providers: [provideIcons({ lucideStar })],
})
export class Dash implements OnInit {
  storeService = inject(Store);
  products = computed<Product[]>(() => this.storeService.products());

  ngOnInit(): void {
    this.storeService.findAllProducts().subscribe((products) => {
      this.storeService.products.set(products);
    });
  }
}
