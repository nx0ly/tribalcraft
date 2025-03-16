export default function getDistance(a: [number, number], b: [number, number]): number {
    return Math.hypot(b[1] - a[1], b[0] - a[0]);
}