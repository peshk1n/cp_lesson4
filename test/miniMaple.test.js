import {MiniMaple, Term} from "../src/miniMaple";

describe('MiniMaple differentiation', () => {
    const mm = new MiniMaple();

    test('diff constant', () => {
        let poly = mm.parsePoly('5');
        let result = mm.diff(poly, 'x');
        expect(result).toEqual([{ coeff: 0, variable: undefined, power: 0 }]); 

        poly = mm.parsePoly('-5');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([{ coeff: 0, variable: undefined, power: 0 }]);

        poly = mm.parsePoly('123');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([{ coeff: 0, variable: undefined, power: 0 }]);

        poly = mm.parsePoly('0');
        result = mm.diff(poly, 'y');
        expect(result).toEqual([{ coeff: 0, variable: undefined, power: 0 }]);
    });


    test('diff simple power', () => {
        let poly = mm.parsePoly('4*x^3');
        let result = mm.diff(poly, 'x');

        expect(result).toEqual([
            { coeff: 12, variable: 'x', power: 2 }
        ]);

        result = mm.diff(result, 'x');
        expect(result).toEqual([
            { coeff: 24, variable: 'x', power: 1 }
        ]);
    });


    test('diff negative coefficient', () => {
        let poly = mm.parsePoly('-3*x^4');
        let result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: -12, variable: 'x', power: 3 }
        ]);

        poly = mm.parsePoly('-3*x');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: -3, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('-2*x^2 - 2');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: -4, variable: 'x', power: 1 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);
    });


    test('diff sum and difference', () => {
        let poly = mm.parsePoly('x^2 + 3*x - 5');
        let result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: 2, variable: 'x', power: 1 },
            { coeff: 3, variable: undefined, power: 0 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('4*x^3 - x^2 + 7*x - 2');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: 12, variable: 'x', power: 2 },
            { coeff: -2, variable: 'x', power: 1 },
            { coeff: 7, variable: undefined, power: 0 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);
    });


    test('diff multiple variables', () => {
        let poly = mm.parsePoly('x^2 + y^2 + z');
        let resultX = mm.diff(poly, 'x');
        expect(resultX).toEqual([
            { coeff: 2, variable: 'x', power: 1 },
            { coeff: 0, variable: undefined, power: 0 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);

        let resultY = mm.diff(poly, 'y');
        expect(resultY).toEqual([
            { coeff: 0, variable: undefined, power: 0 },
            { coeff: 2, variable: 'y', power: 1 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);

        let resultZ = mm.diff(poly, 'z');
        expect(resultZ).toEqual([
            { coeff: 0, variable: undefined, power: 0 },
            { coeff: 0, variable: undefined, power: 0 },
            { coeff: 1, variable: undefined, power: 0 }
        ]);
    });


    test('diff constant expressions', () => {
        let poly = mm.parsePoly('7^2');
        let result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: 0, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('5 - 5');
        result = mm.diff(poly, 'x');
        expect(result).toEqual([
            { coeff: 0, variable: undefined, power: 0 },
            { coeff: 0, variable: undefined, power: 0 }
        ]);
    });


    test('invalid expression throws', () => {
        expect(() => mm.diff(mm.parsePoly('x**2'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x*'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('-'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('*'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('^'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('$'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('/3788ag'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('-2^x'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('3^x'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x-'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x+'), 'x')).toThrow();
        expect(() => mm.diff(mm.parsePoly(''), 'x')).toThrow();
    });


    test('invalid variable throws', () => {
        expect(() => mm.diff(mm.parsePoly('x'), '')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x'), '123')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x'), '-x')).toThrow();
        expect(() => mm.diff(mm.parsePoly('x'), '^')).toThrow();
    });
});


describe('MiniMaple toString', () => {
    const mm = new MiniMaple();

    test('toString simple polynomial', () => {
        let poly = [new Term(-5, undefined, 0)];
        let str = mm.toString(poly);
        expect(str).toBe('-5');

        poly = [new Term(2, 'x', 6)];
        str = mm.toString(poly);
        expect(str).toBe('2*x^6');

        poly = [new Term(2, 'x', 6), new Term(-7, 'x', 1)];
        str = mm.toString(poly);
        expect(str).toBe('2*x^6 - 7*x');
    });


    test('toString simple polynomial', () => {
        let poly = mm.parsePoly('3*x^2 + 2');
        let str = mm.toString(poly);
        expect(str).toBe('3*x^2 + 2');

        poly = mm.parsePoly('-2');
        str = mm.toString(poly);
        expect(str).toBe('-2');

        poly = mm.parsePoly('-7*x^2 - x + 5');
        str = mm.toString(poly);
        expect(str).toBe('-7*x^2 - x + 5');
    });


    test('toString removes zero terms', () => {
        const poly = mm.parsePoly('2*x + 0');
        const str = mm.toString(poly);
        expect(str).toBe('2*x');
    });


    test('toString empty polynomial', () => {
        const str = mm.toString([]);
        expect(str).toBe('0');
    });
});


describe('MiniMaple parsePoly', () => {
    const mm = new MiniMaple();
    test('parsePoly basic terms', () => {
        let poly = mm.parsePoly('3*x^2 + 2');

        expect(poly).toEqual([
            { coeff: 3, variable: 'x', power: 2 },
            { coeff: 2, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('-x^3 + 5*x - 7');
        expect(poly).toEqual([
            { coeff: -1, variable: 'x', power: 3 },
            { coeff: 5, variable: 'x', power: 1 },
            { coeff: -7, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('2*y^2 - 4*y + 1');
        expect(poly).toEqual([
            { coeff: 2, variable: 'y', power: 2 },
            { coeff: -4, variable: 'y', power: 1 },
            { coeff: 1, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('x');
        expect(poly).toEqual([
            { coeff: 1, variable: 'x', power: 1 }
        ]);

        poly = mm.parsePoly('-z');
        expect(poly).toEqual([
            { coeff: -1, variable: 'z', power: 1 }
        ]);
    });


    test('parse constants', () => {
        let poly = mm.parsePoly('7');
        expect(poly).toEqual([
            { coeff: 7, variable: undefined, power: 0 }
        ]);

        poly = mm.parsePoly('-3');
        expect(poly).toEqual([
            { coeff: -3, variable: undefined, power: 0 }
        ]);
    });
});