import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// Función para generar un slug a partir del nombre del producto
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Eliminar caracteres especiales
    .replace(/\s+/g, '-')      // Reemplazar espacios con guiones
    .replace(/--+/g, '-');     // Eliminar guiones duplicados
}