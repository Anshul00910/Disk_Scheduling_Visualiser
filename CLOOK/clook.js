document.addEventListener('DOMContentLoaded', function () {
    const visualizeBtn = document.getElementById('visualize-btn');
    const resultsSection = document.getElementById('results');
    const totalSeekTimeEl = document.getElementById('total-seek-time');
    const averageSeekTimeEl = document.getElementById('average-seek-time');
    const seekSequenceEl = document.getElementById('seek-sequence');
    const chartContainer = document.getElementById('chart-container');
    const directionSelect = document.getElementById('direction');
  
    let chart = new CanvasJS.Chart("chart-container", {
      animationEnabled: true,
      theme: "dark2",
      backgroundColor: "transparent",
      title: {
        text: "C-LOOK Disk Scheduling Visualization",
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
      chart.render();
    });
  
    visualizeBtn.addEventListener('click', function () {
        const sequenceInput = document.getElementById('sequence').value;
        const headInput = document.getElementById('head').value;
        const direction = directionSelect.value;
      
        if (!sequenceInput || !headInput) {
          alert("Please enter both the request sequence and initial head position.");
          return;
        }
      
        const requestSequence = sequenceInput.split(',').map(num => parseInt(num.trim()));
        const initialHead = parseInt(headInput);
      
        if (isNaN(initialHead) || initialHead < 0 || initialHead > 199) {
          alert("Initial head position must be between 0 and 199.");
          return;
        }
      
        if (requestSequence.some(isNaN) || requestSequence.some(num => num < 0 || num > 199)) {
          alert("All request positions must be between 0 and 199.");
          return;
        }
      
        const results = calculateCLOOK(requestSequence, initialHead, direction);
      
        totalSeekTimeEl.textContent = results.totalSeekTime;
        // Update to calculate based on the actual number of requests
        averageSeekTimeEl.textContent = (results.totalSeekTime / (requestSequence.length)).toFixed(2);
        seekSequenceEl.textContent = results.seekSequence.join(' → ');
      
        chart.options.data[0].dataPoints = results.chartData;
        chart.render();
      
        resultsSection.style.display = 'block';
      });
      
  
    function calculateCLOOK(requests, head, direction) {
      let totalSeekTime = 0;
      let seekSequence = [head];
      let chartData = [{ x: 0, y: head, indexLabel: "Head" }];
      let left = [], right = [];
  
      for (let i = 0; i < requests.length; i++) {
        if (requests[i] < head) left.push(requests[i]);
        else right.push(requests[i]);
      }
  
      left.sort((a, b) => a - b);
      right.sort((a, b) => a - b);
  
      let fullSequence = [];
  
      if (direction === "right") {
        fullSequence = right.concat(left);
      } else {
        fullSequence = left.reverse().concat(right.reverse());
      }
  
      let currentPosition = head;
      for (let i = 0; i < fullSequence.length; i++) {
        const pos = fullSequence[i];
        totalSeekTime += Math.abs(pos - currentPosition);
        currentPosition = pos;
        seekSequence.push(pos);
        chartData.push({ x: i + 1, y: pos, indexLabel: pos.toString() });
  
        if (i === right.length - 1 && direction === "right" && left.length > 0) {
          // simulate jump to beginning (no seek time added)
          currentPosition = left[0];
          chartData.push({ x: i + 2, y: currentPosition, indexLabel: currentPosition.toString() });
        }
  
        if (i === left.length - 1 && direction === "left" && right.length > 0) {
          // simulate jump to end (no seek time added)
          currentPosition = right[right.length - 1];
          chartData.push({ x: i + 2, y: currentPosition, indexLabel: currentPosition.toString() });
        }
      }
  
      return {
        totalSeekTime,
        seekSequence,
        chartData
      };
    }
  });
  