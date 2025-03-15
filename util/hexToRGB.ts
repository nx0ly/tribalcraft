export default function hexToRGB(hexcode: string): [number, number, number] {
    const hex = hexcode.replace(/^#/, '');

    const bigint = Number.parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}