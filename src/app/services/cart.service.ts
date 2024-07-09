import { Injectable } from '@angular/core';
import { Pharm } from '../shared/models/Pharm';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(pharm: Pharm) {
    if(this.getItems() === null || this.getItems() === undefined){
      localStorage.setItem('cart', JSON.stringify([pharm]));
    }
    else{
      let cartList = this.getItems();
      cartList.push(pharm);
      localStorage.setItem('cart', JSON.stringify(cartList));
    }
  }

  getItems() {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  clearCart() {
    localStorage.removeItem('cart');
  }
}
