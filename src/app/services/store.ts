import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product, ProductCreate } from '../models/product.type';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Store {
  http = inject(HttpClient);
  products = signal<Product[]>([]);
  cart = signal<Product[]>([]);
  categories = computed<string[]>(() => {
    if (this.products().length > 0) {
      const categories = this.products().map((prod) => prod.category);
      return [...new Set(categories)];
    }
    return [];
  });

  URL = 'https://fakestoreapi.com/products';

  findAllProducts() {
    return this.http.get<Product[]>(this.URL).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
    );
  }

  findOneProduct(id: string) {
    return this.http.get<Product>(this.URL + `/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
    );
  }

  createOneProduct(product: ProductCreate) {
    return this.http.post<Product>(this.URL, product).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
    );
  }
}
