"use client";

import { OrderCard } from "@/components/orders/order-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/lib/models/orders/order-status";
import { useOrdersStore } from "@/lib/store/orders-store";
import { useUserInfoStore } from "@/lib/store/user-store";
import { ChevronRight, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function OrdersPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { orders } = useOrdersStore();

  // filter orders based on selected status and search query
  const filteredOrders = orders
    .filter(order => {
      if (selectedStatus === "all") return true;
      return order.status === selectedStatus;
    })
    .filter(order => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some(item => item.product.name.toLowerCase().includes(query)) ||
        order.shippingAddress.city.toLowerCase().includes(query) ||
        order.shippingAddress.state.toLowerCase().includes(query)
      );
    });
  
  // Counts for each order status
  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === OrderStatus.PENDING).length,
    processing: orders.filter(o => o.status === OrderStatus.PROCESSING).length,
    shipped: orders.filter(o => o.status === OrderStatus.SHIPPED).length,
    delivered: orders.filter(o => o.status === OrderStatus.DELIVERED).length,
    cancelled: orders.filter(o => o.status === OrderStatus.CANCELLED).length,
  };

  // Handler to view order details
  const handleViewOrderDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
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
            <span className="ml-1 text-sm font-medium text-foreground">
              Mis Pedidos
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
          <p className="text-muted-foreground">Consulta el estado de tus compras y realiza seguimiento</p>
        </div>
        
        {orders.length > 0 && (
          <div className="relative w-full md:w-72 lg:w-80">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por número o productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-muted inline-flex p-4 rounded-full mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">No tienes pedidos</h2>
          <p className="text-muted-foreground mb-6">
            Parece que aún no has realizado ningún pedido.
          </p>
          <Button asChild>
            <Link href="/">Explorar productos</Link>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="all" value={selectedStatus} onValueChange={setSelectedStatus}>
          <TabsList className="mb-6 w-full max-w-3xl overflow-x-auto flex items-center h-auto p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary relative"
            >
              Todos
              <Badge variant="secondary" className="ml-2 font-normal">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Pendientes
              {counts.pending > 0 && (
                <Badge variant="secondary" className="ml-2 font-normal">{counts.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="processing" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Procesando
              {counts.processing > 0 && (
                <Badge variant="secondary" className="ml-2 font-normal">{counts.processing}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="shipped" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Enviados
              {counts.shipped > 0 && (
                <Badge variant="secondary" className="ml-2 font-normal">{counts.shipped}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="delivered" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Entregados
              {counts.delivered > 0 && (
                <Badge variant="secondary" className="ml-2 font-normal">{counts.delivered}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Cancelados
              {counts.cancelled > 0 && (
                <Badge variant="secondary" className="ml-2 font-normal">{counts.cancelled}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus}>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 border rounded-md bg-muted/30">
                <ShoppingBag className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-1">No se encontraron pedidos</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery 
                    ? "No hay resultados que coincidan con tu búsqueda." 
                    : "No tienes pedidos con este estado actualmente."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onViewDetails={handleViewOrderDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}