"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/models/products/product";
import { useStockStore } from "@/lib/store/stock-store";
import { HeroCarousel } from "@/components/products/hero-carousel";
import { ProductCarousel } from "@/components/products/product-carousel";
import { FilterBar } from "@/components/common/filter-bar";
import { ProductCard } from "@/components/products/product-card";
import { useState } from "react";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  // Get products from the stock store
  const { products, setProducts } = useStockStore();

  const featuredProducts: Product[] = products
      .filter(f => f.isFeatured || f.isNew || f.isOnSale) || [];

  const allProducts: Product[] = products || [];

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Aquí implementarías la lógica de filtrado
    console.log("Filtros actualizados:", newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <HeroCarousel products={featuredProducts} />

        <Separator className="my-12" />

        {/* Featured Products Section with Carousel */}
        <ProductCarousel
          products={featuredProducts}
          title="Productos Destacados"
          showViewAll={true}
          autoplay={true}
        />

        <Separator className="my-12" />

        {/* All Products Section with Filters */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Todos los Productos</h2>
            <div className="text-sm text-muted-foreground">
              {allProducts.length} productos encontrados
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-1">
              <FilterBar
                isVisible={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination or Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Cargar más productos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 rounded-lg bg-slate-50 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Recibe las últimas novedades, ofertas exclusivas y consejos deportivos
            directamente en tu correo electrónico.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="whitespace-nowrap">
              Suscribirse
            </Button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">SportStore</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about">Sobre nosotros</a></li>
                <li><a href="/stores">Nuestras tiendas</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Ayuda</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/shipping">Envíos</a></li>
                <li><a href="/returns">Devoluciones</a></li>
                <li><a href="/contact">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Políticas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy">Privacidad</a></li>
                <li><a href="/terms">Términos</a></li>
                <li><a href="/cookies">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Síguenos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            © 2025 SportStore. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}