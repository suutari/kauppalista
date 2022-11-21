export function tryParseInt(value: string | null | undefined): number | null {
    try {
        const result = parseInt(value ?? '') ?? null;
        return isNaN(result) ? null : result;
    } catch (e) { }
    return null;
}
