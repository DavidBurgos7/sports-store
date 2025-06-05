"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye, CameraOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/products/product";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";
import { ProductQuickView } from "./product-quick-view";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
}

const DEFAULT_PRODUCT_IMG_PLACEHOLDER: string = "/api/placeholder/400/400";

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);
  
  // Cart store
  const addItem = useCartStore((state) => state.addItem);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isFeatured = variant === "featured" || product.isFeatured;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, 1);
    
    toast(`Producto ${product.name} se agregó al carrito`)
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Card
        className={cn(
          "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full",
          isFeatured && "border border-gray-100"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className={cn(
            "relative bg-gray-50",
            isFeatured ? "aspect-[16/10]" : "aspect-square"
          )}>

            { product.imageUrl === DEFAULT_PRODUCT_IMG_PLACEHOLDER ? (
              <div className="flex items-center justify-center h-full">
                <CameraOff className="text-gray-500" size={150}/>
              </div>
            ) : (
              <Image
                src={product.imageUrl ?? DEFAULT_PRODUCT_IMG_PLACEHOLDER}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
                  Nuevo
                </Badge>
              )}
              {product.isOnSale && discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}%
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                  Destacado
                </Badge>
              )}
            </div>

            {/* Action buttons overlay */}
            <div className={cn(
              "absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-8 w-8 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-8 w-8 bg-white/90 hover:bg-white hover:cursor-pointer"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick add to cart - appears on hover */}
            <div className={cn(
              "absolute bottom-2 left-2 right-2 transition-all duration-200",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}>
              <Button className="w-full" size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <Link href={`/product/${product.slug}`}>
            {/* Category */}
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category} • {product.brand}
            </div>

            {/* Product Name */}
            <h3 className={cn(
              "font-medium line-clamp-2 hover:text-primary transition-colors",
              isFeatured ? "text-lg" : "text-sm"
            )}>
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 my-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-bold",
                isFeatured ? "text-lg" : "text-base"
              )}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Available Colors (if any) */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-muted-foreground">Colores:</span>
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color?.colorName?.toLowerCase() }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Available Sizes (if any) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">Tallas:</span>
                <span className="text-xs">
                  {product.sizes.slice(0, 3).map(sizeObj => sizeObj.size).join(", ")}
                  {product.sizes.length > 3 && ` +${product.sizes.length - 3}`}
                </span>
              </div>
            )}

            {/* Description for featured products */}
            {isFeatured && product.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {product.description}
              </p>
            )}
            </Link>
          </CardContent>
        </div>
      </Card>

      <ProductQuickView 
        product={product}
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
      />
    </>
  );
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  variant?: "default" | "featured";
}

export function ProductGrid({ products, title, showViewAll, variant = "default" }: ProductGridProps) {
  const isFeaturedGrid = variant === "featured";

  return (
    <section className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {showViewAll && (
            <Link href="/productos">
              <Button variant="outline">Ver todos</Button>
            </Link>
          )}
        </div>
      )}

      <div className={cn(
        "grid gap-4",
        isFeaturedGrid 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      )}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={isFeaturedGrid ? "featured" : "default"}
          />
        ))}
      </div>

      {/* Load more button for large grids */}
      {products.length >= 20 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Cargar más productos
          </Button>
        </div>
      )}
    </section>
  );
}