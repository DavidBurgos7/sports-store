import { Product } from "./models/products/product";

// Productos para mostrar en la página principal
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270 React",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 234,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/28972550-4120-49c7-a6fc-4263cf09f617/AIR+MAX+270.png",
    category: "Running",
    brand: "Nike",
    isOnSale: true,
    isFeatured: true,
    sizes: [
      { id: 1, size: "7", available: true },
      { id: 2, size: "8", available: true },
      { id: 3, size: "9", available: false },
      { id: 4, size: "10", available: true },
      { id: 5, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "white", hexCode: "#FFFFFF" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "blue", hexCode: "#0066CC" }
    ],
    description: "Zapatillas de running con tecnología de amortiguación avanzada para máximo confort durante tus entrenamientos."
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 89.99,
    rating: 4.8,
    reviewCount: 567,
    imageUrl: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/53bb6822c1004102bbdd6f28a34cfe18_9366/Ultraboost_5X_TR_Shoes_Green_IG9354_15_hover_standard.jpg",
    category: "Running",
    brand: "Adidas",
    isNew: true,
    isFeatured: true,
    sizes: [
      { id: 1, size: "6", available: false },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" },
      { id: 3, colorName: "gray", hexCode: "#808080" }
    ],
    description: "La evolución del running con tecnología Boost para una respuesta energética incomparable."
  },
  {
    id: 3,
    name: "Under Armour HOVR Phantom 3",
    price: 99.99,
    originalPrice: 119.99,
    rating: 4.3,
    reviewCount: 189,
    imageUrl: "/api/placeholder/400/400",
    category: "Running",
    brand: "Under Armour",
    isOnSale: true,
    isFeatured: true,
    sizes: [
      { id: 1, size: "7", available: true },
      { id: 2, size: "8", available: true },
      { id: 3, size: "9", available: false },
      { id: 4, size: "10", available: true },
      { id: 5, size: "11", available: true },
      { id: 6, size: "12", available: false }
    ],
    colors: [
      { id: 1, colorName: "red", hexCode: "#FF0000" },
      { id: 2, colorName: "blue", hexCode: "#0066CC" },
      { id: 3, colorName: "black", hexCode: "#000000" }
    ],
    description: "Tecnología HOVR que proporciona retorno de energía y elimina el impacto."
  },
  {
    id: 4,
    name: "Puma RS-X Reinvention",
    price: 79.99,
    rating: 4.1,
    reviewCount: 145,
    imageUrl: "/api/placeholder/400/400",
    category: "Lifestyle",
    brand: "Puma",
    isNew: true,
    isFeatured: true,
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: false },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true }
    ],
    colors: [
      { id: 1, colorName: "yellow", hexCode: "#FFD700" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "white", hexCode: "#FFFFFF" }
    ],
    description: "Diseño retro-futurista que combina style y funcionalidad para uso diario."
  },
  {
    id: 5,
    name: "Nike Dri-FIT Running Shirt",
    price: 24.99,
    rating: 4.2,
    reviewCount: 89,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f7d3399f-1e78-4b7c-8fcf-6a0ca8a1c74d/M+NK+DF+FLEX+REP+SS+TOP.png",
    category: "Ropa",
    brand: "Nike",
    sizes: [
      { id: 1, size: "S", available: true },
      { id: 2, size: "M", available: true },
      { id: 3, size: "L", available: false },
      { id: 4, size: "XL", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" },
      { id: 3, colorName: "blue", hexCode: "#0066CC" }
    ]
  },
  {
    id: 6,
    name: "Adidas Predator Edge.1 FG",
    price: 199.99,
    originalPrice: 229.99,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f2499ebfa8264aa38a615c98ce97f984_9366/Predator_Elite_Fold-Over_Tongue_Firm_Ground_Cleats_White_JI1095_HM1.jpg",
    category: "Fútbol",
    brand: "Adidas",
    isOnSale: true,
    sizes: [
      { id: 1, size: "6", available: false },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: false },
      { id: 6, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" }
    ]
  },
  {
    id: 7,
    name: "Wilson NBA Official Basketball",
    price: 29.99,
    rating: 4.6,
    reviewCount: 234,
    imageUrl: "/api/placeholder/400/400",
    category: "Basquetbol",
    brand: "Wilson",
    colors: [
      { id: 1, colorName: "orange", hexCode: "#FF8C00" }
    ]
  },
  {
    id: 8,
    name: "Reebok CrossFit Nano X2",
    price: 119.99,
    rating: 4.4,
    reviewCount: 178,
    imageUrl: "/api/placeholder/400/400",
    category: "Fitness",
    brand: "Reebok",
    isNew: true,
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: false },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" },
      { id: 3, colorName: "red", hexCode: "#FF0000" }
    ]
  },
  {
    id: 9,
    name: "New Balance Fresh Foam X",
    price: 149.99,
    rating: 4.3,
    reviewCount: 267,
    imageUrl: "https://nb.scene7.com/is/image/NB/m990gl6_nb_05_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "Running",
    brand: "New Balance",
    sizes: [
      { id: 1, size: "7", available: true },
      { id: 2, size: "8", available: false },
      { id: 3, size: "9", available: true },
      { id: 4, size: "10", available: true },
      { id: 5, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "gray", hexCode: "#808080" },
      { id: 2, colorName: "blue", hexCode: "#0066CC" },
      { id: 3, colorName: "black", hexCode: "#000000" }
    ]
  },
  {
    id: 10,
    name: "Asics Gel-Kayano 29",
    price: 159.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviewCount: 312,
    imageUrl: "https://images.asics.com/is/image/asics/1011B440_002_SB_FR_GLB?$zoom$",
    category: "Running",
    brand: "Asics",
    isOnSale: true,
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: false },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: true },
      { id: 7, size: "12", available: false }
    ],
    colors: [
      { id: 1, colorName: "blue", hexCode: "#0066CC" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "white", hexCode: "#FFFFFF" }
    ]
  },
  {
    id: 11,
    name: "Converse Chuck Taylor All Star",
    price: 54.99,
    rating: 4.1,
    reviewCount: 445,
    imageUrl: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dwb612ddf8/images/e_08/M9160_E_08X1.jpg?sw=406",
    category: "Lifestyle",
    brand: "Converse",
    sizes: [
      { id: 1, size: "5", available: true },
      { id: 2, size: "6", available: true },
      { id: 3, size: "7", available: false },
      { id: 4, size: "8", available: true },
      { id: 5, size: "9", available: true },
      { id: 6, size: "10", available: false },
      { id: 7, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" },
      { id: 3, colorName: "red", hexCode: "#FF0000" },
      { id: 4, colorName: "blue", hexCode: "#0066CC" }
    ]
  },
  {
    id: 12,
    name: "Nike Pro Combat Shorts",
    price: 34.99,
    rating: 4.0,
    reviewCount: 123,
    imageUrl: "/api/placeholder/400/400",
    category: "Ropa",
    brand: "Nike",
    sizes: [
      { id: 1, size: "S", available: true },
      { id: 2, size: "M", available: true },
      { id: 3, size: "L", available: false },
      { id: 4, size: "XL", available: true },
      { id: 5, size: "XXL", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "gray", hexCode: "#808080" },
      { id: 3, colorName: "navy", hexCode: "#000080" }
    ]
  },
  {
    id: 13,
    name: "Puma Future Z 1.1 FG/AG",
    price: 169.99,
    rating: 4.2,
    reviewCount: 98,
    imageUrl: "/api/placeholder/400/400",
    category: "Fútbol",
    brand: "Puma",
    isNew: true,
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: false },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: false }
    ],
    colors: [
      { id: 1, colorName: "blue", hexCode: "#0066CC" },
      { id: 2, colorName: "yellow", hexCode: "#FFD700" },
      { id: 3, colorName: "black", hexCode: "#000000" }
    ]
  },
  {
    id: 14,
    name: "Under Armour HeatGear Polo",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.3,
    reviewCount: 167,
    imageUrl: "/api/placeholder/400/400",
    category: "Ropa",
    brand: "Under Armour",
    isOnSale: true,
    sizes: [
      { id: 1, size: "S", available: true },
      { id: 2, size: "M", available: false },
      { id: 3, size: "L", available: true },
      { id: 4, size: "XL", available: true }
    ],
    colors: [
      { id: 1, colorName: "white", hexCode: "#FFFFFF" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "navy", hexCode: "#000080" },
      { id: 4, colorName: "red", hexCode: "#FF0000" }
    ]
  },
  {
    id: 15,
    name: "Adidas Tiro 21 Training Pants",
    price: 49.99,
    rating: 4.4,
    reviewCount: 203,
    imageUrl: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/98e90ef91aff468b91d363d2366c7279_9366/Tiro_24_Training_Pants_Black_IV7269_21_model.jpg",
    category: "Ropa",
    brand: "Adidas",
    sizes: [
      { id: 1, size: "S", available: true },
      { id: 2, size: "M", available: true },
      { id: 3, size: "L", available: true },
      { id: 4, size: "XL", available: false },
      { id: 5, size: "XXL", available: true }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "navy", hexCode: "#000080" },
      { id: 3, colorName: "gray", hexCode: "#808080" }
    ]
  },
  {
    id: 16,
    name: "Nike Air Jordan 1 Mid",
    price: 109.99,
    rating: 4.6,
    reviewCount: 389,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0c8cb64c-88d0-45a6-b95f-b3032d045ee9/WMNS+AIR+JORDAN+1+MID.png",
    category: "Basquetbol",
    brand: "Nike",
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: false },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: true },
      { id: 7, size: "12", available: false }
    ],
    colors: [
      { id: 1, colorName: "black", hexCode: "#000000" },
      { id: 2, colorName: "white", hexCode: "#FFFFFF" },
      { id: 3, colorName: "red", hexCode: "#FF0000" }
    ]
  },
  {
    id: 17,
    name: "Reebok Classic Leather",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.2,
    reviewCount: 234,
    imageUrl: "/api/placeholder/400/400",
    category: "Lifestyle",
    brand: "Reebok",
    isOnSale: true,
    sizes: [
      { id: 1, size: "6", available: false },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: false },
      { id: 6, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "white", hexCode: "#FFFFFF" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "brown", hexCode: "#8B4513" }
    ]
  },
  {
    id: 18,
    name: "New Balance 990v5",
    price: 174.99,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "/api/placeholder/400/400",
    category: "Lifestyle",
    brand: "New Balance",
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: false },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: true },
      { id: 7, size: "12", available: true }
    ],
    colors: [
      { id: 1, colorName: "gray", hexCode: "#808080" },
      { id: 2, colorName: "navy", hexCode: "#000080" },
      { id: 3, colorName: "black", hexCode: "#000000" }
    ]
  },
  {
    id: 19,
    name: "Asics Gel-Nimbus 24",
    price: 149.99,
    rating: 4.5,
    reviewCount: 278,
    imageUrl: "https://images.asics.com/is/image/asics/1011B547_403_SB_FR_GLB?$zoom$",
    category: "Running",
    brand: "Asics",
    isNew: true,
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: false },
      { id: 3, size: "8", available: true },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: false }
    ],
    colors: [
      { id: 1, colorName: "blue", hexCode: "#0066CC" },
      { id: 2, colorName: "black", hexCode: "#000000" },
      { id: 3, colorName: "white", hexCode: "#FFFFFF" },
      { id: 4, colorName: "pink", hexCode: "#FFC0CB" }
    ]
  },
  {
    id: 20,
    name: "Puma Suede Classic",
    price: 69.99,
    rating: 4.3,
    reviewCount: 345,
    imageUrl: "/api/placeholder/400/400",
    category: "Lifestyle",
    brand: "Puma",
    sizes: [
      { id: 1, size: "6", available: true },
      { id: 2, size: "7", available: true },
      { id: 3, size: "8", available: false },
      { id: 4, size: "9", available: true },
      { id: 5, size: "10", available: true },
      { id: 6, size: "11", available: true }
    ],
    colors: [
      { id: 1, colorName: "blue", hexCode: "#0066CC" },
      { id: 2, colorName: "red", hexCode: "#FF0000" },
      { id: 3, colorName: "black", hexCode: "#000000" },
      { id: 4, colorName: "green", hexCode: "#008000" }
    ]
  }
];