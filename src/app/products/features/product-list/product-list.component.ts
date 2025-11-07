import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from 'src/app/shared/data-access/cart-state.service';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list.component',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export default class ProductListComponent {
  productsState = inject(ProductStateService);
  cartState = inject(CartStateService).state;

  changePageNext() {
    const page = this.productsState.state.page() + 1;
    this.productsState.changePageNext$.next(page);
  }

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1,
    });
  }
}
