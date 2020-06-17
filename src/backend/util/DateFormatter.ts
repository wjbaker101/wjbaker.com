export const DateFormatter = {

    fullDateTime(date: Date): string {
        return `${date.getFullYear()}-${this.padded(date.getMonth() + 1, 2)}-${this.padded(date.getDate(), 2)} @ ${this.padded(date.getHours(), 2)}:${this.padded(date.getMinutes(), 2)}:${this.padded(date.getSeconds(), 2)}.${this.padded(date.getMilliseconds(), 3)}`;
    },

    padded(n: number, size: number): string {
        const s = String(n);

        return Array(Math.max(0, size - s.length))
                .fill('0')
                .concat(s.split(''))
                .join('');
    },
}
