export interface Products {
    recommendations: Recommendation[];
    categories:      Category[];
    products:        Product[];
}

export interface Category {
    id:   Name
    name: string;
}

export enum Name {
    Aguas = "aguas",
    Cervezas = "cervezas",
    Gaseosas = "gaseosas",
    MasVendidos = "mas vendidos",
    Vinos = "vinos",
}

export interface Product {
    product_id:          string;
    variant_id:          string;
    total_price:         string;
    price_per_unit:      string;
    list_price_id:       string;
    sku:                 string;
    categories?:         Name[];
    units_per_pack:      number;
    image_url:           string;
    handle:              string;
    compare_at_price:    string;
    allowed_packs:       number[];
    name:                string;
    description:         string;
    discount_percentage: number;
    size:                number;
    price_per_litre:     string;
}

export interface Recommendation {
    product_id:      string;
    recommendations: string[];
}