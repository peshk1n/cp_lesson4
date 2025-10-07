class Term {
    constructor(coeff, variable, power) {
        this.coeff = coeff;
        this.variable = variable;
        this.power = power;
    }

    diff(variable) {
        if (!this.variable || this.variable !== variable) 
            return new Term(0, undefined, 0);

        if (this.power === 1) 
            return new Term(this.coeff, undefined, 0);

        return new Term(this.coeff * this.power, this.variable, this.power - 1);
    }

    toString() {
        if (this.coeff === 0) return '0';

        let coeffStr = this.coeff;
        let varStr = '';
        if (this.variable) {
            varStr = this.variable;
            if (this.power !== 1) varStr += `^${this.power}`;

            if (this.coeff === 1) coeffStr = ''
            if (this.coeff === -1) coeffStr = '-'
        }
        const star = (this.variable && Math.abs(this.coeff) !== 1) ? '*' : '';
        return `${coeffStr}${star}${varStr}`;
    }
}


class MiniMaple {
    diff(terms, variable) {
        if (!/^[a-zA-Z]$/.test(variable))
            throw new Error('Invalid variable');

        return terms.map(t => t.diff(variable));
    }

    parsePoly(expr) {
        expr = expr.replace(/\s+/g, '');
        if (/[^0-9a-zA-Z+\-^*]/.test(expr) || /[-+*^]$/.test(expr)) 
            throw new Error('Invalid expression');

        const terms = expr.match(/[+-]?[a-zA-Z0-9^*]+/g);
        if (!terms) 
            throw new Error('Invalid expression');

        const result = [];

        for (const term of terms) {
            const match = term.match(/^([+-]?(?:\d+)?)(?:\*?([a-zA-Z]?)(?:\^(-?\d+))?)?$/);
            if (!match) 
                throw new Error(`Invalid term: ${term}`);

            let [, coeff, variable, power] = match;

            if (coeff === '' || coeff === '+') 
                coeff = 1;
            else if (coeff === '-') 
                coeff = -1;
            else 
                coeff = Number(coeff);

            
            if (power !== undefined)
                power = Number(power);
            else
                power = variable ? 1 : 0;

            result.push(new Term(coeff, variable, power));
        }

        return result;
    }

    toString(terms) {
        terms = terms.filter(t => t.coeff !== 0);
        if (terms.length === 0) 
             return '0';

        const resSrt = terms.map((t, i) => {
            const str = t.toString();
            return i === 0 ? str : (str.startsWith('-') ? '- ' + str.slice(1) : '+ ' + str);
        }).join(' ');

        return resSrt;
    }
}

export {MiniMaple, Term}