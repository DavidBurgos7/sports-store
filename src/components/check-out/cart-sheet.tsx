"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  X 
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";
import { CheckoutDialog } from "./checkout-dialog";

export function CartSheet() {
  const {
    items,
    isOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    getItemsCount,
    getTotalPrice,
    getUniqueItemsCount,
  } = useCartStore();

  // Estado para controlar el diálogo de checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const itemsCount = getItemsCount();
  const totalPrice = getTotalPrice();
  const uniqueItemsCount = getUniqueItemsCount();

  const handleCheckout = () => {

    //TODO: Check if user is logged in

    console.log("Proceder al checkout");
    // Cerrar el carrito
    setCartOpen(false);
    // Abrir el diálogo de checkout
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg px-5">
          <SheetHeader className="space-y-2.5 pr-6">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrito de Compras
              {itemsCount > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {itemsCount} {itemsCount === 1 ? 'artículo' : 'artículos'}
                </Badge>
              )}
            </SheetTitle>
            <SheetDescription>
              {uniqueItemsCount > 0 
                ? `${uniqueItemsCount} productos diferentes en tu carrito`
                : "Tu carrito está vacío"
              }
            </SheetDescription>
          </SheetHeader>

          <Separator />

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
                <p className="text-sm text-muted-foreground">
                  Agrega algunos productos para comenzar
                </p>
              </div>
              <Button onClick={() => setCartOpen(false)}>
                Continuar comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <ScrollArea className="flex-1 pr-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} 
                          className="flex gap-4 p-4 border rounded-lg">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-2">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium line-clamp-2">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.product.brand} • {item.product.category}
                            </p>
                          </div>

                          {/* Size and Color */}
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex gap-2 text-xs">
                              {item.selectedSize && (
                                <Badge variant="outline" className="text-xs">
                                  Talla: {item.selectedSize}
                                </Badge>
                              )}
                              {item.selectedColor && (
                                <Badge variant="outline" className="text-xs">
                                  Color: {item.selectedColor}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Price and Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            
                            <div className="flex items-center gap-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Remove Button */}
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

              <Separator />

              {/* Cart Summary */}
              <div className="space-y-4 pr-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pb-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Proceder al checkout
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setCartOpen(false)}
                    >
                      Continuar comprando
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <CheckoutDialog 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
      />
    </>
    
  );
}