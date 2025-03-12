const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

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

    drawOnCanvas(data, trajectoryColor);
    console.log("Час польоту:", tFlight.toFixed(2), "с");
}

function drawOnCanvas(data, color) {
    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    const xMax = Math.max(...data.map(d => d.x));
    const yMax = Math.max(...data.map(d => d.y));
    
    const xScale = width / xMax;
    const yScale = height / yMax;
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    data.forEach((point, index) => {
        const x = padding + point.x * xScale;
        const y = canvas.height - (padding + point.y * yScale);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
}

function clearChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
