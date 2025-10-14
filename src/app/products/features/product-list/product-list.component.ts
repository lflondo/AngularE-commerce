import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

@Component({
  selector: 'app-product-list.component',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export default class ProductListComponent {
  productsState = inject(ProductStateService);

  changePageNext() {
    const page = this.productsState.state.page() + 1;
    this.productsState.changePageNext$.next(page);
  }
}
