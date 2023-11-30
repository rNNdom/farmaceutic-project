export const formatDate = () => {
    const localDate = "es-419"
    const options = {
        weekday: 'long' as const, // o 'short' o 'narrow'
        year: 'numeric' as const, // o '2-digit'
        month: 'long' as const, // o 'short' o 'narrow' o '2-digit' o 'numeric'
        day: 'numeric' as const, // o '2-digit'
    }
    return { localDate, options }
};


export function formatMoney(number: number) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(number);
}


export const formatPhone = (phone: string) => {
    if (/^\9+?\d{8}$/.test(phone)) {
        return '+56' + phone;
    } else if (/^(569){1}\d{8}$/.test(phone)) {
        return '+' + phone;
    } else if (/^\d{8}$/.test(phone)) {
        return '+569' + phone;
    } else {
        return phone;
    }
};

export const formatStatus = (status: string) => {
    switch (status) {
        case 'PENDING':
            return 'Pendiente'
        case 'CANCELED':
            return 'Cancelado'
        case 'DELIVERING':
            return 'En reparto'
        case 'DELIVERED':
            return 'Entregado'
        default:
            return status
    }
}