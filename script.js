lucide.createIcons();

let state = {
    accounts: [
        // Adjusted balances to account for the demo withdrawals below
        { id: 'ACC-PK-01', name: 'Ahmad Hassan', balance: 65000, type: 'Savings' },
        { id: 'ACC-PK-02', name: 'Fatima Zahra', balance: 110500, type: 'Current' },
        { id: 'ACC-PK-03', name: 'Muhammad Bilal', balance: 45000, type: 'Savings' }
    ],
    transactions: [
        { type: 'Deposit', amount: 75000, acc: 'ACC-PK-01', date: '2026-03-01' },
        { type: 'Deposit', amount: 120500, acc: 'ACC-PK-02', date: '2026-03-02' },
        // Withdrawals are now correctly placed inside the transactions array
        { type: 'Withdrawal', amount: 10000, acc: 'ACC-PK-01', date: '2026-03-05' },
        { type: 'Withdrawal', amount: 10000, acc: 'ACC-PK-02', date: '2026-03-06' }
    ],
    currentView: 'home',
    activeForm: ''
};

function navigateTo(viewId) {
    state.currentView = viewId;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
    
    const navItem = document.getElementById(`nav-${viewId}`);
    if(navItem) navItem.classList.add('active');

    if (['create', 'deposit', 'withdraw', 'transfer'].includes(viewId)) {
        renderForm(viewId);
        document.getElementById('form-view').classList.add('active');
    } else if (viewId === 'accounts') {
        renderAccountTable();
        document.getElementById('accounts').classList.add('active');
    } else {
        document.getElementById(viewId).classList.add('active');
        if(viewId === 'dashboard') updateDashboard();
    }
}

function toggleDarkMode() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const icon = document.getElementById('theme-icon');
    icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    lucide.createIcons();
    if(state.currentView === 'dashboard') updateDashboard();
}

function renderForm(type) {
    state.activeForm = type;
    const header = document.getElementById('dynamic-header');
    const inputs = document.getElementById('form-inputs');
    const btn = document.getElementById('submit-btn');
    inputs.innerHTML = '';

    if(type === 'transfer') {
        header.innerHTML = `<i data-lucide="repeat"></i> Transfer Money`;
        header.className = 'form-header t-cyan';
        btn.style.background = 'linear-gradient(90deg, #06b6d4, #3b82f6)';
        inputs.innerHTML = `
            <div class="form-group"><label>Sender Account ID</label><input type="text" id="f-sid" placeholder="ACC-PK-01"></div>
            <div class="form-group"><label>Receiver Account ID</label><input type="text" id="f-rid" placeholder="ACC-PK-02"></div>
            <div class="form-group"><label>Amount (Rs.)</label><input type="number" id="f-amt" placeholder="0"></div>`;
    } else if(type === 'withdraw') {
        header.innerHTML = `<i data-lucide="minus-circle"></i> Withdraw Money`;
        header.className = 'form-header t-red';
        btn.style.background = '#ef4444'; // Exact Red Color
        inputs.innerHTML = `
            <div class="form-group"><label>Account ID</label><input type="text" id="f-id" placeholder="ACC-PK-01"></div>
            <div class="form-group"><label>Amount (Rs.)</label><input type="number" id="f-amt" placeholder="0"></div>`;
    } else if(type === 'create') {
        header.innerHTML = `<i data-lucide="user-plus"></i> Create Account`;
        header.className = 'form-header t-blue';
        btn.style.background = 'linear-gradient(90deg, #2563eb, #3b82f6)';
        inputs.innerHTML = `
            <div class="form-group"><label>Account ID</label><input type="text" id="f-id" placeholder="ACC-PK-04"></div>
            <div class="form-group"><label>Full Name</label><input type="text" id="f-name" placeholder="Ahmad Khan"></div>
            <div class="form-group"><label>Initial Deposit (Rs.)</label><input type="number" id="f-amt" value="0"></div>
            <div class="form-group"><label>Type</label><select id="f-type"><option>Savings</option><option>Current</option></select></div>`;
    } else if(type === 'deposit') {
        header.innerHTML = `<i data-lucide="arrow-down-circle"></i> Deposit Money`;
        header.className = 'form-header t-green';
        btn.style.background = '#10b981';
        inputs.innerHTML = `
            <div class="form-group"><label>Account ID</label><input type="text" id="f-id" placeholder="ACC-PK-01"></div>
            <div class="form-group"><label>Amount (Rs.)</label><input type="number" id="f-amt" placeholder="0"></div>`;
    }
    lucide.createIcons();
}

function processAction() {
    const amt = parseFloat(document.getElementById('f-amt')?.value || 0);
    if(state.activeForm === 'create') {
        const id = document.getElementById('f-id').value;
        const name = document.getElementById('f-name').value;
        const type = document.getElementById('f-type').value;
        state.accounts.push({ id, name, balance: amt, type });
        state.transactions.push({ type: 'Account Opening', amount: amt, acc: id, date: '2026-03-08' });
        navigateTo('accounts');
    } else if(state.activeForm === 'transfer') {
        const sid = document.getElementById('f-sid').value;
        const rid = document.getElementById('f-rid').value;
        const sAcc = state.accounts.find(a => a.id === sid);
        const rAcc = state.accounts.find(a => a.id === rid);
        if(sAcc && rAcc && sAcc.balance >= amt) {
            sAcc.balance -= amt; rAcc.balance += amt;
            state.transactions.push({ type: 'Transfer Out', amount: amt, acc: sid, date: '2026-03-08' });
            alert("Transfer Successful!"); navigateTo('dashboard');
        } else { alert("Insufficient funds or invalid ID"); }
    } else {
        const id = document.getElementById('f-id').value;
        const acc = state.accounts.find(a => a.id === id);
        if(acc) {
            if(state.activeForm === 'withdraw' && acc.balance >= amt) {
                acc.balance -= amt;
                state.transactions.push({ type: 'Withdrawal', amount: amt, acc: id, date: '2026-03-08' });
                alert("Withdrawal Successful!");
                navigateTo('dashboard');
            } else if(state.activeForm === 'deposit') {
                acc.balance += amt;
                state.transactions.push({ type: 'Deposit', amount: amt, acc: id, date: '2026-03-08' });
                alert("Deposit Successful!");
                navigateTo('dashboard');
            } else {
                alert("Insufficient funds for withdrawal.");
            }
        } else {
            alert("Account ID not found.");
        }
    }
}

function renderAccountTable() {
    document.getElementById('acc-body').innerHTML = state.accounts.map(a => `
        <tr><td>${a.id}</td><td>${a.name}</td><td>Rs. ${a.balance.toLocaleString()}</td><td>${a.type}</td></tr>
    `).join('');
}

function updateDashboard() {
    const totalBal = state.accounts.reduce((s, a) => s + a.balance, 0);
    const totalDep = state.transactions.filter(t => t.type.includes('Dep') || t.type.includes('Open')).reduce((s, t) => s + t.amount, 0);
    const totalWit = state.transactions.filter(t => t.type.includes('Wit') || t.type.includes('Out')).reduce((s, t) => s + t.amount, 0);

    document.getElementById('dash-acc-count').innerText = state.accounts.length;
    document.getElementById('dash-total-bal').innerText = `Rs. ${totalBal.toLocaleString()}`;
    document.getElementById('dash-total-dep').innerText = `Rs. ${totalDep.toLocaleString()}`;
    document.getElementById('dash-total-wit').innerText = `Rs. ${totalWit.toLocaleString()}`;

    document.getElementById('activity-list').innerHTML = state.transactions.slice(-4).reverse().map(t => `<li>${t.type}: Rs. ${t.amount.toLocaleString()}</li>`).join('');

    const ctx = document.getElementById('balanceChart').getContext('2d');
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    // Clear old chart if it exists to prevent overlap
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Deposits', 'Withdrawals'],
            datasets: [{ 
                data: [totalDep, totalWit], 
                backgroundColor: ['#10b981', '#ef4444'], // Green for Deposit, Red for Withdrawal
                borderRadius: 10 
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: { color: isDark ? '#334155' : '#e2e8f0' }, 
                    ticks: { color: isDark ? '#94a3b8' : '#64748b' } 
                },
                x: { 
                    ticks: { color: isDark ? '#94a3b8' : '#64748b' } 
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}