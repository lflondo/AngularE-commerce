import { inject, Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './product.service';
import { map, Observable, switchMap } from 'rxjs';

interface State {
  product: Product | null;
  status: 'loading' | 'error' | 'success';
}

@Injectable({ providedIn: 'root' })
export class ProductDetailStateService {
  private productsService = inject(ProductService);
  private initialState: State = {
    product: null,
    status: 'loading',
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.productsService.getProduct(id)),
          map((data) => ({ product: data, status: 'success' as const })),
        ),
    },
  });
}
