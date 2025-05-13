const weights = [6, 8, 7, 1, 10, 9, 5, 3, 2];
const values  = [3, 7, 13, 4, 11, 13, 8, 10, 9];
const capacity = 19;
const n = weights.length;

// Таблиця DP
const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

// HTML-таблиця
const table = document.createElement("table");
const tableContainer = document.getElementById("table-container");

// Створення порожньої HTML-таблиці
function initTable() {
  const header = table.insertRow();
  header.insertCell().innerText = "i/w";
  for (let w = 0; w <= capacity; w++) {
    header.insertCell().innerText = w;
  }

  for (let i = 0; i <= n; i++) {
    const row = table.insertRow();
    row.insertCell().innerText = i;
    for (let w = 0; w <= capacity; w++) {
      const cell = row.insertCell();
      cell.innerText = "0";
      cell.id = `cell-${i}-${w}`;
    }
  }

  tableContainer.appendChild(table);
}

// Анімаційне заповнення таблиці DP
async function fillDPWithAnimation() {
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const currentCell = document.getElementById(`cell-${i}-${w}`);
      currentCell.classList.add("highlight");

      await new Promise(resolve => setTimeout(resolve, 50)); // пауза

      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }

      currentCell.innerText = dp[i][w];

      // Зняти підсвітку
      setTimeout(() => currentCell.classList.remove("highlight"), 150);
    }
  }
}

// Відновлення оптимального рішення (які предмети взяті)
function getSelectedItems() {
  let w = capacity;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(i - 1); // предмет i взятий
      const cell = document.getElementById(`cell-${i}-${w}`);
      if (cell) cell.classList.add("chosen");
      w -= weights[i - 1];
    }
  }

  return selected.reverse();
}

// Виведення результату
function showResults() {
  const maxValue = dp[n][capacity];
  document.getElementById("result").innerHTML = `<h3>Максимальна цінність: ${maxValue}</h3>`;

  const selected = getSelectedItems();
  const list = selected.map(i => `Предмет ${i + 1} (вага: ${weights[i]}, цінність: ${values[i]})`).join("<br>");
  document.getElementById("selected-items").innerHTML = `<h3>Вибрані предмети:</h3><p>${list}</p>`;
}

// === Запуск ===
initTable();
fillDPWithAnimation().then(showResults);