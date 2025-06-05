"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronRight, ArrowLeft, MapPin, Package, AlertTriangle, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOrdersStore } from "@/lib/store/orders-store";
import { StatusBadge } from "@/components/orders/status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { OrderSummary } from "@/components/orders/order-summary";
import { ShippingAddress } from "@/components/orders/shipping-address";
import { OrderProductList } from "@/components/orders/order-product-list";
import { OrderStatus } from "@/lib/models/orders/dtos/OrderStatus";


export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const { getOrderById, cancelOrder, updateOrderStatus } = useOrdersStore();
  const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined);
  
  const { orderId } = use(params);

  useEffect(() => {
    const foundOrder = getOrderById(orderId);
    console.log("Order found:", foundOrder);
    
    setOrder(foundOrder);
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Pedido no encontrado</h1>
        <p className="mb-8">Lo sentimos, el pedido que buscas no existe o ha sido removido.</p>
        <Button onClick={() => router.push("/orders")}>
          Ver todos mis pedidos
        </Button>
      </div>
    );
  }

  // Formatear la fecha
  const formattedDate = format(new Date(order.date), "d 'de' MMMM, yyyy", { locale: es });
  
  const handleCancelOrder = () => {
    if (window.confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
      cancelOrder(order.id);
      setOrder({ ...order, status: OrderStatus.CANCELLED });
    }
  };

  // Solo para demostración: Cambiar el estado del pedido (normalmente esto lo haría una API)
  const handleUpdateStatus = (status: typeof order.status) => {
    updateOrderStatus(order.id, status);
    setOrder({ ...order, status });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href="/pedidos" className="ml-1 text-sm font-medium text-muted-foreground hover:text-primary">
              Mis Pedidos
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="ml-1 text-sm font-medium text-foreground">
              {order.orderNumber}
            </span>
          </li>
        </ol>
      </nav>

      {/* Cabecera del pedido */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Pedido #{order.orderNumber}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-muted-foreground">Realizado el {formattedDate}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => router.push("/pedidos")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a mis pedidos
          </Button>
          
          {/* Solo mostrar el botón de cancelar si el pedido está pendiente o procesando */}
          {(order.status === OrderStatus.PENDING || order.status === OrderStatus.PROCESSING) && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleCancelOrder}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar pedido
            </Button>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Detalles y timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mensaje de cancelación si aplica */}
          {order.status === OrderStatus.CANCELLED && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Pedido cancelado</h3>
                <p className="text-sm">Este pedido ha sido cancelado y no será procesado.</p>
              </div>
            </div>
          )}

          {/* Estado del envío con timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                Estado del pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline order={order} />
              
              {/* Demo: Botones para cambiar el estado (solo para demostración) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-3 border border-dashed rounded-md">
                  <p className="text-sm font-medium mb-2">Demo: Cambiar estado del pedido</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(OrderStatus.PENDING)}>Pendiente</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(OrderStatus.PROCESSING)}>Procesando</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(OrderStatus.SHIPPED)}>Enviado</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(OrderStatus.DELIVERED)}>Entregado</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(OrderStatus.CANCELLED)}>Cancelado</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Elementos del pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderProductList items={order.items} />
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: Resumen, dirección de envío, info de pago */}
        <div className="space-y-6">
          {/* Resumen del pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderSummary order={order} />
            </CardContent>
          </Card>

          {/* Dirección de envío */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                Dirección de envío
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingAddress address={order.shippingAddress} />
            </CardContent>
          </Card>

          {/* Información de pago */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                Método de pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.paymentMethod}</p>
            </CardContent>
          </Card>

          {/* Preguntas frecuentes */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="returns">
              <AccordionTrigger>¿Puedo devolver mi pedido?</AccordionTrigger>
              <AccordionContent>
                Sí, puedes devolver los productos dentro de los 30 días posteriores a la recepción. 
                Los artículos deben estar sin usar y en su embalaje original.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="issues">
              <AccordionTrigger>Tengo un problema con mi pedido</AccordionTrigger>
              <AccordionContent>
                Si tienes algún problema con tu pedido, puedes contactar con nuestro servicio 
                de atención al cliente a través del formulario de contacto o llamando al 
                teléfono de atención al cliente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="modify">
              <AccordionTrigger>¿Puedo modificar mi pedido?</AccordionTrigger>
              <AccordionContent>
                Los pedidos solo pueden modificarse si aún están en estado "Pendiente". 
                Una vez que pasan a "Procesando", ya no es posible realizar cambios.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}