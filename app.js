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
    projects: document.getElementById('projects'),
    certifications: document.getElementById('certifications'),
    references: document.getElementById('references'),
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
    references: document.getElementById('preview-references'),
    
    // Section containers
    summarySection: document.getElementById('summary-section'),
    employmentSection: document.getElementById('employment-section'),
    educationSection: document.getElementById('education-section'),
    referencesSection: document.getElementById('references-section'),
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
    projects: document.getElementById('prof-projects'),
    certifications: document.getElementById('prof-certifications'),
    references: document.getElementById('prof-references'),
    
    // Section containers
    summarySection: document.getElementById('prof-summary-section'),
    educationSection: document.getElementById('prof-education-section'),
    employmentSection: document.getElementById('prof-employment-section'),
    techSkillsSection: document.getElementById('prof-tech-skills-section'),
    projectsSection: document.getElementById('prof-projects-section'),
    certificationsSection: document.getElementById('prof-certifications-section'),
    referencesSection: document.getElementById('prof-references-section'),
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
        
        // Toggle profile photo section visibility based on template
        const profilePhotoSection = document.getElementById('profile-photo-section');
        profilePhotoSection.style.display = currentTemplate === 'modern' ? 'block' : 'none';
        
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
    const projectsInput = formInputs.projects.value.trim();
    const certificationsInput = formInputs.certifications.value.trim();
    const referencesInput = formInputs.references.value.trim();

    if (currentTemplate === 'modern') {
        updateModernTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput, referencesInput);
    } else if (currentTemplate === 'professional') {
        updateProfessionalTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput, projectsInput, certificationsInput, referencesInput);
    }
}

function updateModernTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput, referencesInput) {
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

    // Update references
    if (referencesInput) {
        previewElements.referencesSection.style.display = 'block';
        renderReferences(referencesInput);
    } else {
        previewElements.referencesSection.style.display = 'none';
    }
}

function updateProfessionalTemplate(fullName, jobTitle, email, phone, location, website, summary, skillsInput, employmentInput, educationInput, projectsInput, certificationsInput, referencesInput) {
    // Update header
    professionalElements.name.textContent = fullName;
    professionalElements.jobTitle.textContent = jobTitle;
    
    // Update contact
    professionalElements.locationText.textContent = location;
    professionalElements.emailText.textContent = email;
    professionalElements.emailText.href = `mailto:${email}`;
    professionalElements.phoneText.textContent = ` | ${phone}`;
    
    // Update website
    if (website) {
        professionalElements.websiteText.style.display = 'inline';
        professionalElements.websiteText.href = website;
        professionalElements.websiteText.textContent = website.replace(/^https?:\/\/(www\.)?/, '');
    } else {
        professionalElements.websiteText.style.display = 'none';
    }
    
    // Update summary
    if (summary) {
        professionalElements.summarySection.style.display = 'block';
        professionalElements.summary.textContent = summary;
    } else {
        professionalElements.summarySection.style.display = 'none';
    }
    
    // Update technical skills
    if (skillsInput) {
        professionalElements.techSkillsSection.style.display = 'block';
        renderProfessionalSkills(skillsInput);
    } else {
        professionalElements.techSkillsSection.style.display = 'none';
    }
    
    // Update employment
    if (employmentInput) {
        professionalElements.employmentSection.style.display = 'block';
        renderProfessionalEmployment(employmentInput);
    } else {
        professionalElements.employmentSection.style.display = 'none';
    }
    
    // Update education
    if (educationInput) {
        professionalElements.educationSection.style.display = 'block';
        renderProfessionalEducation(educationInput);
    } else {
        professionalElements.educationSection.style.display = 'none';
    }

    // Update projects
    if (projectsInput) {
        professionalElements.projectsSection.style.display = 'block';
        renderProfessionalProjects(projectsInput);
    } else {
        professionalElements.projectsSection.style.display = 'none';
    }

    // Update certifications
    if (certificationsInput) {
        professionalElements.certificationsSection.style.display = 'block';
        renderProfessionalCertifications(certificationsInput);
    } else {
        professionalElements.certificationsSection.style.display = 'none';
    }

    // Update references
    if (referencesInput) {
        professionalElements.referencesSection.style.display = 'block';
        renderProfessionalReferences(referencesInput);
    } else {
        professionalElements.referencesSection.style.display = 'none';
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
        skillItem.innerHTML = `<span class="skill-name">• ${skill}</span>`;
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
// PROFESSIONAL TEMPLATE RENDER FUNCTIONS
// ============================================

function renderProfessionalSkills(skillsStr) {
    const skillsArray = skillsStr
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

    professionalElements.techSkills.innerHTML = '';

    if (skillsArray.length === 0) {
        return;
    }

    // Display skills as comma-separated list
    professionalElements.techSkills.innerHTML = `<p>${skillsArray.join(' • ')}</p>`;
}

function renderProfessionalEmployment(employmentStr) {
    const entries = employmentStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    professionalElements.employment.innerHTML = '';

    entries.forEach(entry => {
        const lines = entry.split('\n').map(l => l.trim());
        
        const employmentEntry = document.createElement('div');
        employmentEntry.className = 'prof-item';
        
        let html = '';
        
        lines.forEach((line, index) => {
            if (index === 0) {
                // First line: could be "Title - Company (dates)" or just title
                const match = line.match(/^(.+?)\s*-\s*(.+?)(?:\s*\((.+?)\))?$/);
                if (match) {
                    html += `<div class="prof-item-title">${match[1].trim()}</div>`;
                    html += `<div class="prof-item-company">${match[2].trim()}${match[3] ? ` • ${match[3].trim()}` : ''}</div>`;
                } else {
                    html += `<div class="prof-item-title">${line}</div>`;
                }
            } else {
                html += `<div class="prof-item-description">• ${line}</div>`;
            }
        });
        
        employmentEntry.innerHTML = html;
        professionalElements.employment.appendChild(employmentEntry);
    });
}

function renderProfessionalEducation(educationStr) {
    const entries = educationStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    professionalElements.education.innerHTML = '';

    entries.forEach(entry => {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'prof-item';
        
        // Try to parse: "Degree - School (year)"
        const match = entry.match(/^(.+?)\s*-\s*(.+?)(?:\s*\((.+?)\))?$/);
        
        let html = '';
        if (match) {
            html += `<div class="prof-item-title">${match[1].trim()}</div>`;
            html += `<div class="prof-item-company">${match[2].trim()}${match[3] ? ` • ${match[3].trim()}` : ''}</div>`;
        } else {
            html += `<div class="prof-item-title">${entry}</div>`;
        }
        
        educationEntry.innerHTML = html;
        professionalElements.education.appendChild(educationEntry);
    });
}

// ============================================
// RENDER REFERENCES FUNCTIONS
// ============================================

function renderReferences(referencesStr) {
    const entries = referencesStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    previewElements.references.innerHTML = '';

    entries.forEach(entry => {
        const referenceEntry = document.createElement('div');
        referenceEntry.className = 'reference-entry';
        
        let html = '';
        
        // Try to parse: "Name, Title - Company"
        const match = entry.match(/^(.+?),\s*(.+?)\s*-\s*(.+?)$/);
        
        if (match) {
            html += `<div class="entry-title">${match[1].trim()}</div>`;
            html += `<div class="entry-company">${match[2].trim()} at ${match[3].trim()}</div>`;
        } else {
            html += `<div class="entry-title">${entry}</div>`;
        }
        
        // Check for contact info on additional lines
        if (entry.includes('Phone:') || entry.includes('Email:')) {
            html += `<div class="entry-description">${entry}</div>`;
        }
        
        referenceEntry.innerHTML = html;
        previewElements.references.appendChild(referenceEntry);
    });
}

function renderProfessionalReferences(referencesStr) {
    const entries = referencesStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    professionalElements.references.innerHTML = '';

    entries.forEach(entry => {
        const referenceEntry = document.createElement('div');
        referenceEntry.className = 'prof-item';
        
        let html = '';
        
        // Try to parse: "Name, Title - Company"
        const match = entry.match(/^(.+?),\s*(.+?)\s*-\s*(.+?)$/);
        
        if (match) {
            html += `<div class="prof-item-title">${match[1].trim()}</div>`;
            html += `<div class="prof-item-company">${match[2].trim()} at ${match[3].trim()}</div>`;
        } else {
            html += `<div class="prof-item-title">${entry}</div>`;
        }
        
        referenceEntry.innerHTML = html;
        professionalElements.references.appendChild(referenceEntry);
    });
}

// ============================================
// RENDER PROFESSIONAL PROJECTS
// ============================================

function renderProfessionalProjects(projectsStr) {
    const entries = projectsStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    professionalElements.projects.innerHTML = '';

    entries.forEach(entry => {
        const projectEntry = document.createElement('div');
        projectEntry.className = 'prof-project-item';
        
        let html = '';
        
        // Try to parse: "Project Name | Description"
        if (entry.includes('|')) {
            const [title, description] = entry.split('|').map(s => s.trim());
            html += `<div class="prof-project-title"><strong>${title}</strong></div>`;
            html += `<div class="prof-project-description">• ${description}</div>`;
        } else {
            html += `<div class="prof-project-title"><strong>${entry}</strong></div>`;
        }
        
        projectEntry.innerHTML = html;
        professionalElements.projects.appendChild(projectEntry);
    });
}

// ============================================
// RENDER PROFESSIONAL CERTIFICATIONS
// ============================================

function renderProfessionalCertifications(certificationsStr) {
    const entries = certificationsStr
        .split('\n')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    professionalElements.certifications.innerHTML = '';

    entries.forEach(entry => {
        const certEntry = document.createElement('div');
        certEntry.className = 'prof-cert-item';
        certEntry.innerHTML = `<div class="prof-cert-text">• ${entry}</div>`;
        professionalElements.certifications.appendChild(certEntry);
    });
}

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
        projects: formInputs.projects.value,
        certifications: formInputs.certifications.value,
        references: formInputs.references.value,
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
    formInputs.projects.value = data.projects || '';
    formInputs.certifications.value = data.certifications || '';
    formInputs.references.value = data.references || '';

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
    formInputs.projects.value = '';
    formInputs.certifications.value = '';
    formInputs.references.value = '';
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
    // Show loading message
    const downloadBtn = document.getElementById('download-btn');
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '⏳ Generating...';
    downloadBtn.disabled = true;

    try {
        // Get the active resume element based on current template
        let resumeElement;
        if (currentTemplate === 'modern') {
            resumeElement = document.getElementById('resume-card');
        } else if (currentTemplate === 'professional') {
            resumeElement = document.getElementById('professional-resume-card');
        } else {
            throw new Error('No valid template selected');
        }

        if (!resumeElement) {
            throw new Error('Resume element not found');
        }

        const fullName = formInputs.fullName.value.trim() || 'Resume';
        const filename = `${fullName.replace(/\s+/g, '_')}_Resume_${currentTemplate}.pdf`;

        // Clone the resume element to avoid modifying original
        const clonedElement = resumeElement.cloneNode(true);
        
        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        tempContainer.appendChild(clonedElement);
        document.body.appendChild(tempContainer);

        // Configure PDF options
        const options = {
            margin: [8, 8, 8, 8],
            filename: filename,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 1.2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowHeight: tempContainer.scrollHeight * 1.2
            },
            jsPDF: { 
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        // Generate and save PDF
        html2pdf()
            .set(options)
            .from(clonedElement)
            .save()
            .then(() => {
                // Clean up
                document.body.removeChild(tempContainer);
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                alert('✅ PDF downloaded successfully!\n\nFile: ' + filename);
            })
            .catch((err) => {
                // Clean up
                if (tempContainer.parentNode) {
                    document.body.removeChild(tempContainer);
                }
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                
                console.error('PDF export error:', err);
                alert('❌ Error generating PDF!\n\nPlease try:\n1. Check your internet connection\n2. Disable ad blockers\n3. Try a different browser\n4. Ensure pop-ups are allowed');
            });
    } catch (error) {
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        console.error('Download error:', error);
        alert('❌ Error: ' + error.message + '\n\nPlease fill in at least your name and try again.');
    }
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
formInputs.projects.addEventListener('input', updatePreview);
formInputs.certifications.addEventListener('input', updatePreview);
formInputs.references.addEventListener('input', updatePreview);

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
})
