import { OrderAddress } from "@/lib/models/orders/order";

interface ShippingAddressProps {
  address: OrderAddress;
}

export function ShippingAddress({ address }: ShippingAddressProps) {
  return (
    <div className="space-y-1">
      <p className="font-medium">
        {address.firstName} {address.lastName}
      </p>
      <p>{address.street}</p>
      <p>
        {address.city}, {address.state} {address.zipCode}
      </p>
      <p>{address.country}</p>
      <p className="text-muted-foreground">Tel: {address.phone}</p>
      
      {address.instructions && (
        <div className="mt-2 text-sm">
          <p className="font-medium">Instrucciones:</p>
          <p className="text-muted-foreground">{address.instructions}</p>
        </div>
      )}
    </div>
  );
}