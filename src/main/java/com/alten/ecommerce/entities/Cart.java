package com.alten.ecommerce.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user;  // You could store user ID, session ID, or email

    @ManyToMany
    private List<Product> products;

    private int totalQuantity;
    private double totalPrice;

    // Other fields like createdAt, updatedAt if needed
}

