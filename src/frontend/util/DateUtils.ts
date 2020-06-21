const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const months = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December',
];

export const DateUtils = {

    fullDateTime(date: Date): string {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const hours = this.padded(date.getHours(), 2);
        const minutes = this.padded(date.getMinutes(), 2);

        return `${month} ${day}${this.ordinal(day)} ${year} @ ${hours}:${minutes}`;
    },

    midFormat(date: Date): string {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}${this.ordinal(day)} ${year}`;
    },

    dateTimeVariableYear(date: Date): string {
        const now = new Date();

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const displayYear = now.getFullYear() === year ? '' : ` ${year}`;

        return `${day}${this.ordinal(day)} ${month}${displayYear}`;
    },

    ordinal(n: number): string {
        const ords = ['th', 'st', 'nd', 'rd'];
        return n > 0 ? ords[(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '';
    },

    padded(n: number, size: number): string {
        const s = String(n);

        return Array(Math.max(0, size - s.length))
                .fill('0')
                .concat(s.split(''))
                .join('');
    },
}
