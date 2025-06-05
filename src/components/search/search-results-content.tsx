import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../common/breadcrumb";
import { useState } from "react";
import { useStockStore } from "@/lib/store/stock-store";
import { searchProductsByQuery } from "@/lib/search";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCard } from "../products/product-card";
import Link from "next/link";

export default function SearchResultsContent() {

    const searchParams = useSearchParams();
      const query = searchParams.get("q") || "";
      const [searchQuery, setSearchQuery] = useState(query);
      const { products } = useStockStore();
      const router = useRouter();
      
      // Get search results based on the query
      const searchResults = searchProductsByQuery(query, products);
    
      const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Recargar la página con la nueva consulta de búsqueda
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      };

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumb currentPage="Resultados de búsqueda" />

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Resultados de búsqueda para "{query}"
            </h1>
            <p className="text-muted-foreground">
              Se encontraron {searchResults.length} productos
            </p>
          </div>

          <div className="mb-6">
            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 w-full"
              />
              <Button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 rounded-l-none"
              >
                Buscar
              </Button>
            </form>
          </div>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
            <ProductCard product={product as any} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-md bg-background">
            <h2 className="text-xl font-medium mb-2">No se encontraron resultados</h2>
            <p className="text-muted-foreground mb-6">
              No se encontraron productos que coincidan con "{query}".
            </p>
            <Link href="/" className="text-primary hover:underline">
              Volver a la página principal
            </Link>
          </div>
        )}
      </div>
    );
}