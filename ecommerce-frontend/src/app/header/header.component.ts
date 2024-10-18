import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {MatIcon} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Souscrire aux changements du panier
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;  // Mettre à jour dynamiquement le nombre d'articles
    });
  }
}
