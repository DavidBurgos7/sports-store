import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Order } from "@/lib/models/orders/order";
import { OrderStatus } from "@/lib/models/orders/order-status";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertTriangle, CameraOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StatusBadge } from "./status-badge";

const DEFAULT_PRODUCT_IMG_PLACEHOLDER: string = "/api/placeholder/400/400";

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  // Formatear la fecha
  const formattedDate = format(new Date(order.date), "d 'de' MMMM, yyyy", { locale: es });
  
  // Calcular total de ítems
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Obtener la imagen del primer item
  const firstItemImage = order.items[0]?.product.imageUrl || "";

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(order.id);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Pedido #{order.orderNumber}</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden relative">
            { firstItemImage ? (
                <Image
                  src={firstItemImage}
                  alt={order.items[0]?.product.name || "Producto"}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              ) : (
                <CameraOff className="text-gray-500" size={64}/>
              )
            }
            {totalItems > 1 && (
              <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-tl-md text-xs font-medium px-1">
                +{totalItems - 1}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium line-clamp-1">
              {order.items[0]?.product.name}
              {totalItems > 1 ? ` y ${totalItems - 1} más` : ""}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              Envío a: {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
          </div>
        </div>

        {order.status === OrderStatus.SHIPPED && order.trackingNumber && (
          <div className="text-xs bg-muted p-2 rounded mb-2">
            <p className="font-medium">Seguimiento: {order.trackingNumber}</p>
            {order.estimatedDeliveryDate && (
              <p className="text-muted-foreground">
                Entrega estimada: {format(new Date(order.estimatedDeliveryDate), "d 'de' MMMM", { locale: es })}
              </p>
            )}
          </div>
        )}

        {order.status === OrderStatus.CANCELLED && (
          <div className="text-xs flex items-start gap-1 bg-red-50 p-2 rounded mb-2 text-red-800">
            <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>Este pedido ha sido cancelado.</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="font-medium">${order.total.toFixed(2)}</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewDetails}
          asChild={!onViewDetails}
        >
          {onViewDetails ? (
            "Ver detalles"
          ) : (
            <Link href={`/pedidos/${order.id}`}>Ver detalles</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}