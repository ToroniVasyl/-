function drawTrajectory() {
   const x0 = parseFloat(document.getElementById('x0').value);
   const y0 = parseFloat(document.getElementById('y0').value);
   const angleDeg = parseFloat(document.getElementById('angle').value);
   const v0 = parseFloat(document.getElementById('v0').value);
   const a = parseFloat(document.getElementById('acceleration').value);
   const trajectoryColor = document.getElementById('trajectoryColor').value;
   const angle = angleDeg * Math.PI / 180;
 
   const discriminant = Math.pow(v0 * Math.sin(angle), 2) + 2 * a * y0;
   let tFlight = (v0 * Math.sin(angle) + Math.sqrt(discriminant)) / a;
   if (tFlight < 0) tFlight = 0;
 
   const numPoints = 100;
   const data = [];
   for (let i = 0; i <= numPoints; i++) {
     const t = tFlight * i / numPoints;
     const x = x0 + v0 * Math.cos(angle) * t;
     const y = y0 + v0 * Math.sin(angle) * t - 0.5 * a * t * t;
     data.push({ x, y });
   }
 
   const margin = { top: 20, right: 30, bottom: 40, left: 50 };
   const width = 800 - margin.left - margin.right;
   const height = 400 - margin.top - margin.bottom;
 
   let svg = d3.select("#chart").select("svg");
   
   if (svg.empty()) {
     svg = d3.select("#chart")
       .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", `translate(${margin.left},${margin.top})`);
 
     const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, width]);
     const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height, 0]);
 
     svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(xScale));
 
     svg.append("g")
       .call(d3.axisLeft(yScale));
   } else {
     svg = d3.select("#chart").select("svg").select("g");
   }
 
   const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, width]);
   const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height, 0]);
 
   const lineGenerator = d3.line()
     .x(d => xScale(d.x))
     .y(d => yScale(d.y));
 
   svg.append("path")
     .datum(data)
     .attr("d", lineGenerator)
     .attr("fill", "none")
     .attr("stroke", trajectoryColor)
     .attr("stroke-width", 2);
 
   console.log("Час польоту:", tFlight.toFixed(2), "с");
 }
 
 function clearChart() {
   d3.select("#chart").select("svg").selectAll("path").remove();
 }
 