"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CameraOff, Loader2 } from "lucide-react";
import { ProductSearchResult } from "@/lib/models/products/product-search-results";
import { formatPrice } from "@/lib/utils";

const DEFAULT_PRODUCT_IMG_PLACEHOLDER: string = "/api/placeholder/400/400";

interface SearchResultsProps {
  results: ProductSearchResult[];
  query: string;
  isLoading: boolean;
  onClose: () => void;
}

export const SearchResults = ({
  results,
  query,
  isLoading,
  onClose,
}: SearchResultsProps) => {
  const router = useRouter();

  // Limitar resultados a 5 para el dropdown
  const limitedResults = results.slice(0, 5);
  const hasMoreResults = results.length > 5;

  const handleSeeAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md shadow-lg mt-2 p-4">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Buscando...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0 && query.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md shadow-lg mt-2 p-4">
        <p className="text-sm text-muted-foreground text-center py-4">
          No se encontraron resultados para &quot;{query}&quot;
        </p>
      </div>
    );
  }

  if (query.length === 0 || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-background border rounded-md shadow-lg mt-2">
      <div className="max-h-[70vh] overflow-auto">
        {limitedResults.map((product) => (
          <div
            key={product.id}
            className="flex items-center p-3 border-b last:border-b-0 hover:bg-accent cursor-pointer"
            onClick={() => handleProductClick(product.slug)}
          >
            <div className="flex-shrink-0 w-14 h-14 relative">
              

              { product.image === DEFAULT_PRODUCT_IMG_PLACEHOLDER ? (
                <div className="flex items-center justify-center h-full">
                  <CameraOff className="text-gray-500" size={150}/>
                </div>
              ) : (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className="object-contain"
                  onError={(e) => {
                    <CameraOff className="text-gray-500" size={150}/>
                  }}
                />
              )}
            </div>
            <div className="ml-3 flex-grow">
              <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
              <div className="flex items-center text-xs">
                <span className="text-primary font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through ml-2">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{product.brand} • {product.category}</p>
            </div>
          </div>
        ))}
      </div>
      
      {hasMoreResults && (
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className="w-full text-primary hover:text-primary hover:bg-primary/10"
            onClick={handleSeeAllResults}
          >
            Ver más resultados
          </Button>
        </div>
      )}
    </div>
  );
};