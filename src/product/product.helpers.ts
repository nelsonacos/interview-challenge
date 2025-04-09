
import he from 'he'

export const normalizeTitle = (text: string) => {
    return he.decode(text)
        .replace(/\s*;\s*/g, ", ")
        .replace(/,(\S)/g, ", $1")
        .replace(/\s*-\s*$/, "");
}

export function normalizePrice(value: string | number): number {
    const num = typeof value === 'string' ? Number(value) : value;
  
    if (Number.isNaN(num)) return 0;
  
    return roundTo(num, 2);
}

const  roundTo = (n: number, digits = 2): number => {
    return Number(Math.round(Number(n + 'e' + digits)) + 'e-' + digits);
}

export const formatPrice = (price: string | number, currency: string = "ARS", locale: string = "es-AR"): string => {
    const normalizedPrice = normalizePrice(price);
    return Number(normalizedPrice).toLocaleString(locale, {
        style: "currency",
        currency: currency,
    });
};