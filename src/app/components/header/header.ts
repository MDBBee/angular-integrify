import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '../../../../libs/ui/icon/src/';
import { Component, computed, inject } from '@angular/core';
import { BrnDialogClose, BrnDialogContent, BrnDialogTrigger } from '@spartan-ng/brain/dialog';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogDescription,
  HlmDialogHeader,
  HlmDialogTitle,
} from '../../../../libs/ui/dialog/src/';

import { HlmButton } from '../../../../libs/ui/button/src';
import { HlmH3, HlmLarge, HlmMuted, HlmP } from '../../../../libs/ui/typography/src';
import { Store } from '../../services/store';
import { GroupByProductPipe } from '../../pipes/group-by-product-pipe';
import { KeyValuePipe } from '@angular/common';
import { Product } from '../../models/product.type';
import { SumPricePipe } from '../../pipes/sum-price-pipe';
import { lucideShoppingCart } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  imports: [
    NgIcon,
    HlmIcon,

    BrnDialogClose,
    BrnDialogContent,
    BrnDialogTrigger,

    HlmDialog,
    HlmDialogContent,
    HlmDialogHeader,
    HlmDialogTitle,
    HlmDialogDescription,

    HlmButton,
    HlmH3,
    HlmP,
    HlmMuted,
    HlmLarge,

    GroupByProductPipe,
    KeyValuePipe,
    SumPricePipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [provideIcons({ lucideShoppingCart })],
})
export class Header {
  storeService = inject(Store);
  cart = computed(() => this.storeService.cart());

  handleAddToCart(product: Product) {
    this.storeService.cart.update((cur) => [...cur, product]);
  }

  handleRemoveFromCart(productId: number) {
    this.storeService.cart.update((cur) => {
      return cur.filter((_, index) => {
        return index !== cur.findIndex((item) => item.id === productId);
      });
    });
  }
}
