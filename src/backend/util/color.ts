export type RGBColorJSON = {
    type: 'rgb';
    r: number;
    g: number;
    b: number;
};

export type ColorJSON = RGBColorJSON;

export interface Color {
    json(): ColorJSON;
    equals(other: Color): boolean;
}

export class RGBColor implements Color {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;

    public constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public overlay(other: RGBColor, opacity: number): RGBColor {
        const r = Math.max(0, Math.min(255, Math.round(other.r * opacity + this.r * (1 - opacity))));
        const g = Math.max(0, Math.min(255, Math.round(other.g * opacity + this.g * (1 - opacity))));
        const b = Math.max(0, Math.min(255, Math.round(other.b * opacity + this.b * (1 - opacity))));
        return new RGBColor(r, g, b);
    }

    /** Combine the colours in an additive manner */
    public add(other: RGBColor): RGBColor {
        const r = Math.max(0, Math.min(255, Math.round((1 - (1 - this.r / 255) * (1 - other.r / 255)) * 255)));
        const g = Math.max(0, Math.min(255, Math.round((1 - (1 - this.g / 255) * (1 - other.g / 255)) * 255)));
        const b = Math.max(0, Math.min(255, Math.round((1 - (1 - this.b / 255) * (1 - other.b / 255)) * 255)));
        return new RGBColor(r, g, b);
    }

    /** Dim the color by a certain amount.
     * @param brightness a value between 0-1, where 0 dims the colour to black, and 1 keeps it at the current value
     */
    public dim(brightness: number) {
        brightness = Math.max(0, Math.min(1, brightness));
        return new RGBColor(this.r * brightness, this.g * brightness, this.b * brightness);
    }

    public transition(other: RGBColor, amount: number): RGBColor {
        return this.overlay(other, amount);
    }

    public toString() {
        return `RGBColor(${this.r}, ${this.g}, ${this.b})`;
    }

    public equals(other: Color): boolean {
        return (
            other instanceof RGBColor &&
            other.r === this.r &&
            other.g === this.g &&
            other.b === this.b
        );
    }

    public json(): RGBColorJSON {
        return {
            type: 'rgb', r: this.r, g: this.g, b: this.b
        };
    }

}

export const COLOR_RGB_WHITE = new RGBColor(255, 255, 255);
