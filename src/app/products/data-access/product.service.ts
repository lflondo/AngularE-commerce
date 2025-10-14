import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/shared/data-access/base-http.service';
import { Product } from 'src/app/shared/interfaces/product.interface';

const LIMIT = 4;

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseHttpService {
  getProducts(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiFsUrl}/products`, {
      params: {
        limit: page * LIMIT,
      },
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiFsUrl}/products/${id}`);
  }
}
