"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/products/product";
import { ProductCard } from "./product-card";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function ProductCarousel({ 
  products, 
  title, 
  showViewAll,
  className,
  autoplay = false,
  autoplayDelay = 3000
}: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api || !autoplay) {
      return;
    }

    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, autoplayDelay);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api, autoplay, autoplayDelay]);

  return (
    <section className={className}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-1">
              Descubre nuestros productos más populares
            </p>
          </div>
          {showViewAll && (
            <Link href="/productos">
              <Button variant="outline">
                Ver todos ({products.length})
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem 
                key={product.id} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <ProductCard product={product} variant="featured" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation buttons */}
          <CarouselPrevious className="hidden md:flex -left-12 hover:bg-primary hover:text-primary-foreground transition-colors" />
          <CarouselNext className="hidden md:flex -right-12 hover:bg-primary hover:text-primary-foreground transition-colors" />
        </Carousel>

        {/* Progress indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-8 h-2 rounded-full transition-all duration-300",
                index === current - 1
                  ? "bg-primary" 
                  : "bg-muted hover:bg-primary/50"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden text-center mt-2">
          <p className="text-xs text-muted-foreground">
            Desliza para ver más productos
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
        <span>{current} de {count}</span>
        <span>•</span>
        <span>{products.length} productos destacados</span>
      </div>
    </section>
  );
}