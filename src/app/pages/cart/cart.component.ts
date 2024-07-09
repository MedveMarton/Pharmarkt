import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Pharm } from 'src/app/shared/models/Pharm';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  items : Array<Pharm> = [];

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  onSubmit(): void {
    this.cartService.clearCart();
    window.alert("Thank you for shopping with us!");
    this.items = this.cartService.getItems();
  }

  onCancel(): void {
    this.cartService.clearCart();
    window.alert("Cart cleared!");
    this.items = this.cartService.getItems();
  }

}
