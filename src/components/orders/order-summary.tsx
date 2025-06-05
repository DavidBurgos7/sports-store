import { Separator } from "@/components/ui/separator";
import { Order } from "@/lib/models/orders/order";

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>${order.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Impuestos</span>
        <span>${order.tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Envío</span>
        <span>
          {order.shippingCost > 0 
            ? `$${order.shippingCost.toFixed(2)}` 
            : "Gratis"}
        </span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}