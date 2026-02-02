// ==================== THEME SYSTEM ====================

const htmlElement = document.documentElement;

// Function to get the system theme preference
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to set theme
function setTheme(theme) {
  const validTheme = (theme === 'dark') ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', validTheme);
  localStorage.setItem('theme', validTheme);
  updateThemeIcon(validTheme);
}

// Function to update the theme icon
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize theme on page load
function initializeTheme() {
  // Check for saved theme preference
  let savedTheme = localStorage.getItem('theme');
  
  if (!savedTheme) {
    // Detect system theme preference
    savedTheme = getSystemTheme();
  }
  
  setTheme(savedTheme);
}

// Setup theme toggle after DOM is ready
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Pass theme to builder page
    const builderLinks = document.querySelectorAll('a[href="index.html"]');
    builderLinks.forEach(link => {
      link.href = `index.html?theme=${newTheme}`;
    });
  });
}

// Update builder links with current theme on page load
function updateBuilderLinks() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const builderLinks = document.querySelectorAll('a[href="index.html"]');
  builderLinks.forEach(link => {
    link.href = `index.html?theme=${currentTheme}`;
  });
}

// ==================== MOBILE MENU ====================

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ==================== INITIALIZATION ====================

// Initialize theme immediately (before DOM parsing completes)
initializeTheme();

// Setup event listeners after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    updateBuilderLinks();
    setupMobileMenu();
  });
} else {
  setupThemeToggle();
  updateBuilderLinks();
  setupMobileMenu();
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
