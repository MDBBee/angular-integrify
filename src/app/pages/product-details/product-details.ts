import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.type';
import { Store } from '../../services/store';
import { HlmH1, HlmP, HlmLarge } from '@spartan-ng/helm/typography';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-product-details',
  imports: [HlmH1, HlmP, HlmLarge, RouterLink, HlmButton],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  storeService = inject(Store);
  product = signal<Product>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');

      if (!productId) return;

      this.storeService.findOneProduct(productId).subscribe((product) => {
        this.product.set(product);
      });
    });
  }

  handleAddToCart(product: Product) {
    this.storeService.cart.update((prev) => [...prev, product]);
  }
}
