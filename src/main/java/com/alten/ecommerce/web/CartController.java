package com.alten.ecommerce.web;

import com.alten.ecommerce.entities.Cart;
import com.alten.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/{user}")
    public Cart getCartByUser(@PathVariable String user) {
        return cartRepository.findAll()  // You would replace this with findByUser logic
                .stream()
                .filter(cart -> cart.getUser().equals(user))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        return cartRepository.save(cart);
    }

    @PutMapping("/{id}")
    public Cart updateCart(@PathVariable Long id, @RequestBody Cart updatedCart) {
        return cartRepository.findById(id)
                .map(cart -> {
                    cart.setProducts(updatedCart.getProducts());
                    cart.setTotalQuantity(updatedCart.getTotalQuantity());
                    cart.setTotalPrice(updatedCart.getTotalPrice());
                    return cartRepository.save(cart);
                }).orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}
