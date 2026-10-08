// IRL Demo – Interactive Mockup

const views = {
  home: document.getElementById('homeView'),
  reels: document.getElementById('reelsView'),
  dms: document.getElementById('dmsView'),
  chat: document.getElementById('chatView'),
  reel: document.getElementById('reelView'),
  profile: document.getElementById('profileView')
};

function showView(name) {
  // Hide all views
  Object.values(views).forEach(v => v.classList.remove('active'));
  
  // Show requested view
  if (views[name]) {
    views[name].classList.add('active');
  }

  // Update bottom nav active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === name);
  });
}

// Landing → Demo
document.getElementById('tryDemoBtn').addEventListener('click', () => {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('demo').classList.remove('hidden');
});

document.getElementById('backToLanding').addEventListener('click', () => {
  document.getElementById('demo').classList.add('hidden');
  document.getElementById('landing').classList.remove('hidden');
});

// DM button in header
document.getElementById('dmBtn').addEventListener('click', () => {
  showView('dms');
});

// Open a chat
function openChat(user) {
  const nameEl = document.getElementById('chatName');
  const avatarEl = document.getElementById('chatAvatar');
  const messagesEl = document.getElementById('chatMessages');

  nameEl.textContent = user;
  avatarEl.textContent = user.charAt(0).toUpperCase();

  // Simple avatar colors
  const colors = {
    ananya: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    rahul: 'linear-gradient(45deg,#4facfe,#00f2fe)',
    priya: 'linear-gradient(45deg,#43e97b,#38f9d7)',
    karan: 'linear-gradient(45deg,#fa709a,#fee140)'
  };
  avatarEl.style.background = colors[user] || '#555';

  // Populate messages
  if (user === 'ananya') {
    messagesEl.innerHTML = `
      <div class="message received">Hey! Check this out 👇</div>
      <div class="shared-reel-card" onclick="showView('reel')">
        <div class="shared-reel-thumb">🎬</div>
        <div class="shared-reel-label">Reel · Tap to watch</div>
      </div>
      <div class="message sent">Nice one!</div>
    `;
  } else {
    messagesEl.innerHTML = `
      <div class="message received">Hey, free this weekend?</div>
      <div class="message sent">Yeah, should be free after 4</div>
      <div class="message received">Cool, let's meet then</div>
    `;
  }

  showView('chat');
}

// Open profile
function openProfile(user) {
  const nameEl = document.getElementById('profileName');
  const avatarEl = document.getElementById('profileAvatar');

  if (user === 'you') {
    nameEl.textContent = 'you';
    avatarEl.textContent = 'Y';
    avatarEl.style.background = '#333';
  } else {
    nameEl.textContent = user;
    avatarEl.textContent = user.charAt(0).toUpperCase();
  }

  showView('profile');
}

// Make story items open profile (demo)
document.querySelectorAll('.story-item:not(.your-story)').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.querySelector('span').textContent;
    openProfile(name);
  });
});

// Initial view
showView('home');
