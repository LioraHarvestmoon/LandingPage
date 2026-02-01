/**
 * MTN Playbox Landing Page Scripts
 * Version: 2.1 - Fixed Wheel Position
 */

// ============= CONFIGURATION =============
const CONFIG = {
    // 🎯 在这里填入你的offer链接
    offerUrl: 'https://fitstylearena.net/ciyql9k.php?lp=1',

    // 倒计时秒数 (2分钟)
    countdownSeconds: 120,

    // Loading页面显示时间 (毫秒)
    loadingDuration: 800,

    // 通知轮播间隔 (毫秒)
    notificationInterval: 6000
};

// ============= 8个奖品配置 (从12点钟方向顺时针，对应转盘图片) =============
const PRIZES = [
    { icon: '💰', name: '₦1,000,000', subtitle: 'Cash Prize' },      // 扇区0 - 黄色
    { icon: '📱', name: 'MTN Airtime', subtitle: 'Reward' },         // 扇区1 - 绿色
    { icon: '💵', name: '₦500,000', subtitle: 'Instant Cash' },      // 扇区2 - 黄色
    { icon: '📲', name: 'MTN Airtime', subtitle: 'Bonus' },          // 扇区3 - 绿色
    { icon: '💎', name: '₦500,000', subtitle: 'Cash' },              // 扇区4 - 黄色
    { icon: '🎁', name: 'MTN Airtime', subtitle: 'Bonus' },          // 扇区5 - 绿色
    { icon: '🏆', name: '₦100,000', subtitle: 'Cash' },              // 扇区6 - 黄色
    { icon: '🎰', name: 'MEGA JACKPOT', subtitle: '₦1,000,000' }     // 扇区7 - 红色
];

// ============= STATE =============
let isSpinning = false;
let hasSpun = false;
let currentRotation = 0;
let totalSeconds = CONFIG.countdownSeconds;
let notifIndex = 0;

// ============= INIT NOTIFICATION =============
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('notification').style.display = 'flex';
});

// ============= TIMER COUNTDOWN =============
function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    if (totalSeconds > 0) {
        totalSeconds--;
        setTimeout(updateTimer, 1000);
    }
}
updateTimer();

// ============= NOTIFICATIONS =============
const notifications = [
    '📱 Ade O. just won ₦1,000 Airtime!',
    '🎁 Blessing M. won ₦2,000 Airtime!',
    '📱 Chidi E. won ₦500 Airtime!',
    '🎊 Ngozi A. won ₦3,000 Airtime!',
    '📱 Tunde B. won ₦1,500 Airtime!',
    '🎁 Emeka K. won ₦2,500 Airtime!',
    '📱 Fatima S. won ₦1,000 Airtime!',
    '🎊 Yusuf D. won ₦5,000 Airtime!'
];

function showNotification() {
    const notifEl = document.getElementById('notification');
    notifEl.innerHTML = `<span>${notifications[notifIndex].split(' ')[0]}</span><span>${notifications[notifIndex].substring(2)}</span>`;
    notifEl.style.animation = 'none';
    notifEl.offsetHeight;
    notifEl.style.animation = 'notifySlide 4s ease forwards';
    notifIndex = (notifIndex + 1) % notifications.length;
}
setInterval(showNotification, CONFIG.notificationInterval + 1000);

// ============= WHEEL SPIN =============
function spinWheel() {
    if (isSpinning || hasSpun) return;

    isSpinning = true;
    hasSpun = true;

    const wheel = document.getElementById('wheel');

    // 随机选择一个奖品 (0-7)
    const prizeIndex = Math.floor(Math.random() * 8);

    // 每个扇区45度
    const sectorAngle = 45;

    // 图片初始偏移修正（根据实际图片调整，正值=顺时针偏移）
    // 如果弹窗显示的是下一个扇区，增加此值；如果是上一个扇区，减少此值
    const IMAGE_OFFSET = 45;

    // 计算让选中扇区停在指针下的角度
    // 扇区N的中心角度 = N * 45 + 22.5
    // 需要逆时针旋转到顶部 = -(N * 45 + 22.5) + 偏移
    const sectorCenter = prizeIndex * sectorAngle + sectorAngle / 2;
    const targetAngle = (360 - sectorCenter + IMAGE_OFFSET) % 360;

    // 旋转5圈 + 目标角度（确保顺时针旋转）
    const totalSpin = 1800 + targetAngle;
    currentRotation += totalSpin;

    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // 旋转结束后显示对应奖品弹窗
    setTimeout(() => {
        isSpinning = false;
        showWinModal(prizeIndex);
    }, 4200);
}

// ============= WIN MODAL =============
function showWinModal(prizeIndex) {
    const prize = PRIZES[prizeIndex];

    // 更新弹窗内容
    document.getElementById('winIcon').textContent = prize.icon;
    document.getElementById('prizeAmount').innerHTML = `${prize.name}<br><small style="font-size:14px;opacity:0.8">${prize.subtitle}</small>`;

    const modal = document.getElementById('winModal');
    modal.classList.add('active');
    createConfetti();
}

// ============= CONFETTI EFFECT =============
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    const colors = ['#ffcc00', '#00c853', '#ff4444', '#00bcd4', '#ff9800', '#e91e63'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// ============= CLAIM PRIZE =============
function claimPrize() {
    const urlParams = new URLSearchParams(window.location.search);
    const clickId = urlParams.get('click_id') || urlParams.get('cid') || '';
    const source = urlParams.get('source') || urlParams.get('sc') || '';

    let finalUrl = CONFIG.offerUrl;

    // 检查原URL是否已有参数
    const hasParams = finalUrl.includes('?');

    // 添加tracking参数
    if (clickId) {
        finalUrl += (hasParams ? '&' : '?') + 'cid=' + encodeURIComponent(clickId);
    }
    if (source) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'sc=' + encodeURIComponent(source);
    }

    window.location.href = finalUrl;
}
