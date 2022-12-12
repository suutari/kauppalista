const dateFormat = new Intl.DateTimeFormat('fi-FI', {
    dateStyle: 'short',
    timeStyle: 'short',
});

export function formatDateString(value: string): string {
    return formatDate(new Date(value));
}

export function formatDate(date: Date): string {
    return dateFormat.format(date);
}
