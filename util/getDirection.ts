export default function getDirection(a: [number, number], b: [number, number]): number {
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
}