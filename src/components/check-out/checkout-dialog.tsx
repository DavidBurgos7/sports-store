"use client";

import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin, 
  Edit, 
  CreditCard,
  Package,
  Check,
  Copy,
  ArrowLeft
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

// Schema para la dirección de envío
const addressSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  street: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad es requerida"),
  state: z.string().min(2, "El estado/provincia es requerido"),
  zipCode: z.string().min(3, "El código postal es requerido"),
  country: z.string().min(2, "El país es requerido"),
  phone: z.string().min(10, "Número de teléfono válido requerido"),
  instructions: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = React.useState<'address' | 'review' | 'confirmation'>('address');
  const [orderNumber, setOrderNumber] = React.useState<string>('');
  const [isEditingAddress, setIsEditingAddress] = React.useState(false);
  const [confirmedAddress, setConfirmedAddress] = React.useState<AddressFormValues | null>(null);

  const totalPrice = getTotalPrice();
  const shippingCost = 0; // Envío gratis
  const tax = totalPrice * 0.1; // 10% de impuestos
  const finalTotal = totalPrice + shippingCost + tax;

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      instructions: "",
    },
  });

  const onSubmitAddress = (values: AddressFormValues) => {
    setConfirmedAddress(values);
    setIsEditingAddress(false);
    setStep('review');
  };

  const handleConfirmOrder = () => {
    // Generar número de orden
    const orderNum = 'ORD-' + Date.now().toString(36).toUpperCase();
    setOrderNumber(orderNum);
    setStep('confirmation');
    
    // Simular delay de procesamiento
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
  };

  const resetDialog = () => {
    setStep('address');
    setOrderNumber('');
    setConfirmedAddress(null);
    setIsEditingAddress(false);
    form.reset();
  };

  React.useEffect(() => {
    if (!open) {
      // Reset cuando se cierra el diálogo
      setTimeout(() => {
        resetDialog();
      }, 300);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'address' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Dirección de Envío
              </DialogTitle>
              <DialogDescription>
                Ingresa la dirección donde quieres recibir tu pedido
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitAddress)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle 123 #45-67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Bogotá" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento/Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu numero telefonico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrucciones de entrega (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Apartamento 123, torre 2, unidad 5, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Continuar a revisión</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}

        {step === 'review' && confirmedAddress && (
          <>
            <DialogHeader>
              <DialogTitle>Revisar y confirmar tu pedido</DialogTitle>
              <DialogDescription>
                Verifica que todos los detalles sean correctos antes de confirmar tu pedido
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Dirección de envío */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Dirección de envío
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-primary"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="font-medium">{confirmedAddress.firstName} {confirmedAddress.lastName}</p>
                  <p>{confirmedAddress.street}</p>
                  <p>{confirmedAddress.city}, {confirmedAddress.state} {confirmedAddress.zipCode}</p>
                  <p>{confirmedAddress.country}</p>
                  <p>Tel: {confirmedAddress.phone}</p>
                  {confirmedAddress.instructions && (
                    <p className="mt-2 text-muted-foreground">
                      Instrucciones: {confirmedAddress.instructions}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Editar dirección Dialog */}
              {isEditingAddress && (
                <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar dirección</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitAddress)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ciudad</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estado/Provincia</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Código Postal</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>País</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="instructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instrucciones (opcional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditingAddress(false)}
                          >
                            Cancelar
                          </Button>
                          <Button type="submit">Guardar dirección</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              )}

              {/* Resumen del pedido */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    Resumen del pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lista de productos */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} 
                          className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-muted-foreground">
                              {item.quantity} x ${item.product.price.toFixed(2)}
                            </div>
                            <div className="text-sm font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.selectedSize && `Talla: ${item.selectedSize}`}
                              {item.selectedSize && item.selectedColor && ' • '}
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totales */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impuestos (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Envío</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Método de pago */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    Método de pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm">
                      Este es un sitio de demostración. No se realizará ningún cargo real.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('address')}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleConfirmOrder}
                >
                  Confirmar pedido
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'confirmation' && (
          <>
            <div className="text-center space-y-6 py-8">
              <div className="bg-green-100 rounded-full mx-auto w-24 h-24 flex items-center justify-center">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">¡Pedido confirmado!</h2>
                <p className="text-muted-foreground">
                  Tu pedido ha sido recibido y está siendo procesado
                </p>
              </div>

              <div className="bg-muted p-4 rounded-md flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Número de orden</p>
                  <p className="font-mono font-bold">{orderNumber}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyOrderNumber}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-md text-left">
                <h3 className="font-medium mb-2">Detalles</h3>
                <p className="text-sm text-muted-foreground">
                  Recibirás un correo electrónico con la confirmación del pedido y 
                  la información de seguimiento una vez que tu pedido sea despachado.
                </p>
              </div>

              <Button onClick={() => onOpenChange(false)}>
                Continuar comprando
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}