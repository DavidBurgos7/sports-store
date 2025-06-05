"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, Search, X, Heart, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from "@/lib/store/cart-store";
import { useUserInfoStore } from "@/lib/store/user-store";
import { resetAllStores } from "@/lib/store/store-manager";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SearchBar from "../search/search-bar";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const router = useRouter();
  // Estado para manejar la hidratación del carrito
  const [isMounted, setIsMounted] = React.useState(false);

  const {userInfo} = useUserInfoStore();
  const isAutenticated: boolean = userInfo ? true : false; // Verifica si el usuario está autenticado

  // Cart store
  const { toggleCart, getItemsCount } = useCartStore();
  const itemsCount = getItemsCount();

  // Evitar hidratación incorrecta inicializando el estado del cliente
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const mainMenuItems = [
    { name: "Inicio", path: "/" },
    { name: "Deportes", path: "/deportes", hasSubmenu: true },
    { name: "Marcas", path: "/marcas", hasSubmenu: true },
    { name: "Ofertas", path: "/ofertas" },
    { name: "Nuevos", path: "/nuevos" },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    resetAllStores(); // Reset all stores to clear user data

    // Redirect to login page
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 pr-5">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold">SportStore</span>
            </Link>
          </div>

          {/* Menu principal - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative whitespace-nowrap",
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {item.hasSubmenu && (
                  <span className="ml-1 text-xs">▼</span>
                )}
              </Link>
            ))}
          </div>

          {/* Barra de búsqueda - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <SearchBar />
          </div>

          {/* Acciones del lado derecho */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Búsqueda móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Favoritos */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Carrito */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Solo mostrar el contador cuando el componente está montado en el cliente */}
              {isMounted && itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Button>

            {/* Avatar/Usuario */}
            {isAutenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.jpg" alt="Usuario" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <Link href="/user" >
                      <DropdownMenuItem className="flex items-center gap-2">
                        <User className="mr-2 h-4 w-4" />
                        <span>Mi Perfil</span>
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/orders" >
                      <DropdownMenuItem className="flex items-center gap-2">
                          <span>Mis Ordenes</span>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem disabled>
                      <span>Lista de Deseos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogOut} >
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/login">
                        <Button variant="default" size="icon">
                          <User className="h-5 w-5" />
                          {/* Texto oculto para accesibilidad */}
                          <span className="sr-only">
                            Iniciar Sesión
                          </span>
                        </Button>
                      </Link> 
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Iniciar sesión</span>
                    </TooltipContent>
                  </Tooltip>
          
                  <span className="text-sm text-muted-foreground">o</span>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/register">
                        <Button variant="outline" size="icon">
                          <UserPlus className="h-5 w-5" />
                          {/* Texto oculto para accesibilidad */}
                          <span className="sr-only">
                            Registrarse
                          </span>
                        </Button>
                      </Link>  
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Registrarse</span>
                    </TooltipContent>
                  </Tooltip>
                </>
              )
            }

            {/* Menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Barra de búsqueda móvil */}
        {isSearchOpen && (
          <div className="md:hidden py-2 border-t">
            <SearchBar />
          </div>
        )}

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="px-4 py-6 space-y-4 bg-background">
              {/* Barra de búsqueda móvil */}
              <div className="md:hidden">
                <SearchBar />
              </div>

              {/* Menú de navegación móvil */}
              <div className="space-y-2">
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "block py-2 text-base font-medium transition-colors hover:text-primary",
                      pathname === item.path ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Enlaces adicionales móvil */}
              <div className="pt-4 border-t space-y-2">
                <Link 
                  href="/favoritos" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" />
                  <span>Lista de Deseos</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}