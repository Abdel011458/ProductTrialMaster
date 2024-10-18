import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]); // Observable pour les articles du panier
  cartItems$ = this.cartItemsSubject.asObservable(); // Flux observable que d'autres composants peuvent observer

  // Ajouter un produit au panier
  addToCart(product: Product) {
    const existingProduct = this.items.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next(this.items); // Mise à jour du BehaviorSubject avec les nouveaux articles
  }

// Supprimer un produit ou réduire sa quantité dans le panier
  removeFromCart(product: Product) {
    const existingProduct = this.items.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1; // Réduire la quantité
      } else {
        this.items = this.items.filter(item => item.id !== product.id); // Supprimer le produit s'il n'en reste plus
      }
    }
    this.cartItemsSubject.next(this.items); // Mettre à jour le BehaviorSubject après suppression ou réduction
  }

  // Récupérer tous les produits du panier
  getItems() {
    return this.items;
  }

  // Récupérer la quantité totale de produits dans le panier
  getItemCount() {
    return this.items.reduce((total, product) => total + product.quantity, 0);
  }
}
