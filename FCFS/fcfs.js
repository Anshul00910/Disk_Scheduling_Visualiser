document.addEventListener('DOMContentLoaded', function() {
  const visualizeBtn = document.getElementById('visualize-btn');
  const resultsSection = document.getElementById('results');
  const totalSeekTimeEl = document.getElementById('total-seek-time');
  const averageSeekTimeEl = document.getElementById('average-seek-time');
  const seekSequenceEl = document.getElementById('seek-sequence');
  const chartContainer = document.getElementById('chart-container');
  
  // Chart configuration
  let chart = new CanvasJS.Chart("chart-container", {
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: "transparent",
    title: {
      text: "FCFS Disk Scheduling Visualization",
      fontColor: "#00bcd4",
      fontSize: 20
    },
    axisX: {
      title: "Request Sequence",
      titleFontColor: "#ff4081",
      lineColor: "#4527a0",
      tickColor: "#4527a0",
      labelFontColor: "#f5f5f5"
    },
    axisY: {
      title: "Disk Position",
      titleFontColor: "#ff4081",
      lineColor: "#4527a0",
      tickColor: "#4527a0",
      labelFontColor: "#f5f5f5",
      maximum: 200,
      minimum: 0
    },
    data: [{
      type: "line",
      indexLabelFontColor: "#f5f5f5",
      lineColor: "#00bcd4",
      markerColor: "#ff4081",
      markerSize: 10,
      dataPoints: []
    }]
  });
  window.addEventListener("resize", function () {
chart.render(); // Re-render chart on window resize
});

  visualizeBtn.addEventListener('click', function() {
    // Get inputs
    const sequenceInput = document.getElementById('sequence').value;
    const headInput = document.getElementById('head').value;
    
    if (!sequenceInput || !headInput) {
      alert("Please enter both the request sequence and initial head position.");
      return;
    }
    
    // Parse input values
    const requestSequence = sequenceInput.split(',').map(num => parseInt(num.trim()));
    const initialHead = parseInt(headInput);
    
    // Check if values are valid
    if (isNaN(initialHead) || initialHead < 0 || initialHead > 199) {
      alert("Initial head position must be between 0 and 199.");
      return;
    }
    
    if (requestSequence.some(isNaN) || requestSequence.some(num => num < 0 || num > 199)) {
      alert("All request positions must be between 0 and 199.");
      return;
    }
    
    // Calculate FCFS algorithm results
    const results = calculateFCFS(requestSequence, initialHead);
    
    // Update results section
    totalSeekTimeEl.textContent = results.totalSeekTime;
    averageSeekTimeEl.textContent = (results.totalSeekTime / requestSequence.length).toFixed(2);
    seekSequenceEl.textContent = results.seekSequence.join(' → ');
    
    // Update chart
    chart.options.data[0].dataPoints = results.chartData;
    chart.render();
    
    // Show results section
    resultsSection.style.display = 'block';
  });
  
  // Calculate FCFS algorithm
  function calculateFCFS(requestSequence, initialHead) {
    let totalSeekTime = 0;
    let currentPosition = initialHead;
    let seekSequence = [initialHead];
    let chartData = [{ x: 0, y: initialHead, indexLabel: "Head" }];
    
    // Process each request in the order they arrived
    for (let i = 0; i < requestSequence.length; i++) {
      const nextPosition = requestSequence[i];
      const seekDistance = Math.abs(nextPosition - currentPosition);
      
      totalSeekTime += seekDistance;
      currentPosition = nextPosition;
      seekSequence.push(nextPosition);
      
      chartData.push({
        x: i + 1,
        y: nextPosition,
        indexLabel: nextPosition.toString()
      });
    }
    
    return {
      totalSeekTime,
      seekSequence,
      chartData
    };
  }
});