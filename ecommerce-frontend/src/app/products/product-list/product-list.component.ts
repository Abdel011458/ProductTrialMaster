import {Component, OnInit} from '@angular/core';
import { Product } from '../product.model';
import {CartService} from '../../services/cart.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ProductService} from '../../services/product.service';
import {HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, RouterModule, MatIcon, HttpClientModule  ],
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
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 8; // Afficher 8 produits par page

  // Filtrage
  searchTerm: string = '';
  totalPages: number = 1; // Total des pages
  constructor(private cartService: CartService, private snackBar: MatSnackBar, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.updateTotalPages(); // Mettre à jour le nombre total de pages
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }

  // Méthode pour mettre à jour le nombre total de pages
  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }
  addToCart(product: Product | undefined) {
    if (product) {
      this.cartService.addToCart(product);
      console.log(`${product.name} a été ajouté au panier`);
      this.snackBar.open(`${product.name} a été ajouté au panier.`, 'Fermer', { // Afficher le toast pour l'ajout
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['add-snackbar']
      });
    }
  }

  // Filtrer et paginer les produits
  get paginatedProducts(): Product[] {
    const filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredProducts.length / this.itemsPerPage); // Mettre à jour le nombre total de pages après filtrage
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }


  // Changer de page
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Calculer le nombre total de pages
  // get totalPages(): number {
  //   const filteredProducts = this.products.filter(product =>
  //     product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  //   return Math.ceil(filteredProducts.length / this.itemsPerPage);
  // }

  // Supprimer du panier (appelle removeFromCart de CartService)
  removeFromCart(product: Product| undefined) {
    if (product) {
      this.cartService.removeFromCart(product);
      console.log(`${product.name} a été retiré du panier`);
      this.snackBar.open(`${product.name} a été retiré du panier.`, 'Fermer', { // Afficher le toast pour le retrait
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['remove-snackbar']
      });
    }
  }

}
