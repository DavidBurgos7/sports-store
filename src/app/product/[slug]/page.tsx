"use client";

import Breadcrumb from "@/components/common/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/store/cart-store";
import { useStockStore } from "@/lib/store/stock-store";
import { formatPrice } from "@/lib/utils";
import { CameraOff, ChevronRight, Eye, Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const DEFAULT_PRODUCT_IMG_PLACEHOLDER: string = "/api/placeholder/400/400";


export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);
    const [selectedSize, setSelectedSize] = useState<any | null>(null);
    const [selectedColor, setSelectedColor] = useState<any | null>(null);
    const { getProductBySlug } = useStockStore();
    const { addItem } = useCartStore();

    const product = getProductBySlug(slug);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor selecciona una talla");
            return;
        }

        if (!selectedColor) {
            alert("Por favor selecciona un color");
            return;
        }

        if (!product) {
            alert("Producto no encontrado");
            return;
        }

        addItem(product, 1,);
    };

    const handleToggleFavorite = () => {
        // TODO: Implementar logica de agregar a favoritos
        console.log("Toggle favorito:", product);
    };

    // Renderizar estrellas basadas en el rating
    const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }

    if (hasHalfStar) {
        stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-star-${i}`} className="text-gray-300 h-5 w-5" />);
    }

    return stars;
    };

    // Mapeo de colores a clases de Tailwind
    const colorClasses: Record<string, string> = {
        white: "bg-white border-gray-200",
        black: "bg-black",
        blue: "bg-blue-600",
        red: "bg-red-600",
        yellow: "bg-yellow-400",
        green: "bg-green-500",
        orange: "bg-orange-500",
        purple: "bg-purple-600",
        pink: "bg-pink-500",
        gray: "bg-gray-500",
        brown: "bg-amber-800",
        navy: "bg-indigo-900"
    };

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <p className="mb-8">Lo sentimos, el producto que buscas no existe o ha sido removido.</p>
                <Button onClick={() => router.push("/")}>
                    Volver a la tienda
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb currentPage={product.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Imagen del producto */}
                {/* TODO: Cambiar por el caroulsel del hero */}
                <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                    {product.isOnSale && (
                    <Badge className="absolute top-4 left-4 z-10 bg-destructive hover:bg-destructive">
                        -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                    </Badge>
                    )}
                    
                    {product.isNew && (
                    <Badge className="absolute top-4 left-4 z-10 bg-green-500 hover:bg-green-600">
                        Nuevo
                    </Badge>
                    )}

                    <div className="aspect-square relative">
                        { product.imageUrl === DEFAULT_PRODUCT_IMG_PLACEHOLDER ? (
                            <div className="flex items-center justify-center h-full">
                                <CameraOff className="text-gray-500" size={150}/>
                            </div>
                            ) : (
                            <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-6"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            />
                        )}
                    </div>

                    
                    <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={() => {}}
                    >
                    <Eye className="h-5 w-5" />
                    </Button>
                </div>

                {/* Información del producto */}
                <div>
                    {/* Categoría y marca */}
                    <div className="mb-2">
                    <Link 
                        href={`/${product.category.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider"
                    >
                        {product.category}
                    </Link>
                    {" • "}
                    <Link 
                        href={`/marcas/${product.brand.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider"
                    >
                        {product.brand}
                    </Link>
                    </div>

                    {/* Nombre del producto */}
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    {/* Descripción */}
                    <p className="mb-6 text-muted-foreground">{product.description}</p>

                    {/* Estrellas y reseñas */}
                    <div className="flex items-center mb-6">
                    <div className="flex mr-2">
                        {renderStars(product.rating ?? 0)}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="mx-1 text-muted-foreground">•</span>
                    <Link href="#reviews" className="text-sm text-muted-foreground hover:text-primary">
                        {product.reviewCount} reseñas
                    </Link>
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-primary">
                        {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                        <span className="ml-2 text-xl text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                        )}
                    </div>
                    </div>

                    {/* Colores */}
                    <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Colores:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.colors?.map((color) => (
                        <button
                            key={color.id}
                            className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor?.colorName === color.colorName
                                ? "ring-2 ring-primary ring-offset-2"
                                : ""
                            } ${colorClasses[color.colorName.toLowerCase()] || "bg-gray-200"}`}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Color ${color.colorName}`}
                        />
                        ))}
                    </div>
                    </div>

                    {/* Tallas */}
                    <div className="mb-8">
                    <h3 className="text-sm font-medium mb-3">Tallas:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes?.map((sizeObj) => (
                            <button
                                key={sizeObj.id}
                                type="button"
                                className={`h-10 min-w-[2.5rem] px-3 rounded border ${
                                selectedSize?.size === sizeObj.size
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-accent border-input"
                                }`}
                                onClick={() => setSelectedSize(sizeObj)}
                            >
                                {sizeObj.size}
                            </button>
                        ))}
                    </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4">
                    <Button 
                        onClick={handleAddToCart}
                        className="flex-1"
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Agregar al carrito
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleFavorite}
                    >
                        <Heart className="h-5 w-5" />
                    </Button>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-8 flex items-center space-x-8 text-sm">
                    <div className="flex items-center">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Envío gratis</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>30 días devolución</span>
                    </div>
                    </div>
                </div>
            </div>

            {/* Tabs con detalles adicionales */}
            <Tabs defaultValue="details" className="mb-12">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                    <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                    <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-6">
                    <div className="space-y-4">
                    <h3 className="text-lg font-medium">Acerca de este producto</h3>
                    <p>{product.description}</p>
                    <ul className="space-y-2 mt-4">
                        {/* {product.details?.map((detail, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{detail}</span>
                        </li>
                        ))} */}
                    </ul>
                    </div>
                </TabsContent>
                <TabsContent value="specifications" className="pt-6">
                    <div className="space-y-4">
                    <h3 className="text-lg font-medium">Especificaciones técnicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Marca</span>
                        <p className="font-medium">{product.brand}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Categoría</span>
                        <p className="font-medium">{product.category}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Colores disponibles</span>
                        <p className="font-medium capitalize">{product.colors?.map(colorObj => colorObj.colorName).join(", ")}</p>
                        </div>
                        <div className="border-b pb-2">
                        <span className="text-sm text-muted-foreground">Tallas disponibles</span>
                        <p className="font-medium">{product.sizes?.map(sizeObj => sizeObj.size).join(", ")}</p>
                        </div>
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-6" id="reviews">
                    <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Reseñas de clientes</h3>
                        <Button variant="outline">Escribir reseña</Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-center">
                        <div className="text-4xl font-bold">{product.rating}</div>
                        <div className="flex justify-center mt-1">
                            {renderStars(product.rating ?? 0)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                            {product.reviewCount} reseñas
                        </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                        {/* Barras de progreso simuladas para las reseñas */}
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center">
                            <span className="text-sm w-6">{star}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                className="h-full bg-yellow-400 rounded-full" 
                                style={{ 
                                    width: `${star === Math.round(product.rating ?? 0) ? "60%" : 
                                            star > Math.round(product.rating ?? 0) ? "10%" : "30%"}` 
                                }} 
                                />
                            </div>
                            <span className="text-sm text-muted-foreground ml-2 w-8">
                                {star === Math.round(product.rating ?? 0) ? "60%" : 
                                star > Math.round(product.rating ?? 0) ? "10%" : "30%"}
                            </span>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                    {/* Ejemplo de reseñas */}
                    <div className="space-y-6 mt-8">
                        {/* Aquí irían las reseñas reales de los usuarios */}
                        <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                            <div className="font-medium">Cliente Satisfecho</div>
                            <div className="text-sm text-muted-foreground">Hace 2 semanas</div>
                        </div>
                        <div className="flex mb-2">
                            {renderStars(5)}
                        </div>
                        <p>Excelente producto. La amortiguación es perfecta para mis entrenamientos diarios y el diseño es muy atractivo. 100% recomendado.</p>
                        </div>
                        
                        <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                            <div className="font-medium">Runner Habitual</div>
                            <div className="text-sm text-muted-foreground">Hace 1 mes</div>
                        </div>
                        <div className="flex mb-2">
                            {renderStars(4)}
                        </div>
                        <p>Muy buen calzado para running. Cómodo y ligero. Le quito una estrella porque tarda un poco en adaptarse al pie los primeros días.</p>
                        </div>
                    </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Productos relacionados */}
            <div className="my-12">
                <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Aquí irían los productos relacionados - mostrar solo como ejemplo */}
                    {/* Estos deberían ser productos reales de tu base de datos */}
                    {Array(4).fill(null).map((_, index) => (
                    <div key={index} className="border rounded-md overflow-hidden bg-background">
                        <div className="aspect-square relative">
                        { product.imageUrl === DEFAULT_PRODUCT_IMG_PLACEHOLDER ? (
                            <div className="flex items-center justify-center h-full">
                                <CameraOff className="text-gray-500" size={150}/>
                            </div>
                            ) : (
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        )}
                        </div>
                        <div className="p-4">
                        <h3 className="text-sm font-medium line-clamp-2">
                            Producto relacionado {index + 1}
                        </h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-primary font-medium">
                            {formatPrice(79.99 + index * 10)}
                            </span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}