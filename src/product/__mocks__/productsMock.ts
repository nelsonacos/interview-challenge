import { Product } from "@/types";

export const mockProducts: Product[] = [
    {
        product_id: "4854054682669",
        variant_id: "33619195002925",
        total_price: "912.00",
        price_per_unit: "152",
        list_price_id: "7",
        sku: "VINO-9991-6-6",
        categories: ["vinos", "mas vendidos"],
        units_per_pack: 6,
        image_url: "https://cdn.shopify.com/s/files/1/0257/2242/1293/products/SEC-Vinos-Novecento-Raices-Cabernet.jpg?v=1585767255",
        handle: "vino-novecento-raices-750-ml-tinto-cabernet-sauvignon",
        compare_at_price: "1140.00",
        allowed_packs: [1, 2, 3],
        name: "Vino Novecento Raices 750 ml - Tinto Cabernet Sauvignon",
        description: "Vino Novecento Raices 750 ml",
        discount_percentage: 20,
        size: 750,
        price_per_litre: "10",
    },
    {
        product_id: "4854054682670",
        variant_id: "33619195002926",
        total_price: "500.00",
        price_per_unit: "125",
        list_price_id: "8",
        sku: "CERVEZA-7777-4-4",
        categories: ["cervezas"],
        units_per_pack: 4,
        image_url: "https://cdn.shopify.com/s/files/1/0257/2242/1293/products/cerveza.jpg?v=1585767256",
        handle: "cerveza-artesanal-500-ml",
        compare_at_price: "600.00",
        allowed_packs: [1, 2],
        name: "Cerveza Artesanal 500 ml",
        description: "Cerveza artesanal premium",
        discount_percentage: 15,
        size: 500,
        price_per_litre: "25",
    }
];