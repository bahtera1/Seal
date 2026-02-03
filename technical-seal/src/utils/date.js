/**
 * Memformat tanggal ISO ke format Indonesia yang mudah dibaca
 * Contoh: "Senin, 10 Mei 2024 14:30"
 */
export const formatDate = (isoString) => {
    if (!isoString) return '';

    try {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return isoString;
        }

        // Format: "Senin, 10 Mei 2024"
        const datePart = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);

        // Format: "14:30" (WIB automatis ikut timezone user)
        const timePart = new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);

        return `${datePart} ${timePart.replace('.', ':')}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return isoString;
    }
};
