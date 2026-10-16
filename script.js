const display = document.getElementById('display');
let justEvaluated = false;

function calculate(expr) {
  if (!/^[\d+\-*/().\s]+$/.test(expr)) return 'Error';
  try {
    const result = Function('"use strict"; return (' + expr + ')')();
    if (typeof result !== 'number' || !isFinite(result)) return 'Error';
    return String(parseFloat(result.toPrecision(12)));
  } catch (e) {
    return 'Error';
  }
}

function append(value) {
  if (display.textContent === 'Error') display.textContent = '';
  if (justEvaluated && /[\d.(]/.test(value)) display.textContent = '';
  justEvaluated = false;
  display.textContent += value;
}

// operators and brackets: explicit id lookups
document.getElementById('plus').addEventListener('click', () => append('+'));
document.getElementById('-').addEventListener('click', () => append('-'));
document.getElementById('divi').addEventListener('click', () => append('/'));
document.getElementById('*').addEventListener('click', () => append('*'));
document.getElementById('op').addEventListener('click', () => append('('));
document.getElementById('cl').addEventListener('click', () => append(')'));
document.getElementById('.').addEventListener('click', () => append('.'));

// digits
for (let i = 0; i <= 9; i++) {
  document.getElementById(String(i)).addEventListener('click', () => append(String(i)));
}

document.getElementById('C').addEventListener('click', () => {
  display.textContent = '';
  justEvaluated = false;
});

document.getElementById('back').addEventListener('click', () => {
  if (display.textContent === 'Error') display.textContent = '';
  else display.textContent = display.textContent.slice(0, -1);
  justEvaluated = false;
});

document.getElementById('equal').addEventListener('click', () => {
  if (!display.textContent) return;
  display.textContent = calculate(display.textContent);
  justEvaluated = true;
});