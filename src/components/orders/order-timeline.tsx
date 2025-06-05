import { Button } from "@/components/ui/button";
import { Order } from "@/lib/models/orders/order";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2, Clock, ExternalLink, Package, Truck, X } from "lucide-react";

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  // Crear los pasos basados en el estado
  const steps = [
    { 
      title: "Pedido realizado", 
      description: `${format(new Date(order.date), "d 'de' MMMM, yyyy", { locale: es })}`,
      status: "completed", 
      icon: <Clock className="h-4 w-4" /> 
    },
    { 
      title: "Procesando", 
      description: "Preparando tu pedido",
      status: order.status === "pending" ? "pending" : "completed", 
      icon: <Package className="h-4 w-4" /> 
    },
    { 
      title: "Enviado", 
      description: order.trackingNumber 
        ? `Seguimiento: ${order.trackingNumber}` 
        : "Tu pedido está en camino",
      status: order.status === "pending" || order.status === "processing" 
        ? "pending" 
        : order.status === "cancelled" ? "cancelled" : "completed", 
      icon: <Truck className="h-4 w-4" /> 
    },
    { 
      title: "Entregado", 
      description: order.status === "delivered" 
        ? `Entregado el ${order.estimatedDeliveryDate ? format(new Date(order.estimatedDeliveryDate), "d 'de' MMMM", { locale: es }) : ""}` 
        : "Pendiente de entrega",
      status: order.status === "delivered" ? "completed" : "pending",
      icon: <CheckCircle2 className="h-4 w-4" /> 
    }
  ];

  if (order.status === "cancelled") {
    steps.push({
      title: "Pedido cancelado", 
      description: "Tu pedido ha sido cancelado",
      status: "error", 
      icon: <X className="h-4 w-4" /> 
    });
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === "completed" 
                ? "bg-green-100 text-green-800" 
                : step.status === "pending" 
                  ? "bg-gray-200 text-gray-600" 
                  : step.status === "error" || step.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
            }`}>
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-full my-1 ${
                step.status === "completed" 
                  ? "bg-green-200" 
                  : "bg-gray-200"
              }`} />
            )}
          </div>
          <div className="pb-5">
            <h4 className="font-medium">{step.title}</h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
            
            {step.title === "Enviado" && order.trackingNumber && order.status !== "pending" && order.status !== "processing" && order.status !== "cancelled" && (
              <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-xs" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Seguir envío <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}