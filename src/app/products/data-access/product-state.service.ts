import { inject, Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './product.service';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

interface State {
  products: Product[];
  status: 'loading' | 'error' | 'success';
  page: number;
}

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private productsService = inject(ProductService);
  private initialState: State = {
    products: [],
    status: 'loading',
    page: 1,
  };

  changePageNext$ = new Subject<number>();

  loadProducts$ = this.changePageNext$.pipe(
    startWith(this.initialState.page),
    switchMap((page) => this.productsService.getProducts(page)),
    map((products) => ({ products, status: 'success' as const })),
    catchError(() => {
      return of({ products: [], status: 'error' as const });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePageNext$.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProducts$,
    ],
  });
}
