package com.shopease.config;

import com.shopease.model.Product;
import com.shopease.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        List<Product> catalog = List.of(
            new Product(null, "Wireless Headphones", "Adaptive noise cancellation, 40-hour battery, and soft memory-foam earcups for focused listening.", 2499.00, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85", 50),
            new Product(null, "Smart Watch", "A bright health dashboard with sleep tracking, daily movement goals, and a week of battery life.", 3999.00, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85", 30),
            new Product(null, "Laptop Backpack", "A water-resistant 15.6-inch commuter bag with a padded laptop sleeve and easy-access pockets.", 1299.00, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85", 100),
            new Product(null, "USB-C Hub", "Seven useful ports in one compact aluminium hub, including HDMI, USB 3.0, and fast pass-through charging.", 1899.00, "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=700&q=85", 75),
            new Product(null, "Mechanical Keyboard", "Tactile mechanical switches, warm RGB lighting, and a solid low-profile frame for better desk rhythm.", 3499.00, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=85", 40),
            new Product(null, "Ergonomic Mouse", "A quiet wireless mouse shaped for long sessions, with precise tracking and a rechargeable battery.", 1599.00, "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=85", 65),
            new Product(null, "Portable Speaker", "A compact speaker with balanced room-filling sound, splash resistance, and an easy carry loop.", 2299.00, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85", 24),
            new Product(null, "4K Webcam", "Sharp video, natural colour, and a wide field of view for clearer calls and polished streams.", 4299.00, "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=700&q=85", 18),
            new Product(null, "Desk Lamp", "Warm adjustable light with a clean silhouette, designed to make late work gentler on the eyes.", 1799.00, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85", 42),
            new Product(null, "Charging Stand", "A tidy, weighted dock that keeps your phone, watch, and earbuds ready in one place.", 2799.00, "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=85", 27),
            new Product(null, "Monitor Stand", "A solid wood riser that lifts your screen to a comfortable eye line and clears space below.", 2199.00, "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=700&q=85", 35),
            new Product(null, "Cable Organizer", "A neat magnetic tray for keeping charging cables visible, separated, and ready to reach.", 699.00, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85", 80),
            new Product(null, "Tablet Sleeve", "A soft felt sleeve with a secure zip and shock-absorbing lining for daily commutes.", 999.00, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=85", 55),
            new Product(null, "Fitness Tracker", "Lightweight activity tracking with heart-rate monitoring, guided breathing, and smart alerts.", 2499.00, "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=700&q=85", 22),
            new Product(null, "Travel Adapter", "A universal travel adapter with USB-C fast charging for work trips and weekend escapes.", 1499.00, "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85", 46)
        );

        catalog.forEach(product -> {
            Product savedProduct = productRepository.findByName(product.getName());
            if (savedProduct == null) {
                productRepository.save(product);
            } else {
                savedProduct.setDescription(product.getDescription());
                savedProduct.setPrice(product.getPrice());
                savedProduct.setImageUrl(product.getImageUrl());
                savedProduct.setStock(product.getStock());
                productRepository.save(savedProduct);
            }
        });
    }
}