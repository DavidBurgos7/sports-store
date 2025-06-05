"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/products/product";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = React.useState<any | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<any | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Acceder a la store del carrito
  const addItem = useCartStore((state) => state.addItem);

  // Resetear estado cuando el producto cambia
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Si no hay producto, no mostrar nada
  if (!product) return null;

  // Calcular el descuento si aplica
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Simular múltiples imágenes (normalmente vendrían del producto)
  const productImages = [
    product.imageUrl,
    product.imageUrl.replace("/400/400", "/400/399"), // Truco para simular diferentes imágenes
    product.imageUrl.replace("/400/400", "/399/400"),
  ];

  // Función para agregar al carrito
  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined);
    
    toast(`${product.name} se agregó al carrito`);

    // Opcional: cerrar el diálogo después de agregar
    setTimeout(() => onOpenChange(false), 1000);
  };

  // Navegar entre imágenes
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Incrementar y decrementar cantidad
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        {/* Título del diálogo (escondido visualmente pero accesible para lectores de pantalla) */}
        <div className="sr-only">
          <DialogTitle>Detalles del producto: {product.name}</DialogTitle>
        </div>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Galería de imágenes */}
          <div className="relative bg-gray-50 aspect-square">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
              )}
              {product.isOnSale && discountPercentage > 0 && (
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-blue-500 text-white hover:bg-blue-600">Destacado</Badge>
              )}
            </div>
            
            {/* Imagen principal */}
            <Image
              src={productImages[currentImageIndex]}
              alt={product.name}
              fill
              priority
              className="object-contain p-2"
            />
            
            {/* Controles de la galería */}
            {productImages.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* Indicadores de imagen */}
            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentImageIndex === index 
                        ? "bg-primary w-4" 
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="p-6 flex flex-col">
            <div className="mb-2">
              <div className="text-sm text-muted-foreground">
                {product.category} • {product.brand}
              </div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= Math.floor(product.rating ?? 0)
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
            </div>

            {/* Precio */}
            <div className="mt-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Descripción */}
            {product.description && (
              <p className="text-muted-foreground my-4">
                {product.description}
              </p>
            )}

            <Separator className="my-4" />

            {/* Selector de color */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Color:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        selectedColor === color
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      style={{ backgroundColor: color?.colorName?.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Seleccionado: {selectedColor?.colorName}
                  </p>
                )}
              </div>
            )}

            {/* Selector de talla */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Talla:</h3>
                <RadioGroup 
                  value={selectedSize || undefined} 
                  onValueChange={setSelectedSize as any}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((sizeObj) => (
                    <div key={sizeObj.id} className="flex items-center">
                      <RadioGroupItem 
                        value={sizeObj} 
                        id={`size-${sizeObj.size}`}
                        className="hidden"
                      />
                      <Label
                        htmlFor={`size-${sizeObj.size}`}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-md border bg-background text-sm",
                          "hover:border-primary cursor-pointer",
                          selectedSize?.size === sizeObj.size 
                            ? "border-primary bg-primary text-white font-medium" 
                            : "border-input"
                        )}
                      >
                        {sizeObj.size}
                      </Label>
                      
                    </div>
                  ))}
                </RadioGroup>
                {selectedSize && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Seleccionado: {selectedSize?.size}
                  </p>
                )}
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="flex items-center mb-6 mt-2">
              <h3 className="text-sm font-medium mr-4">Cantidad:</h3>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementQuantity}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 mt-auto">
              <Button 
                className="flex-1" 
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  isLiked && "bg-red-50 border-red-200 text-red-500"
                )}
              >
                <Heart className={cn(
                  "h-4 w-4",
                  isLiked && "fill-red-500"
                )} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}