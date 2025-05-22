# 💿 Disk Scheduling Visualizer

**Disk Scheduling Visualizer** is a web-based tool that helps users understand how various disk scheduling algorithms work by simulating and visualizing their behavior step by step. It’s a great educational tool for students learning Operating Systems.

---

## 📖 Project Overview

This project allows users to **input disk requests** and choose from multiple scheduling algorithms to observe how the disk head moves and calculates seek time for each algorithm.

The visualizer provides both **step-wise breakdown** and **final result summaries** for better understanding.

---

## 🚦 Supported Algorithms

- **FCFS (First-Come First-Served)**  
  Processes requests in the order they arrive.

- **SSTF (Shortest Seek Time First)**  
  Selects the request closest to the current head position.

- **SCAN (Elevator Algorithm)**  
  Moves in one direction servicing requests, then reverses.

- **LOOK**  
  Similar to SCAN, but only goes as far as the last request before reversing.

- **C-SCAN (Circular SCAN)**  
  Services requests in one direction, jumps to the beginning, and continues.

- **C-LOOK**  
  Like C-SCAN but only jumps to the lowest request rather than full start.

---

## ✨ Key Features

- Intuitive input of disk queue and head position  
- Visual simulation of each algorithm’s head movement  
- Calculates total and average seek time  
- Clear and animated output flow  
- Entirely client-side and runs in the browser

---

## 🛠 Technologies Used

- HTML, CSS, JavaScript  
- Interactive input and visualization logic in JS  
- No backend required — completely browser-based

---

## 📚 Learning Objective

This project was created to support hands-on learning of disk scheduling techniques—enabling users to compare algorithms, understand trade-offs, and see how head movements affect seek time. It’s perfect for classroom demonstrations, self-study, or OS lab assignments.

---

## 🙌 Final Note

Disk scheduling is a fundamental concept in Operating Systems, but it can be abstract when learned from books alone. With this visualizer, you can turn theory into something tangible like watching algorithms in action and gaining a deeper understanding of their behavior.

Explore, experiment, and enjoy the learning journey! 🎓💡
