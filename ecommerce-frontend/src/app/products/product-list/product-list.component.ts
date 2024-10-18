import { Component } from '@angular/core';
import { Product } from '../product.model';
import {CartService} from '../../services/cart.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, RouterModule, MatIcon],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Smartphone XYZ', description: 'Un smartphone dernier cri avec une caméra haute résolution et une batterie longue durée.', price: 299.99, quantity: 50, image: 'https://picsum.photos/200/300?random=1' },
    { id: 2, name: 'Ordinateur Portable ABC', description: 'Un ordinateur portable puissant avec processeur Intel Core i7, 16 Go de RAM et SSD 512 Go.', price: 899.99, quantity: 20, image: 'https://picsum.photos/200/300?random=2' },
    { id: 3, name: 'Casque Bluetooth Xtreme', description: 'Un casque Bluetooth avec suppression active du bruit pour une expérience sonore immersive.', price: 129.99, quantity: 75, image: 'https://picsum.photos/200/300?random=3' },
    { id: 4, name: 'Montre Connectée Pro', description: 'Une montre connectée avec suivi de la santé, GPS intégré et affichage AMOLED.', price: 199.99, quantity: 35, image: 'https://picsum.photos/200/300?random=4' },
    { id: 5, name: 'Tablette 10 pouces', description: 'Une tablette polyvalente avec écran de 10 pouces et support pour le stylet.', price: 249.99, quantity: 12, image: 'https://picsum.photos/200/300?random=5' },
    { id: 6, name: 'Enceinte Bluetooth Super Bass', description: 'Une enceinte Bluetooth portable avec un son puissant et des basses profondes.', price: 79.99, quantity: 40, image: 'https://picsum.photos/200/300?random=6' },
    { id: 7, name: 'Appareil Photo Numérique', description: 'Un appareil photo compact avec un zoom optique 10x et un capteur de 20 MP.', price: 549.99, quantity: 8, image: 'https://picsum.photos/200/300?random=7' },
    { id: 8, name: 'Imprimante Jet d\'Encre', description: 'Une imprimante jet d\'encre avec impression recto verso et connexion Wi-Fi.', price: 119.99, quantity: 15, image: 'https://picsum.photos/200/300?random=8' },
    { id: 9, name: 'Clavier Mécanique RGB', description: 'Un clavier mécanique avec rétroéclairage RGB personnalisable et touches programmables.', price: 99.99, quantity: 55, image: 'https://picsum.photos/200/300?random=9' },
    { id: 10, name: 'Souris Gaming', description: 'Une souris gaming ergonomique avec capteur haute précision et boutons personnalisables.', price: 59.99, quantity: 100, image: 'https://picsum.photos/200/300?random=10' },
    { id: 11, name: 'Tapis de Souris XXL', description: 'Un tapis de souris grand format avec surface lisse et base antidérapante.', price: 29.99, quantity: 200, image: 'https://picsum.photos/200/300?random=11' },
    { id: 12, name: 'Batterie Externe 20,000mAh', description: 'Une batterie externe avec deux ports USB et charge rapide.', price: 49.99, quantity: 60, image: 'https://picsum.photos/200/300?random=12' }
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // Filtrage
  searchTerm: string = '';
  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  addToCart(product: Product | undefined) {
    if (product) {
      this.cartService.addToCart(product);
      console.log(`${product.name} a été ajouté au panier`);
      this.snackBar.open(`${product.name} a été ajouté au panier.`, 'Fermer', { // Afficher le toast pour l'ajout
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['add-snackbar']
      });
    }
  }

  // Obtenir les produits pour la page actuelle
  get paginatedProducts(): Product[] {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Changer de page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Calculer le nombre total de pages
  get totalPages(): number {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return Math.ceil(filteredProducts.length / this.itemsPerPage);
  }

  // Supprimer du panier (appelle removeFromCart de CartService)
  removeFromCart(product: Product| undefined) {
    if (product) {
      this.cartService.removeFromCart(product);
      console.log(`${product.name} a été retiré du panier`);
      this.snackBar.open(`${product.name} a été retiré du panier.`, 'Fermer', { // Afficher le toast pour le retrait
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['remove-snackbar']
      });
    }
  }
}
