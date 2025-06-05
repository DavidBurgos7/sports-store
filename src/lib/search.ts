import { Product } from "./models/products/product";
import { ProductSearchResult } from "./models/products/product-search-results";
import { generateSlug } from "./utils";

function mapProductsToSearchResults (products: Product[]): ProductSearchResult[] {
  return products.map(product => ({
      id: product.id,
      name: product.name,
      slug: generateSlug(product.name),
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.imageUrl,
      category: product.category,
      brand: product.brand,
    }
  ));
}

// Función para buscar productos basados en una consulta
export function searchProductsByQuery(query: string, products: Product[]): ProductSearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];

  const foundProducts = products.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) ||
    product.brand.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery));
  
  if (foundProducts.length === 0) return [];

  const searchResults = mapProductsToSearchResults(foundProducts);
  
  return searchResults;
}