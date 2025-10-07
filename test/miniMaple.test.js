import {MiniMaple} from "../src/miniMaple";

describe('MiniMaple differentiation', () => {
    const mm = new MiniMaple();

    test('diff constant', () => {
        expect(mm.diff('5', 'x')).toBe('0');
        expect(mm.diff('0', 'x')).toBe('0');
        expect(mm.diff('-12', 'x')).toBe('0');
        expect(mm.diff('333', 'x')).toBe('0');
    });

    test('diff constant expressions', () => {
        expect(mm.diff('2^2', 'x')).toBe('0');
        expect(mm.diff('2 + 2', 'x')).toBe('0');
        expect(mm.diff('-2 + 2', 'x')).toBe('0');
        expect(mm.diff('2 + 2 - x^2', 'x')).toBe('-2*x');
    });

    test('diff variable', () => {
        expect(mm.diff('x', 'x')).toBe('1');
        expect(mm.diff('-x', 'x')).toBe('-1');
        expect(mm.diff('z', 'z')).toBe('1');
        expect(mm.diff('-y', 'y')).toBe('-1');
    });

    test('diff other variable', () => {
        expect(mm.diff('y', 'x')).toBe('0');
        expect(mm.diff('x', 'z')).toBe('0');
        expect(mm.diff('x + 5', 'z')).toBe('0');
        expect(mm.diff('2 - 2*x + 3', 'y')).toBe('0');
    });

    test('diff constants', () => {
        expect(mm.diff('5 + 7', 'x')).toBe('0');
        expect(mm.diff('-1', 'y')).toBe('0');
        expect(mm.diff('-6 - 2', 'x')).toBe('0');
    });

    test('diff with different variable', () => {
        expect(mm.diff('x^2 + y^2', 'x')).toBe('2*x');
        expect(mm.diff('x^2 + y^2', 'y')).toBe('2*y');
        expect(mm.diff('-x^5 + z', 'z')).toBe('1');
    });

    test('diff power', () => {
        expect(mm.diff('4*x^3', 'x')).toBe('12*x^2');
        expect(mm.diff('x^2', 'x')).toBe('2*x');
        expect(mm.diff('x^3', 'x')).toBe('3*x^2');
        expect(mm.diff('-x^2', 'x')).toBe('-2*x');
        expect(mm.diff('x^1', 'x')).toBe('1');
    });

    test('diff sum and difference', () => {
        expect(mm.diff('4*x^3 - x^2', 'x')).toBe('12*x^2 - 2*x');
        expect(mm.diff('3*x^4 - 2*x^3 + x - 7', 'x')).toBe('12*x^3 - 6*x^2 + 1');
        expect(mm.diff('x^2 + 5*x - 3', 'x')).toBe('2*x + 5');
        expect(mm.diff('2*x^3 + 3*x^2 - x + 10', 'x')).toBe('6*x^2 + 6*x - 1');
        expect(mm.diff('x^5 - x^4 + x^3 - x^2 + x - 1', 'x')).toBe('5*x^4 - 4*x^3 + 3*x^2 - 2*x + 1');
    });

    test('diff negative coefficients', () => {
        expect(mm.diff('-3*x^4', 'x')).toBe('-12*x^3');
        expect(mm.diff('-x', 'x')).toBe('-1');
        expect(mm.diff('-2*x^3 - 5*x^2 + x - 7', 'x')).toBe('-6*x^2 - 10*x + 1');
        expect(mm.diff('-x^5 + x^3 - x + 4', 'x')).toBe('-5*x^4 + 3*x^2 - 1');
        expect(mm.diff('-7*x + 10', 'x')).toBe('-7');
    });

    test('invalid expression throws', () => {
        expect(() => mm.diff('x**2', 'x')).toThrow();
        expect(() => mm.diff('x*', 'x')).toThrow();
        expect(() => mm.diff('-', 'x')).toThrow();
        expect(() => mm.diff('*', 'x')).toThrow();
        expect(() => mm.diff('^', 'x')).toThrow();
        expect(() => mm.diff('$', 'x')).toThrow();
        expect(() => mm.diff('/3788ag', 'x')).toThrow();
        expect(() => mm.diff('-2^x', 'x')).toThrow();
        expect(() => mm.diff('3^x', 'x')).toThrow();
        expect(() => mm.diff('x-', 'x')).toThrow();
        expect(() => mm.diff('x+', 'x')).toThrow();
        expect(() => mm.diff('', 'x')).toThrow();
        expect(() => mm.diff('3x^-2', 'x')).toThrow();
    });
});
