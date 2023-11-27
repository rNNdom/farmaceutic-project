export const DateOpctions = () => {
    const localDate = "es-419"
    const options = {
        weekday: 'long', // o 'short' o 'narrow'
        year: 'numeric', // o '2-digit'
        month: 'long', // o 'short' o 'narrow' o '2-digit' o 'numeric'
        day: 'numeric', // o '2-digit'
    }
    return { localDate, options }
};


export function formatMoney(number: number) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(number);
}

