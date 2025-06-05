"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/models/products/product";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState<Record<number, boolean>>({});
  
  // Cart store
  const addItem = useCartStore((state) => state.addItem);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [api]);
  
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    
    toast(`Producto ${product.name} se agregó al carrito`)
  };
  
  const toggleLike = (productId: number) => {
    setIsLiked((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.slice(0, 3).map((product, index) => (
            <CarouselItem key={product.id}>
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 min-h-[400px]">
                {/* Product Info */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {product.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {product.name}
                    </h1>
                    {product.description && (
                      <p className="text-lg text-muted-foreground">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating ?? 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} reseñas)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <Badge variant="destructive" className="text-sm">
                        Ahorra ${(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Agregar al carrito
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => toggleLike(product.id)}
                      className={cn(
                        isLiked[product.id] && "bg-red-50 border-red-200"
                      )}
                    >
                      <Heart className={cn(
                        "h-5 w-5",
                        isLiked[product.id] && "fill-red-500 text-red-500"
                      )} />
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Envío gratis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>30 días devolución</span>
                    </div>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square relative bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain p-8"
                      priority={index === 0}
                    />
                    
                    {/* Floating badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Nuevo
                        </Badge>
                      )}
                      {product.isOnSale && (
                        <Badge variant="destructive">
                          -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {products.slice(0, 3).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === current 
                  ? "bg-primary shadow-lg" 
                  : "bg-black/20 hover:bg-black/40"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}