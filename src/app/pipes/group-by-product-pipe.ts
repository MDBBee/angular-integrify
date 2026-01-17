import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.type';

type GroupedProducts = { [key: string]: Product[] };

@Pipe({
  name: 'groupByProduct',
})
export class GroupByProductPipe implements PipeTransform {
  transform(products: Product[]): GroupedProducts {
    const grouped = products.reduce((acc, cur) => {
      if (!acc[cur.id]) {
        return { ...acc, [cur.id]: [cur] };
      }
      return { ...acc, [cur.id]: [...acc[cur.id], cur] };
    }, {} as GroupedProducts);

    return grouped;
  }
}
