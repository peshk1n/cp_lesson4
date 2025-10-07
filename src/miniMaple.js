class MiniMaple {
    diff(expr, variable) {
        expr = expr.replace(/\s+/g, '');
        if (/[^0-9a-zA-Z+\-^*]/.test(expr) || /[-+*^]$/.test(expr)) 
            throw new Error('Invalid expression');

        const terms = expr.match(/[+-]?[a-zA-Z0-9^*]+/g); 
        if (!terms) 
            throw new Error('Invalid expression');

        const results = terms.map(t => this.diffTerm(t, variable))
                        .filter(term => term !== '0'); 

        if (results.length === 0) 
            return '0';

        const result = results.map((term, i) => {
            if (i === 0) 
                return term;
            return term.startsWith('-') ? '- ' + term.slice(1) : '+ ' + term;
        }).join(' ');
        
        return result;
    }


    diffTerm(term, variable) {
        const match = term.match(/^([+-]?(?:\d+)?)(?:\*?([a-zA-Z]?)(?:\^(\d+))?)?$/);
        if (!match) 
            throw new Error(`Invalid term: ${term}`);

        let [, coeff, variableName, power] = match;

        if(coeff === '' || coeff === '+')
            coeff = 1;
        else if(coeff == '-')
            coeff = -1;
        else
            coeff = Number(coeff);

        if (!variableName || variableName !== variable) 
            return '0';

        if (!power) 
            return String(coeff);

        const newCoeff = coeff * Number(power);
        const newPower = Number(power) - 1;

        if (newPower === 0) 
            return String(newCoeff);
        if (newPower === 1) 
            return `${newCoeff}*${variableName}`;

        return `${newCoeff}*${variableName}^${newPower}`;
    }
}

export {MiniMaple}