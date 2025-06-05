import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/models/orders/order-status";
import { CheckCircle2, Clock, Package, Truck, X } from "lucide-react";

interface StatusBadgeProps {
  // status: Order["status"];
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<OrderStatus, { color: string; icon: React.ReactElement, label: string }> = {
    PENDING: { 
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", 
      icon: <Clock className="h-3 w-3 mr-1" />,
      label: "Pendiente"
    },
    PROCESSING: { 
      color: "bg-blue-100 text-blue-800 hover:bg-blue-100", 
      icon: <Package className="h-3 w-3 mr-1" />,
      label: "Procesando" 
    },
    SHIPPED: { 
      color: "bg-purple-100 text-purple-800 hover:bg-purple-100", 
      icon: <Truck className="h-3 w-3 mr-1" />,
      label: "Enviado" 
    },
    DELIVERED: { 
      color: "bg-green-100 text-green-800 hover:bg-green-100", 
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      label: "Entregado" 
    },
    CANCELLED: { 
      color: "bg-red-100 text-red-800 hover:bg-red-100", 
      icon: <X className="h-3 w-3 mr-1" />,
      label: "Cancelado" 
    },
    RETURNED: { 
      color: "bg-orange-100 text-orange-800 hover:bg-orange-100", 
      icon: <X className="h-3 w-3 mr-1" />,
      label: "Devuelto" 
    },
    CONFIRMED: {
      color: "bg-green-100 text-green-800 hover:bg-green-100",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      label: "Confirmado"
    }
  };

  const { color, icon, label } = variants[status];

  return (
    <Badge variant="outline" className={`${color} flex items-center font-normal`}>
      {icon}
      {label}
    </Badge>
  );
}