
import he from 'he'

export const normalizeTitle = (text: string) => {
    return he.decode(text)
        .replace(/\s*;\s*/g, ", ")
        .replace(/,(\S)/g, ", $1")
        .replace(/\s*-\s*$/, "");
}

export const normalizePrice = (price: string | number) => {
    const parsedPrice = parseFloat(price.toString());
    return isNaN(parsedPrice) ? 0 : Number(parsedPrice.toFixed(2));
}

export const formatPrice = (price: string | number, currency: string = "ARS", locale: string = "es-AR"): string => {
    const normalizedPrice = normalizePrice(price);
    return Number(normalizedPrice).toLocaleString(locale, {
        style: "currency",
        currency: currency,
    });
};