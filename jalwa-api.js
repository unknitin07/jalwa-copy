// Jalwa API Client
const JalwaAPI = {
    baseURL: 'https://api.jalwaapi.com/api/webapi',
    deviceId: '6aab05dedf11c45469f33b89b97cde4a',
    token: null,
    userData: null,
    
    // Generate random hex string
    generateRandom(length = 32) {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Generate MD5 signature
    generateSignature(data) {
        const jsonStr = JSON.stringify(data, Object.keys(data).sort());
        return CryptoJS.MD5(jsonStr).toString(CryptoJS.enc.Hex).toUpperCase();
    },
    
    // Login API
    async login(username, password) {
        const random = this.generateRandom();
        const timestamp = Math.floor(Date.now() / 1000);
        
        const sigData = {
            deviceId: this.deviceId,
            language: 0,
            logintype: 'mobile',
            phonetype: 0,
            pwd: password,
            random: random,
            username: username
        };
        
        const signature = this.generateSignature(sigData);
        
        const payload = {
            username: username,
            pwd: password,
            phonetype: 0,
            logintype: 'mobile',
            packId: '',
            deviceId: this.deviceId,
            language: 0,
            random: random,
            timestamp: timestamp,
            signature: signature
        };
        
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://jalwa.vip',
            'Referer': 'https://jalwa.vip/'
        };
        
        try {
            const response = await fetch(`${this.baseURL}/Login`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.code === 0) {
                this.token = data.data.token;
                this.userData = data.data;
                // Store token in localStorage
                localStorage.setItem('jalwa_token', this.token);
                localStorage.setItem('jalwa_user', JSON.stringify(this.userData));
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.msg };
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                return { 
                    success: false, 
                    message: 'CORS Error: Cannot connect to API from browser. Please use a backend proxy or CORS extension. See console for details.' 
                };
            }
            return { success: false, message: `Network error: ${error.message}` };
        }
    },
    
    // Get User Info API
    async getUserInfo() {
        if (!this.token) {
            this.token = localStorage.getItem('jalwa_token');
        }
        
        const random = this.generateRandom();
        const timestamp = Math.floor(Date.now() / 1000);
        
        const sigData = {
            language: 0,
            random: random
        };
        
        const signature = this.generateSignature(sigData);
        
        const payload = {
            signature: signature,
            language: 0,
            random: random,
            timestamp: timestamp
        };
        
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${this.token}`,
            'Origin': 'https://jalwa.vip',
            'Referer': 'https://jalwa.vip/',
            'ar-origin': 'https://jalwa.vip'
        };
        
        try {
            const response = await fetch(`${this.baseURL}/GetUserInfo`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if (data.code === 0) {
                this.userData = data.data;
                localStorage.setItem('jalwa_user', JSON.stringify(this.userData));
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.msg };
            }
        } catch (error) {
            console.error('GetUserInfo error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    },
    
    // Get Withdraw Log API
    async getWithdrawLog(pageNo = 1, pageSize = 10, state = -1, type = -1) {
        if (!this.token) {
            this.token = localStorage.getItem('jalwa_token');
        }
        
        const random = this.generateRandom();
        const timestamp = Math.floor(Date.now() / 1000);
        
        const sigData = {
            language: 0,
            pageNo: pageNo,
            pageSize: pageSize,
            random: random,
            state: state,
            type: type
        };
        
        const signature = this.generateSignature(sigData);
        
        const payload = {
            pageNo: pageNo,
            pageSize: pageSize,
            startDate: '',
            endDate: '',
            state: state,
            type: type,
            language: 0,
            random: random,
            signature: signature,
            timestamp: timestamp
        };
        
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${this.token}`,
            'Origin': 'https://jalwa.vip',
            'Referer': 'https://jalwa.vip/',
            'ar-origin': 'https://jalwa.vip'
        };
        
        try {
            const response = await fetch(`${this.baseURL}/GetWithdrawLog`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if (data.code === 0) {
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.msg };
            }
        } catch (error) {
            console.error('GetWithdrawLog error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    },
    
    // Get Recharge Record API
    async getRechargeRecord(pageNo = 1, pageSize = 10, state = -1, payId = -1, payTypeId = -1) {
        if (!this.token) {
            this.token = localStorage.getItem('jalwa_token');
        }
        
        const random = this.generateRandom();
        const timestamp = Math.floor(Date.now() / 1000);
        
        const sigData = {
            language: 0,
            pageNo: pageNo,
            pageSize: pageSize,
            payId: payId,
            payTypeId: payTypeId,
            random: random,
            state: state
        };
        
        const signature = this.generateSignature(sigData);
        
        const payload = {
            pageNo: pageNo,
            pageSize: pageSize,
            startDate: '',
            endDate: '',
            state: state,
            payId: payId,
            payTypeId: payTypeId,
            language: 0,
            random: random,
            signature: signature,
            timestamp: timestamp
        };
        
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${this.token}`,
            'Origin': 'https://jalwa.vip',
            'Referer': 'https://jalwa.vip/',
            'ar-origin': 'https://jalwa.vip'
        };
        
        try {
            const response = await fetch(`${this.baseURL}/GetRechargeRecord`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if (data.code === 0) {
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.msg };
            }
        } catch (error) {
            console.error('GetRechargeRecord error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }
};

// UI State Management
let currentPage = 'login-page';
let currentWithdrawPage = 1;
let totalWithdrawPages = 1;
let currentDepositPage = 1;
let totalDepositPages = 1;
let rememberPassword = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    
    // Check if user is already logged in
    const token = localStorage.getItem('jalwa_token');
    if (token) {
        JalwaAPI.token = token;
        const userData = localStorage.getItem('jalwa_user');
        if (userData) {
            JalwaAPI.userData = JSON.parse(userData);
        }
        showPage('home-page');
        loadUserData();
    }
    
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', handleLogin);
});

// Update clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Toggle password visibility
function togglePassword() {
    const input = document.getElementById('password-input');
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Toggle checkbox
function toggleCheckbox() {
    const checkbox = document.getElementById('remember-checkbox');
    rememberPassword = !rememberPassword;
    if (rememberPassword) {
        checkbox.classList.add('checked');
    } else {
        checkbox.classList.remove('checked');
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone-input').value;
    const password = document.getElementById('password-input').value;
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('login-error');
    
    // Validate inputs
    if (!phone || !password) {
        showError('Please enter phone number and password');
        return;
    }
    
    // Add country code if not present
    const username = phone.startsWith('91') ? phone : '91' + phone;
    
    // Disable button and show loading
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';
    errorMsg.classList.remove('show');
    
    try {
        const result = await JalwaAPI.login(username, password);
        
        if (result.success) {
            // Save credentials if remember is checked
            if (rememberPassword) {
                localStorage.setItem('jalwa_phone', phone);
                localStorage.setItem('jalwa_remember', 'true');
            }
            
            // Show success and navigate to home
            showPage('home-page');
            loadUserData();
            
            // Reset form
            document.getElementById('login-form').reset();
            document.getElementById('remember-checkbox').classList.remove('checked');
            rememberPassword = false;
        } else {
            showError(result.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please try again.');
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Log in';
    }
}

// Show error message
function showError(message) {
    const errorMsg = document.getElementById('login-error');
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
    
    setTimeout(() => {
        errorMsg.classList.remove('show');
    }, 5000);
}

// Show page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
    
    // Update URL bar
    const urlBar = document.getElementById('url-bar');
    const pageNames = {
        'login-page': 'jalwa.vip/login',
        'home-page': 'jalwa.vip/account',
        'withdraw-page': 'jalwa.vip/withdraw',
        'deposit-page': 'jalwa.vip/deposit'
    };
    urlBar.textContent = pageNames[pageId] || 'jalwa.vip';
    
    // Update bottom nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (pageId === 'home-page') {
        document.querySelectorAll('.nav-item')[2].classList.add('active');
    }
    
    // Load page data
    if (pageId === 'withdraw-page') {
        loadWithdrawHistory();
    } else if (pageId === 'deposit-page') {
        loadDepositHistory();
    }
}

// Load user data
async function loadUserData() {
    const result = await JalwaAPI.getUserInfo();
    
    if (result.success) {
        const data = result.data;
        
        // Update profile
        const nickName = data.nickName || 'User';
        document.getElementById('user-avatar').textContent = nickName.charAt(0).toUpperCase();
        document.getElementById('user-uid').textContent = data.userId;
        
        // Update last login
        if (data.userLoginDate) {
            document.getElementById('last-login').textContent = `Last login: ${data.userLoginDate}`;
        }
        
        // Update balance
        document.getElementById('total-balance').textContent = `₹${parseFloat(data.amount || 0).toFixed(2)}`;
        
        // Update notification badge
        document.getElementById('notification-badge').textContent = data.unRead || 0;
    }
}

// Refresh balance
async function refreshBalance() {
    const icon = document.querySelector('.refresh-icon');
    icon.style.animation = 'spin 1s linear';
    
    await loadUserData();
    
    setTimeout(() => {
        icon.style.animation = '';
    }, 1000);
}

// Copy UID
function copyUID() {
    const uid = document.getElementById('user-uid').textContent;
    navigator.clipboard.writeText(uid).then(() => {
        alert('UID copied to clipboard!');
    });
}

// Load withdraw history
async function loadWithdrawHistory(page = 1) {
    const loading = document.getElementById('withdraw-loading');
    const list = document.getElementById('withdraw-list');
    const pagination = document.getElementById('withdraw-pagination');
    
    loading.style.display = 'block';
    list.innerHTML = '';
    pagination.style.display = 'none';
    
    const result = await JalwaAPI.getWithdrawLog(page, 10);
    
    loading.style.display = 'none';
    
    if (result.success) {
        const data = result.data;
        currentWithdrawPage = page;
        totalWithdrawPages = data.totalPage || 1;
        
        if (data.list && data.list.length > 0) {
            data.list.forEach(item => {
                const card = createWithdrawCard(item);
                list.appendChild(card);
            });
            
            // Update pagination
            document.getElementById('withdraw-page-info').textContent = `Page ${currentWithdrawPage} of ${totalWithdrawPages}`;
            document.getElementById('withdraw-prev').disabled = currentWithdrawPage === 1;
            document.getElementById('withdraw-next').disabled = currentWithdrawPage === totalWithdrawPages;
            pagination.style.display = 'flex';
        } else {
            list.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No withdrawal history found</p>';
        }
    } else {
        list.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--accent-red);">Failed to load withdrawal history</p>';
    }
}

// Create withdraw card
function createWithdrawCard(item) {
    const card = document.createElement('div');
    card.className = 'transaction-card';
    if (item.state !== 1) {
        card.classList.add('failed');
    }
    
    const statusText = item.state === 1 ? 'Completed' : item.state === 2 ? 'Failed' : 'Processing';
    const statusClass = item.state === 1 ? '' : 'failed';
    
    card.innerHTML = `
        <div class="transaction-header">
            <span class="transaction-type">Withdraw</span>
            <span class="transaction-status ${statusClass}">${statusText}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Balance:</span>
            <span class="transaction-value amount">₹${parseFloat(item.price).toFixed(2)}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Type:</span>
            <span class="transaction-value">${item.withdrawName || 'N/A'}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Time:</span>
            <span class="transaction-value">${item.addTime}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Order number:</span>
            <span class="transaction-value order">
                ${item.withdrawNumber}
                <svg class="copy-icon" onclick="copyText('${item.withdrawNumber}')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </span>
        </div>
        ${item.remark ? `
        <div class="transaction-row">
            <span class="transaction-label">Remarks:</span>
            <span class="transaction-value">${item.remark}</span>
        </div>
        ` : ''}
    `;
    
    return card;
}

// Load deposit history
async function loadDepositHistory(page = 1) {
    const loading = document.getElementById('deposit-loading');
    const list = document.getElementById('deposit-list');
    const pagination = document.getElementById('deposit-pagination');
    
    loading.style.display = 'block';
    list.innerHTML = '';
    pagination.style.display = 'none';
    
    const result = await JalwaAPI.getRechargeRecord(page, 10);
    
    loading.style.display = 'none';
    
    if (result.success) {
        const data = result.data;
        currentDepositPage = page;
        totalDepositPages = data.totalPage || 1;
        
        if (data.list && data.list.length > 0) {
            data.list.forEach(item => {
                const card = createDepositCard(item);
                list.appendChild(card);
            });
            
            // Update pagination
            document.getElementById('deposit-page-info').textContent = `Page ${currentDepositPage} of ${totalDepositPages}`;
            document.getElementById('deposit-prev').disabled = currentDepositPage === 1;
            document.getElementById('deposit-next').disabled = currentDepositPage === totalDepositPages;
            pagination.style.display = 'flex';
        } else {
            list.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No deposit history found</p>';
        }
    } else {
        list.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--accent-red);">Failed to load deposit history</p>';
    }
}

// Create deposit card
function createDepositCard(item) {
    const card = document.createElement('div');
    card.className = 'transaction-card';
    if (item.state !== 2) {
        card.classList.add('failed');
    }
    
    const statusText = item.state === 2 ? 'Success' : item.state === 3 ? 'Failed' : 'Processing';
    const statusClass = item.state === 2 ? '' : 'failed';
    
    card.innerHTML = `
        <div class="transaction-header">
            <span class="transaction-type deposit">Deposit</span>
            <span class="transaction-status ${statusClass}">${statusText}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Balance:</span>
            <span class="transaction-value amount">₹${parseFloat(item.price).toFixed(2)}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Type:</span>
            <span class="transaction-value">${item.payName || 'N/A'}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Time:</span>
            <span class="transaction-value">${item.addTime}</span>
        </div>
        <div class="transaction-row">
            <span class="transaction-label">Order number:</span>
            <span class="transaction-value order">
                ${item.rechargeNumber}
                <svg class="copy-icon" onclick="copyText('${item.rechargeNumber}')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </span>
        </div>
        ${item.state === 3 ? `
        <button class="submit-btn" onclick="submitUTR('${item.rechargeNumber}')">Submit UTR</button>
        ` : ''}
    `;
    
    return card;
}

// Copy text to clipboard
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Submit UTR
function submitUTR(orderNumber) {
    alert(`Submit UTR for order: ${orderNumber}\n\nThis feature will open UTR submission form.`);
}

// Filter withdraw type
function filterWithdrawType(type) {
    const tabs = document.querySelectorAll('#withdraw-page .filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // In a real app, you would filter by type here
    // For now, just reload all
    loadWithdrawHistory(1);
}

// Filter deposit type
function filterDepositType(type) {
    const tabs = document.querySelectorAll('#deposit-page .filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // In a real app, you would filter by type here
    // For now, just reload all
    loadDepositHistory(1);
}

// Pagination functions
function previousWithdrawPage() {
    if (currentWithdrawPage > 1) {
        loadWithdrawHistory(currentWithdrawPage - 1);
    }
}

function nextWithdrawPage() {
    if (currentWithdrawPage < totalWithdrawPages) {
        loadWithdrawHistory(currentWithdrawPage + 1);
    }
}

function previousDepositPage() {
    if (currentDepositPage > 1) {
        loadDepositHistory(currentDepositPage - 1);
    }
}

function nextDepositPage() {
    if (currentDepositPage < totalDepositPages) {
        loadDepositHistory(currentDepositPage + 1);
    }
}

// Show register
function showRegister() {
    alert('Registration page will be implemented here.\n\nThis would open the registration form with similar design.');
}

// Add CryptoJS library for MD5 hashing
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js';
    script.integrity = 'sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    document.head.appendChild(script);
})();
