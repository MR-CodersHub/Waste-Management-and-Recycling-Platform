/**
 * ReCycleHub - Lightweight Vanilla Canvas Chart Engine
 * Zero dependencies, high-DPI crisp rendering, light/dark aware
 */

const EcoCharts = {
  // Setup crisp high DPI canvas
  setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width: rect.width, height: rect.height };
  },

  isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  // 1. Bar Chart: Weekly Waste Collection (kg)
  renderBarChart(canvasId, labels, data, barColor = '#2E9870') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxVal = Math.max(...data) * 1.15 || 100;
    const textColor = this.isDark() ? '#8FA69B' : '#586B62';
    const gridColor = this.isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(23,77,58,0.08)';

    // Draw horizontal grid lines & labels
    const gridLines = 4;
    ctx.font = '11px Sora, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      const val = Math.round(maxVal - (maxVal / gridLines) * i);

      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(`${val}kg`, padding.left - 8, y);
    }

    // Draw bars
    const barWidth = Math.min(36, (chartWidth / data.length) * 0.55);
    const step = chartWidth / data.length;

    data.forEach((val, index) => {
      const barHeight = (val / maxVal) * chartHeight;
      const x = padding.left + step * index + (step - barWidth) / 2;
      const y = padding.top + chartHeight - barHeight;

      // Gradient bar fill
      const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
      grad.addColorStop(0, '#B6D957');
      grad.addColorStop(1, barColor);

      ctx.fillStyle = grad;
      // Rounded top bar
      const radius = 6;
      ctx.beginPath();
      ctx.moveTo(x, y + barHeight);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.closePath();
      ctx.fill();

      // Top value text
      ctx.fillStyle = textColor;
      ctx.font = 'bold 10px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}`, x + barWidth / 2, y - 8);

      // Bottom x label
      ctx.font = '11px Sora, sans-serif';
      ctx.fillText(labels[index], x + barWidth / 2, height - padding.bottom + 20);
    });
  },

  // 2. Donut Chart: Waste Streams breakdown
  renderDonutChart(canvasId, labels, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.62;

    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = -Math.PI / 2;

    data.forEach((val, idx) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = colors[idx] || '#2E9870';
      ctx.fill();

      startAngle = endAngle;
    });

    // Inner circle cutout with center text
    ctx.fillStyle = this.isDark() ? '#14241C' : '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 2, 0, 2 * Math.PI);
    ctx.fill();

    // Center metric
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.isDark() ? '#E3F1E8' : '#174D3A';
    ctx.font = 'bold 20px Sora, sans-serif';
    ctx.fillText(`${Math.round(total)} kg`, centerX, centerY - 8);

    ctx.fillStyle = this.isDark() ? '#8FA69B' : '#586B62';
    ctx.font = '11px Manrope, sans-serif';
    ctx.fillText('Total Diverted', centerX, centerY + 14);
  },

  // 3. Line Chart: Monthly CO2 Savings Trend
  renderLineChart(canvasId, labels, data, strokeColor = '#2E9870') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const padding = { top: 30, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxVal = Math.max(...data) * 1.2 || 100;
    const minVal = 0;
    const textColor = this.isDark() ? '#8FA69B' : '#586B62';
    const gridColor = this.isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(23,77,58,0.08)';

    // Grid lines
    const gridLines = 4;
    ctx.font = '11px Sora, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      const val = Math.round(maxVal - (maxVal / gridLines) * i);

      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(`${val}t`, padding.left - 8, y);
    }

    const step = chartWidth / (data.length - 1);
    const points = data.map((val, idx) => ({
      x: padding.left + step * idx,
      y: padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight
    }));

    // Area fill gradient
    const areaGrad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    areaGrad.addColorStop(0, 'rgba(46, 152, 112, 0.35)');
    areaGrad.addColorStop(1, 'rgba(46, 152, 112, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.lineTo(points[0].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Data points & bottom labels
    points.forEach((pt, idx) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#B6D957';
      ctx.fill();
      ctx.strokeStyle = '#174D3A';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = textColor;
      ctx.font = '11px Sora, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], pt.x, height - padding.bottom + 20);
    });
  }
};

window.EcoCharts = EcoCharts;

