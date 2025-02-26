import he from 'he'

export const normalizeTitle = (text: string) => {
    return he.decode(text)
        .replace(/\s*;\s*/g, ", ")
        .replace(/,(\S)/g, ", $1")
        .replace(/\s*-\s*$/, "");
}

export const normalizePrice = (price: string) => {
    return parseFloat(price).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}