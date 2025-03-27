function drawGrid() {
   const svg = d3.select("#canvas");
   const width = svg.attr("width");
   const height = svg.attr("height");
   const gridSize = 50;
   const metersPerGrid = 50;
   const labelOffset = 10;

   const centerX = width / 2;
   const centerY = height / 2;

   for (let x = -centerX; x <= centerX; x += gridSize) {
       svg.append("line")
           .attr("x1", centerX + x)
           .attr("y1", 0)
           .attr("x2", centerX + x)
           .attr("y2", height)
           .attr("stroke", "green")
           .attr("stroke-width", 0.5);

       if (x !== 0) {
           svg.append("text")
               .attr("x", centerX + x - labelOffset)
               .attr("y", centerY + labelOffset)
               .attr("fill", "black")
               .attr("font-size", "12px")
               .text(`${(x / gridSize * metersPerGrid).toFixed(0)}м`);
       }
   }

   for (let y = -centerY; y <= centerY; y += gridSize) {
       svg.append("line")
           .attr("x1", 0)
           .attr("y1", centerY - y)
           .attr("x2", width)
           .attr("y2", centerY - y)
           .attr("stroke", "green")
           .attr("stroke-width", 0.5);

       if (y !== 0) {
           svg.append("text")
               .attr("x", centerX + labelOffset)
               .attr("y", centerY - y + labelOffset)
               .attr("fill", "black")
               .attr("font-size", "12px")
               .text(`${(y / gridSize * metersPerGrid).toFixed(0)}м`);
       }
   }

   svg.append("line")
       .attr("x1", centerX)
       .attr("y1", 0)
       .attr("x2", centerX)
       .attr("y2", height)
       .attr("stroke", "black")
       .attr("stroke-width", 2);

   svg.append("line")
       .attr("x1", 0)
       .attr("y1", centerY)
       .attr("x2", width)
       .attr("y2", centerY)
       .attr("stroke", "black")
       .attr("stroke-width", 2);
}

function drawTrajectory() {
   const svg = d3.select("#canvas");
   const x0 = parseFloat(document.getElementById('x0').value);
   const y0 = parseFloat(document.getElementById('y0').value);
   const angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
   const velocity = parseFloat(document.getElementById('velocity').value);
   const lineColor = document.getElementById('lineColor').value;

   const width = svg.attr("width");
   const height = svg.attr("height");
   const centerX = width / 2;
   const centerY = height / 2;

   let t = 0, dt = 0.1;
   let endPointX = 0, endPointY = 0;
   let trajectoryData = [];

   while (true) {
       let x = x0 + velocity * Math.cos(angle) * t;
       let y = y0 + velocity * Math.sin(angle) * t;
       if (x > width || y > height) break;
       
       trajectoryData.push([centerX + x, centerY - y]);
       
       endPointX = x;
       endPointY = y;
       
       t += dt;
   }

   svg.append("path")
       .data([trajectoryData])
       .attr("fill", "none")
       .attr("stroke", lineColor)
       .attr("stroke-width", 2)
       .attr("d", d3.line());

   document.getElementById('endPoint').innerText = `Кінцева точка: (${endPointX.toFixed(2)}, ${endPointY.toFixed(2)}) м`;
}

function clearCanvas() {
   const svg = d3.select("#canvas");
   svg.selectAll("path").remove();
   document.getElementById('endPoint').innerText = "";
}

window.onload = function() {
   drawGrid();
};
