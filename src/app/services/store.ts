import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.type';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Store {
  http = inject(HttpClient);
  products = signal<Product[]>([]);
  cart = signal<Product[]>([]);

  URL = 'https://fakestoreapi.com/products';

  findAllProducts() {
    return this.http.get<Product[]>(this.URL).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }),
    );
  }
}
