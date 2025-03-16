export function smooth(diff: number, power: number) {
    const p = diff * power;

    if (Math.abs(diff) < Math.abs(p)) {
        return diff;
    }

    return p;
}