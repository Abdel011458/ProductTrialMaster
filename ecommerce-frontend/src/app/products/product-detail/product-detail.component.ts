import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/product.model';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  imports: [CommonModule],
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (data: Product) => {
          this.product = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération du produit', error);
        }
      );
    }
  }

  addToCart(product: Product | undefined): void {
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
