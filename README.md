# bank_metrix_dsa_project
BankMetrix – Smart Digital Banking System
​BankMetrix is a modern, responsive digital banking simulation platform. Built with a focus on clean UI/UX and functional financial logic, it allows users to manage accounts, simulate transfers, and track their financial health through a dynamic analytics dashboard.
​✨ Key Features
​📊 Dynamic Analytics Dashboard: Real-time tracking of total balances, deposits, and withdrawals with integrated Chart.js visual reporting.
​💳 Account Management: Create and manage Savings and Current accounts with unique Pakistani-centric demo IDs (ACC-PK-01).
​💸 Transaction Suite: Fully functional modules for Deposits, Withdrawals, and Peer-to-Peer Transfers with instant balance updates.
​🌓 Smart Dark Mode: A seamless transition between light and professional dark themes, preserving eye comfort.
​📱 Responsive UI: Designed with a "Mobile-First" philosophy, featuring a sleek glassmorphism dashboard and professional blue gradients.
​🛡️ Role-Based Simulation: Simulation of secure banking environments with clear status indicators.
​🛠️ Tech Stack
​Frontend: HTML5, CSS3 (Custom Variables, Flexbox, Grid)
​Icons: Lucide-Dev for consistent, modern iconography.
​Charts: Chart.js for financial data visualization.
​Logic: Vanilla JavaScript (ES6+) for state management and DOM manipulation.
​📸 Project Structure
BankMetrix/
├── index.html          # Main entry point (SPA Structure & Views)
├── style.css           # Global styles, Branding, & Dark Mode logic
├── script.js           # App State, Transaction Logic, & Chart Rendering
└── README.md           # Project documentation and setup guide

💡 How It Works
​The system utilizes a central state object in JavaScript to manage data without a backend:
​State Management: Tracks all accounts and transaction history locally.
​Navigation: A custom MapsTo function enables a Single Page Application (SPA) experience without page reloads.
​Validation: Built-in checks ensure users cannot withdraw more than their current balance or transfer to non-existent accounts.
​🎨 Design Highlights
​Professional Blue Gradient: Uses a signature linear-gradient(90deg, #2563eb, #3b82f6) for primary actions.
​Left-Aligned Content: Meticulously aligned headings (8% padding) to match professional banking standards.
​Financial Indicators: Green (#10b981) for deposits and Red (#ef4444) for withdrawals for clear visual communication.

​👨‍💻 Developed By      Ajwa Sarfraz
