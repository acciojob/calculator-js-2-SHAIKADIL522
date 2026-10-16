//your JS code here. If required.
const display = document.getElementById("display");
let justEvaluated = false;

function calculate(expr) {
  // allow only digits, operators, brackets, dot, spaces
  if (!/^[\d+\-*/().\s]+$/.test(expr)) return "Error";
  try {
    const result = Function('"use strict"; return (' + expr + ")")();
    if (typeof result !== "number" || !isFinite(result)) return "Error";
    return String(parseFloat(result.toPrecision(12)));
  } catch (e) {
    return "Error";
  }
}

function append(value) {
  if (display.textContent === "Error") display.textContent = "";
  // after "=", a digit starts fresh; an operator continues the result
  if (justEvaluated && /[\d.(]/.test(value)) display.textContent = "";
  justEvaluated = false;
  display.textContent += value;
}

const keys = {
  0: "0", 1: "1", 2: "2", 3: "3", 4: "4",
  5: "5", 6: "6", 7: "7", 8: "8", 9: "9",
  ".": ".", "+": "plus", "-": "-", "*": "*", "/": "divi",
  "(": "op", ")": "cl",
};

for (const [value, id] of Object.entries(keys)) {
  document.getElementById(id).addEventListener("click", () => append(value));
}

document.getElementById("C").addEventListener("click", () => {
  display.textContent = "";
  justEvaluated = false;
});

document.getElementById("back").addEventListener("click", () => {
  if (display.textContent === "Error") display.textContent = "";
  else display.textContent = display.textContent.slice(0, -1);
  justEvaluated = false;
});

document.getElementById("equal").addEventListener("click", () => {
  if (!display.textContent) return;
  display.textContent = calculate(display.textContent);
  justEvaluated = true;
});