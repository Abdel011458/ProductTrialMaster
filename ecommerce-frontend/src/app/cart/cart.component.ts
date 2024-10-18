import {Component, OnInit} from '@angular/core';
import {Product} from '../products/product.model';
import {CartService} from '../services/cart.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [
    trigger('cartItemAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.updateTotal();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.items = this.cartService.getItems(); // Mise à jour après suppression
    this.updateTotal();
  }

  updateQuantity(product: Product) {
    if (product.quantity < 1) {
      product.quantity = 1; // Prévenir les quantités invalides
    }
    this.updateTotal(); // Recalculer le total à chaque mise à jour de quantité
  }

  updateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
