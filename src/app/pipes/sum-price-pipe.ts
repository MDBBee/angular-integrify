import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.type';

@Pipe({
  name: 'sumPrice',
})
export class SumPricePipe implements PipeTransform {
  transform(products: Product[]): number {
    return products.reduce((acc, cur) => acc + cur.price, 0);
  }
}
