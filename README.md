# SmartResume - Professional CV/Resume Builder

A modern, user-friendly web application for creating professional resumes and CVs with real-time preview, multiple templates, and easy PDF export.

## 🌟 Features

### Multiple Resume Templates
- **Modern Template**: Two-column layout with sidebar for contact info and skills
- **Professional Template**: Clean, centered layout suitable for ATS (Applicant Tracking Systems)

### Comprehensive Sections
- 📋 **Personal Information**: Full name, job title, email, phone, location, website
- 📄 **Professional Summary**: Brief overview of your professional background
- 💼 **Employment History**: Track multiple job positions with descriptions
- 🎓 **Education**: Add degrees and certifications
- 🛠️ **Technical Skills**: Organize and display your skills
- 📁 **Projects**: Showcase your key projects with descriptions
- 🏆 **Certifications**: List professional certifications
- 👥 **References**: Add professional references with contact information

### User Experience
- ✨ **Real-time Preview**: See changes instantly as you type
- 💾 **Auto-save**: Your data is automatically saved to browser storage
- 🎨 **Theme Support**: Light and dark mode toggle
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🖨️ **Print & Export**: Download as PDF or print directly
- 🔄 **Template Switching**: Instantly switch between resume styles

## 🚀 Quick Start

### Opening the Application

1. **Open `landing.html`** in your web browser to see the landing page
2. Click **"Start Building"** to go to the resume builder
3. Click **"View Templates"** to see available resume templates

### Using the Resume Builder

#### Step 1: Choose a Template
- Select between **"Modern"** (sidebar layout) or **"Professional"** (centered layout)
- The preview updates instantly

#### Step 2: Fill in Your Information
- **Profile Photo**: Upload a square image (recommended 400x400px)
- **Personal Info**: Full name, job title, contact details
- **Professional Summary**: Brief overview of your skills and experience
- **Skills**: Enter skills separated by commas (e.g., "JavaScript, React, Node.js")
- **Employment**: Enter job history (one per line, format: "Title - Company (dates)")
- **Education**: List degrees and schools
- **Projects**: Optional - add key projects you've worked on
- **Certifications**: List any professional certifications
- **References**: Add professional references with contact info

#### Step 3: Preview & Save
- Real-time preview appears on the right side
- Click **"💾 Save"** to store your resume locally
- Data persists in your browser

#### Step 4: Export Options
- **⬇️ Download**: Export your resume as a PDF file
- **🖨️ Print**: Open print dialog to print directly
- **🗑️ Clear**: Delete all data (confirmation required)

## 📋 File Structure

```
cv-project/
├── index.html          # Main resume builder application
├── landing.html        # Landing page with hero section
├── templates.html      # Template showcase and selection
├── app.js             # Main application logic
├── landing.js         # Landing page utilities
├── style.css          # All styling
├── README.md          # This file
└── SmartResume/       # Additional resources folder
```

## 🎨 Features in Detail

### Theme Toggle
- Click the theme button (☀️/🌙) in the navbar to switch between light and dark modes
- Your preference is saved locally

### Real-time Preview
- Start typing in any field and see changes appear instantly in the preview
- Resume layout automatically adjusts based on content

### Data Persistence
- All information is saved to your browser's localStorage
- Data persists across browser sessions
- Click "Clear" to delete everything

### Keyboard Shortcuts
- **Enter** in textarea fields to create new lines for items (employment, education, etc.)
- Use **commas** to separate skills in the skills field

### Responsive Design
- **Desktop**: Full two-column layout with form and preview
- **Tablet**: Optimized grid layout
- **Mobile**: Stacked layout with scrollable preview

## 🔒 Data Privacy

- ✅ All data is stored locally in your browser
- ✅ No data is sent to any server
- ✅ No accounts or login required
- ✅ No cookies or tracking
- ✅ Safe to use offline

## 📝 Tips for Best Results

### For Modern Template
1. Use a square profile photo for best appearance
2. Keep skills concise - use comma-separated format
3. Employment/Education: Use format "Title - Company (Date Range)"

### For Professional Template
1. Focus on clear, concise text
2. Use bullet points (•) at the start of descriptions
3. Include achievements and quantifiable results

### PDF Export Tips
1. Use the Download button to get a high-quality PDF
2. The PDF is optimized for ATS (Applicant Tracking Systems)
3. File name includes your name and template type
4. PDF is best viewed in Adobe Reader or similar

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript (ES6+)**: Application logic
- **html2pdf.js**: PDF generation library
- **localStorage API**: Data persistence

### Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📱 Mobile Usage

The app works great on mobile:
1. Upload or select photos easily
2. All buttons are touch-optimized
3. Preview scales to screen size
4. Download PDF works on mobile
5. Theme toggle works on mobile

## 🆘 Troubleshooting

### Resume not saving?
- Check if localStorage is enabled in your browser settings
- Try clearing browser cache and reloading

### PDF download not working?
- Disable ad blockers (they can interfere with PDF generation)
- Try a different browser
- Ensure pop-ups are allowed

### Images not uploading?
- Use JPG or PNG format
- Maximum file size recommended: 5MB
- Use square images for best appearance

### Theme not persisting?
- Ensure cookies/storage is enabled
- Try a different browser
- Clear browser cache

## 🎯 Workflow Summary

1. **Landing** (`landing.html`) → Choose to build or view templates
2. **Templates** (`templates.html`) → Select a template style
3. **Builder** (`index.html`) → Fill in all your info
4. **Preview** → See real-time updates on the right
5. **Save** → Store locally in browser
6. **Export** → Download as PDF or print

## 📞 Usage Scenarios

### For Job Applications
1. Fill in all your information
2. Customize for the job position
3. Download PDF and attach to application

### For Portfolio
1. Create multiple resume versions
2. Save locally with different names
3. Export each version as PDF

### For Updates
1. Load previous resume (auto-loaded from storage)
2. Make updates in real-time
3. Save again to replace old version

## ✨ Best Practices

- **Keep it concise**: One page is ideal
- **Use action verbs**: Started, Led, Increased, Developed
- **Add numbers**: "Increased sales by 25%"
- **Tailor for roles**: Customize skills and summary for each job
- **Proofread**: Check spelling before downloading

---

**Enjoy building your perfect resume! 🎉**


