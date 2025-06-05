"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  isVisible: boolean;
  onToggle: () => void;
  onFiltersChange: (filters: any) => void;
}

export function FilterBar({ isVisible, onToggle, onFiltersChange }: FilterBarProps) {
  const [priceRange, setPriceRange] = React.useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [rating, setRating] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const categories = [
    "Fútbol",
    "Basquetbol",
    "Running",
    "Fitness",
    "Tenis",
    "Natación",
    "Ciclismo",
    "Yoga"
  ];

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Under Armour",
    "Reebok",
    "New Balance",
    "Asics",
    "Converse"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

  const colors = [
    { name: "Negro", value: "black", color: "#000000" },
    { name: "Blanco", value: "white", color: "#FFFFFF" },
    { name: "Rojo", value: "red", color: "#DC2626" },
    { name: "Azul", value: "blue", color: "#2563EB" },
    { name: "Verde", value: "green", color: "#16A34A" },
    { name: "Amarillo", value: "yellow", color: "#D97706" },
    { name: "Rosa", value: "pink", color: "#EC4899" },
    { name: "Gris", value: "gray", color: "#6B7280" },
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setRating("");
    setSortBy("");
  };

  React.useEffect(() => {
    onFiltersChange({
      priceRange,
      categories: selectedCategories,
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
      rating,
      sortBy,
    });
  }, [priceRange, selectedCategories, selectedBrands, selectedSizes, selectedColors, rating, sortBy]);

  return (
    <>
      {/* Toggle Button - Mobile */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {isVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={cn(
        "space-y-4 lg:block",
        isVisible ? "block" : "hidden"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label>Ordenar por</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona orden" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
              <SelectItem value="newest">Más Recientes</SelectItem>
              <SelectItem value="rating">Mejor Valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Accordion Filters */}
        <Accordion type="multiple" defaultValue={["price", "category", "brand"]}>
          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger>Precio</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                    className="w-20"
                    placeholder="Max"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Categories */}
          <AccordionItem value="category">
            <AccordionTrigger>Categorías</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brands */}
          <AccordionItem value="brand">
            <AccordionTrigger>Marcas</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sizes */}
          <AccordionItem value="size">
            <AccordionTrigger>Tallas</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-xs">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Colors */}
          <AccordionItem value="color">
            <AccordionTrigger>Colores</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {colors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.value}`}
                      checked={selectedColors.includes(color.value)}
                      onCheckedChange={(checked) => handleColorChange(color.value, checked as boolean)}
                    />
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: color.color }}
                      />
                      <Label htmlFor={`color-${color.value}`} className="text-sm font-normal">
                        {color.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating">
            <AccordionTrigger>Calificación</AccordionTrigger>
            <AccordionContent>
              <RadioGroup value={rating} onValueChange={setRating}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <RadioGroupItem value={stars.toString()} id={`rating-${stars}`} />
                    <Label htmlFor={`rating-${stars}`} className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "text-sm",
                              i < stars ? "text-yellow-400" : "text-gray-300"
                            )}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm">{stars} estrellas y más</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}