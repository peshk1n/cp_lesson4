import { MiniMaple } from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    const mm = new MiniMaple();

    document.getElementById('diffButton').onclick = () => {
        const expr = document.getElementById('expr').value;
        const variable = document.getElementById('variable').value;
        const resultDiv = document.getElementById('result');

        try {
            const result = mm.diff(expr, variable);
            resultDiv.textContent = `d(${expr})/d${variable} = ${result}`;
        } catch (error) {
            alert(`Ошибка: ${error.message}`);
        }
    };
}
