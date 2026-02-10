// ============================================
// THEME MANAGEMENT
// ============================================

const htmlElement = document.documentElement;

function initializeTheme() {
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get('theme');
  const savedTheme = localStorage.getItem('theme');
  let theme = 'light';
  
  if (themeParam && (themeParam === 'dark' || themeParam === 'light')) {
    theme = themeParam;
  } else if (savedTheme) {
    theme = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  }
  
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const formInputs = {
    // Personal
    fullName: document.getElementById('full-name'),
    jobTitle: document.getElementById('job-title'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    location: document.getElementById('location'),
    website: document.getElementById('website'),
    profileImage: document.getElementById('profile-image'),
    
    // Content
    summary: document.getElementById('summary'),
    skills: document.getElementById('skills'),
    employment: document.getElementById('employment'),
    education: document.getElementById('education'),
};

const previewElements = {
    // Profile
    profileImage: document.getElementById('preview-profile-image'),
    name: document.getElementById('preview-name'),
    jobTitle: document.getElementById('preview-job-title'),
    email: document.getElementById('preview-email'),
    phone: document.getElementById('preview-phone'),
    location: document.getElementById('preview-location'),
    website: document.getElementById('preview-website'),
    websiteItem: document.getElementById('website-item'),
    skills: document.getElementById('preview-skills'),
    
    // Sections
    summary: document.getElementById('preview-summary'),
    employment: document.getElementById('preview-employment'),
    education: document.getElementById('preview-education'),
    
    // Section containers
    summarySection: document.getElementById('summary-section'),
    employmentSection: document.getElementById('employment-section'),
    educationSection: document.getElementById('education-section'),
};

const buttons = {
    save: document.getElementById('save-btn'),
    download: document.getElementById('download-btn'),
    print: document.getElementById('print-btn'),
    clear: document.getElementById('clear-btn'),
};

// Current template
let currentTemplate = 'modern';

// Professional template elements
const professionalElements = {
    card: document.getElementById('professional-resume-card'),
    name: document.getElementById('prof-name'),
    jobTitle: document.getElementById('prof-job-title'),
    contact: document.getElementById('prof-contact'),
    locationText: document.getElementById('prof-location-text'),
    emailText: document.getElementById('prof-email-text'),
    phoneText: document.getElementById('prof-phone-text'),
    websiteText: document.getElementById('prof-website-text'),
    
    // Sections
    summary: document.getElementById('prof-summary'),
    education: document.getElementById('prof-education'),
    employment: document.getElementById('prof-employment'),
    techSkills: document.getElementById('prof-tech-skills'),
    
    // Section containers
    summarySection: document.getElementById('prof-summary-section'),
    educationSection: document.getElementById('prof-education-section'),
    employmentSection: document.getElementById('prof-employment-section'),
    techSkillsSection: document.getElementById('prof-tech-skills-section'),
};

// Template switching
document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTemplate = btn.getAttribute('data-template');
        
        // Toggle visibility
        document.getElementById('resume-card').style.display = currentTemplate === 'modern' ? 'grid' : 'none';
        professionalElements.card.style.display = currentTemplate === 'professional' ? 'block' : 'none';
        
        // Update the appropriate template
        updatePreview();
    });
});

function updatePreview() {
    const fullName = formInputs.fullName.value.trim() || 'Your Name';
    const jobTitle = formInputs.jobTitle.value.trim() || 'Job Title';
    const email = formInputs.email.value.trim() || 'email@example.com';
    const phone = formInputs.phone.value.trim() || '+1 (555) 123-4567';
    const location = formInputs.location.value.trim() || 'Location';
    const website = formInputs.website.value.trim();
    const summary = formInputs.summary.value.trim();
    const skillsInput = formInputs.skills.value.trim();
    const employmentInput = formInputs.employment.value.trim();
    const educationInput = formInputs.education.value.trim();

    if (currentTemplate === 'modern') {
        updateModernTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput);
    } else if (currentTemplate === 'professional') {
        updateProfessionalTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput);
    }
}

function updateModernTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput) {
    // Update profile info
    previewElements.name.textContent = fullName;
    previewElements.jobTitle.textContent = jobTitle;
    previewElements.email.textContent = email;
    previewElements.phone.textContent = phone;
    previewElements.location.textContent = location;

    // Update website
    if (website) {
        previewElements.websiteItem.style.display = 'flex';
        previewElements.website.href = website;
        previewElements.website.textContent = website.replace(/^https?:\/\/(www\.)?/, '');
    } else {
        previewElements.websiteItem.style.display = 'none';
    }

    // Update skills
    renderSkills(skillsInput);

    // Update summary
    if (summary) {
        previewElements.summarySection.style.display = 'block';
        previewElements.summary.textContent = summary;
    } else {
        previewElements.summarySection.style.display = 'none';
    }

    // Update employment
    if (employmentInput) {
        previewElements.employmentSection.style.display = 'block';
        renderEmploymentHistory(employmentInput);
    } else {
        previewElements.employmentSection.style.display = 'none';
    }

    // Update education
    if (educationInput) {
        previewElements.educationSection.style.display = 'block';
        renderEducation(educationInput);
    } else {
        previewElements.educationSection.style.display = 'none';
    }
}

// ============================================
// RENDER SKILLS FUNCTION
// ============================================

function renderSkills(skillsStr) {
    const skillsArray = skillsStr
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

    previewElements.skills.innerHTML = '';

    if (skillsArray.length === 0) {
        return;
    }

    skillsArray.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        // Random skill level between 60-100%
        const skillLevel = 60 + Math.floor(Math.random() * 41);
        
        skillItem.innerHTML = `
            <span class="skill-name">${skill}</span>
            <div class="skill-bar">
                <div class="skill-level" style="width: ${skillLevel}%"></div>
            </div>
        `;
        
        previewElements.skills.appendChild(skillItem);
    });
}

// ============================================
// RENDER EMPLOYMENT HISTORY FUNCTION
// ============================================

function renderEmploymentHistory(employmentStr) {
    const entries = employmentStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    previewElements.employment.innerHTML = '';

    entries.forEach(entry => {
        const lines = entry.split('\n').map(l => l.trim());
        
        const employmentEntry = document.createElement('div');
        employmentEntry.className = 'employment-entry';
        
        let html = '';
        
        lines.forEach((line, index) => {
            if (index === 0) {
                // First line: could be "Title - Company (dates)" or just title
                const match = line.match(/^(.+?)\s*-\s*(.+?)(?:\s*\((.+?)\))?$/);
                if (match) {
                    html += `<div class="entry-title">${match[1].trim()}</div>`;
                    html += `<div class="entry-company">${match[2].trim()}${match[3] ? ` • ${match[3].trim()}` : ''}</div>`;
                } else {
                    html += `<div class="entry-title">${line}</div>`;
                }
            } else {
                html += `<div class="entry-description">${line}</div>`;
            }
        });
        
        employmentEntry.innerHTML = html;
        previewElements.employment.appendChild(employmentEntry);
    });
}

// ============================================
// RENDER EDUCATION FUNCTION
// ============================================

function renderEducation(educationStr) {
    const entries = educationStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    previewElements.education.innerHTML = '';

    entries.forEach(entry => {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        
        // Try to parse: "Degree - School (year)"
        const match = entry.match(/^(.+?)\s*-\s*(.+?)(?:\s*\((.+?)\))?$/);
        
        let html = '';
        if (match) {
            html += `<div class="entry-title">${match[1].trim()}</div>`;
            html += `<div class="entry-company">${match[2].trim()}${match[3] ? ` • ${match[3].trim()}` : ''}</div>`;
        } else {
            html += `<div class="entry-title">${entry}</div>`;
        }
        
        educationEntry.innerHTML = html;
        previewElements.education.appendChild(educationEntry);
    });
}

// ============================================
// PROFILE IMAGE UPLOAD
// ============================================

formInputs.profileImage.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewElements.profileImage.src = event.target.result;
            // Save to localStorage
            localStorage.setItem('cvProfileImage', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// ============================================
// SAVE DATA FUNCTION
// ============================================

function saveData() {
    const data = {
        fullName: formInputs.fullName.value,
        jobTitle: formInputs.jobTitle.value,
        email: formInputs.email.value,
        phone: formInputs.phone.value,
        location: formInputs.location.value,
        website: formInputs.website.value,
        summary: formInputs.summary.value,
        skills: formInputs.skills.value,
        employment: formInputs.employment.value,
        education: formInputs.education.value,
    };

    localStorage.setItem('cvResumeData', JSON.stringify(data));
    alert('✅ Resume data saved successfully!');
}

// ============================================
// LOAD DATA FUNCTION (Auto-load on page load)
// ============================================

function autoLoadData() {
    const savedData = localStorage.getItem('cvResumeData');
    const savedImage = localStorage.getItem('cvProfileImage');

    if (!savedData) {
        return;
    }

    const data = JSON.parse(savedData);

    // Auto-fill form fields
    formInputs.fullName.value = data.fullName || '';
    formInputs.jobTitle.value = data.jobTitle || '';
    formInputs.email.value = data.email || '';
    formInputs.phone.value = data.phone || '';
    formInputs.location.value = data.location || '';
    formInputs.website.value = data.website || '';
    formInputs.summary.value = data.summary || '';
    formInputs.skills.value = data.skills || '';
    formInputs.employment.value = data.employment || '';
    formInputs.education.value = data.education || '';

    if (savedImage) {
        previewElements.profileImage.src = savedImage;
    }
}

// ============================================
// CLEAR DATA FUNCTION
// ============================================

function clearData() {
    const confirmed = confirm('Are you sure you want to clear all data? This cannot be undone.');

    if (!confirmed) {
        return;
    }

    // Clear form fields
    formInputs.fullName.value = '';
    formInputs.jobTitle.value = '';
    formInputs.email.value = '';
    formInputs.phone.value = '';
    formInputs.location.value = '';
    formInputs.website.value = '';
    formInputs.summary.value = '';
    formInputs.skills.value = '';
    formInputs.employment.value = '';
    formInputs.education.value = '';
    formInputs.profileImage.value = '';

    // Reset image to placeholder
    previewElements.profileImage.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999' font-size='14' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E";

    // Clear localStorage
    localStorage.removeItem('cvResumeData');
    localStorage.removeItem('cvProfileImage');

    // Update preview
    updatePreview();

    alert('✅ All data cleared!');
}

// ============================================
// DOWNLOAD PDF FUNCTION
// ============================================

function downloadPDF() {
    const resumeElement = document.getElementById('resume-card');
    const fullName = formInputs.fullName.value.trim() || 'Resume';
    const filename = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    // Add pdf-mode class to body
    document.body.classList.add('pdf-mode');

    // Force layout before exporting
    setTimeout(() => {
        const options = {
            margin: 0,
            filename: filename,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                backgroundColor: '#ffffff',
                logging: false
            },
            jsPDF: { 
                unit: 'pt',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        html2pdf()
            .set(options)
            .from(resumeElement)
            .save()
            .then(() => {
                document.body.classList.remove('pdf-mode');
                alert('✅ PDF downloaded successfully!');
            })
            .catch((err) => {
                document.body.classList.remove('pdf-mode');
                console.error('PDF export error:', err);
                alert('❌ Error generating PDF. Please try again.');
            });
    }, 100);
}

// ============================================
// PRINT FUNCTION
// ============================================

function printResume() {
    window.print();
}

// ============================================
// EVENT LISTENERS
// ============================================

// Live preview on input
formInputs.fullName.addEventListener('input', updatePreview);
formInputs.jobTitle.addEventListener('input', updatePreview);
formInputs.email.addEventListener('input', updatePreview);
formInputs.phone.addEventListener('input', updatePreview);
formInputs.location.addEventListener('input', updatePreview);
formInputs.website.addEventListener('input', updatePreview);
formInputs.summary.addEventListener('input', updatePreview);
formInputs.skills.addEventListener('input', updatePreview);
formInputs.employment.addEventListener('input', updatePreview);
formInputs.education.addEventListener('input', updatePreview);

// Button event listeners
buttons.save.addEventListener('click', saveData);
buttons.download.addEventListener('click', downloadPDF);
buttons.clear.addEventListener('click', clearData);
buttons.print.addEventListener('click', printResume);

// ============================================
// INITIALIZATION
// ============================================

// Initialize theme first
initializeTheme();

// Auto-load saved data on page load
window.addEventListener('load', () => {
    autoLoadData();
    updatePreview();
});
