function drawGrid() {
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   const gridSize = 50; 
   const metersPerGrid = 50;
   const labelOffset = 15;

   ctx.clearRect(0, 0, canvas.width, canvas.height); 

   ctx.strokeStyle = "green";
   ctx.lineWidth = 0.5;

   const centerX = canvas.width / 2;
   const centerY = canvas.height / 2;

   ctx.fillStyle = "black";
   ctx.font = "12px Arial";

   for (let x = -centerX; x <= centerX; x += gridSize) {
       ctx.beginPath();
       ctx.moveTo(centerX + x, 0);
       ctx.lineTo(centerX + x, canvas.height);
       ctx.stroke();

       if (x !== 0) {
           let label = `${(x / gridSize * metersPerGrid).toFixed(0)}м`;
           ctx.fillText(label, centerX + x - labelOffset, centerY + labelOffset);
       }
   }
   for (let y = -centerY; y <= centerY; y += gridSize) {
       ctx.beginPath();
       ctx.moveTo(0, centerY - y);
       ctx.lineTo(canvas.width, centerY - y);
       ctx.stroke();

       if (y !== 0) {
           let label = `${(y / gridSize * metersPerGrid).toFixed(0)}м`;
           ctx.fillText(label, centerX + labelOffset, centerY - y + labelOffset);
       }
   }

   ctx.strokeStyle = "black";
   ctx.lineWidth = 2;
   ctx.beginPath();
   ctx.moveTo(centerX, 0);
   ctx.lineTo(centerX, canvas.height);
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(0, centerY);
   ctx.lineTo(canvas.width, centerY);
   ctx.stroke();
}

window.onload = function() {
   drawGrid();
};

function drawTrajectory() {
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   const x0 = parseFloat(document.getElementById('x0').value);
   const y0 = parseFloat(document.getElementById('y0').value);
   const angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
   const velocity = parseFloat(document.getElementById('velocity').value);
   const lineColor = document.getElementById('lineColor').value;

   ctx.strokeStyle = lineColor;
   ctx.lineWidth = 2;
   ctx.beginPath();
   ctx.moveTo(canvas.width / 2 + x0, canvas.height / 2 - y0);

   let t = 0, dt = 0.1;
   let maxHeight = y0;
   let endPointX = x0, endPointY = y0;

   while (true) {
       let x = x0 + velocity * Math.cos(angle) * t;
       let y = y0 + velocity * Math.sin(angle) * t;

       if (y > canvas.height / 2 || x > canvas.width / 2) break;

       ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);

       if (y > maxHeight) maxHeight = y;

       endPointX = x;
       endPointY = y;

       t += dt;
   }
   ctx.stroke();
   const resultDiv = document.getElementById('results');
   const newResult = document.createElement('p');
   newResult.innerText = `Траєкторія: Макс. висота = ${maxHeight.toFixed(2)} м, Кінцева точка = (${endPointX.toFixed(2)}, ${endPointY.toFixed(2)}) м`;
   newResult.style.color = lineColor;
   resultDiv.appendChild(newResult);
}

function clearCanvas() {
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawGrid();
   document.getElementById('results').innerHTML = ""; 
}

window.onload = function() {
   drawGrid();
};
