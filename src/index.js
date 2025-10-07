import { MiniMaple } from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    const mm = new MiniMaple();

    document.getElementById('diffButton').onclick = () => {
        const expr = document.getElementById('expr').value;
        const variable = document.getElementById('variable').value;
        const resultDiv = document.getElementById('result');

        try {
            const poly = mm.parsePoly(expr);
            resultDiv.textContent = `d(${expr})/d${variable} = ${mm.toString(mm.diff(poly, variable))}`;
        } catch (error) {
            alert(`Ошибка: ${error.message}`);
        }
    };
}
