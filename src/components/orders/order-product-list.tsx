import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/models/cart/cart-item";
import { CameraOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderProductListProps {
  items: CartItem[];
}

export function OrderProductList({ items }: OrderProductListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.product.id}-${index}`} className="flex gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden relative flex-shrink-0">
            { item.product.imageUrl ? (
                <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                className="object-contain"
                sizes="80px"
              />
              ) : (
                <CameraOff className="text-gray-500" size={80}/>
              )
            }
            
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h3 className="font-medium line-clamp-2">{item.product.name}</h3>
              <div className="text-right">
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                {item.product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    ${(item.product.originalPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-1 text-sm text-muted-foreground">
              <p>
                ${item.product.price.toFixed(2)} x {item.quantity}
              </p>
              <div className="mt-1">
                {item.selectedSize && (
                  <span className="mr-3">Talla: {item.selectedSize}</span>
                )}
                {item.selectedColor && (
                  <span>Color: {item.selectedColor}</span>
                )}
              </div>
            </div>
            
            <Button 
              variant="link" 
              className="mt-1 h-auto p-0 text-sm" 
              asChild
            >
              <Link href={`/producto/${item.product.id}`}>
                Ver producto
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}