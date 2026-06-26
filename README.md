# Joel Paul — Cybersecurity Portfolio
 
> my portfolio(an o level student ) for  Polytechnic Early Admissions Exercise(poly eae)
 
## Live Site
  [click here!]( https://joel15thegoat.github.io/personal_portfolio_website/ )
 
## About
A personal portfolio site built to show my whole portfolio for eae (it encompasses whatever I have done throughout my 4 years in secondary school)
 
## Features
- Single-page home (`index.html`) with landing page, about, achievements overview, projects, research, testimonials, and contact form
- Dedicated sub-pages for **Academic Achievement**, **Non-Academic Achievement**, and **Competitions & Enrichment**, each with a certificate/photo gallery
- Typewriter hero name, scroll-reveal animations, mobile nav, page-transition fade
- GitHub project cards linking to live repos (calculator, IDS, password manager, keylogger research)
- Embedded Credly badges (Junior Cybersecurity Analyst, Introduction to Cybersecurity)
- Working contact form via Formspree, with a custom thank-you modal
- Downloadable testimonial PDF
## Project Structure
```
.
├── index.html                          # Home: landing page, about, achievements, projects, research, testimonials, contact
├── academic.html                       # Academic achievement detail page
├── non-academic.html                   # Non-academic achievement detail page
├── competitions_and_enrichment.html    # Competitions, enrichment programs, certifications
├── style.css                           # Global styles & design tokens
├── script.js                           # Typewriter effect, scroll reveal, nav, contact form, modal
├── Joel_s_Testimonial__Leadership_.pdf # Full leadership testimonial
├── *.jpg / *.jpeg / *.png              # Certificates, medals, project screenshots, portrait
└── .gitignore
```
 
## Tech Stack
- HTML5, CSS3 (custom properties, CSS grid/flexbox), vanilla JavaScript
- [Google Fonts](https://fonts.google.com/) — Poppins
- [Boxicons](https://boxicons.com/) — icon set
- [Formspree](https://formspree.io/) — contact form backend
## 📤 Deploying (GitHub Pages)
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set the source to the `main` branch, root folder
4. Your site will be live at `https://<username>.github.io/<repo-name>/`
##  Customization
- Update copy and highlight cards directly in the relevant HTML file
- Swap a certificate/medal photo by replacing the file but keeping the same filename — every page's `<img src>` already points to these exact names
- Add a new GitHub project by duplicating a `.project-card` block in `index.html`'s Projects section
## 📌 To Do
- [ ] Add `quantum-mindmap.jpg` — referenced by the Research section's Quantum Computing Mind Map card, not yet supplied
- [ ] Add real LinkedIn / Twitter / Instagram links in the hero social icons (currently `#`)
## licence
**For the Code (HTML, CSS, JavaScript, config files):**
This project is licensed under the MIT License - feel free to fork, clone, and use the underlying structure, layout, and logic for your own portfolio.

**For the Content (All personal photos, profile pictures, certificate images, written articles, and case study copy):**
All rights are reserved. You are not allowed to copy, redistribute, or use my personal likeness, documents, or written words in your own projects.

You are welcome to use this repository as a reference to build your own portfolio.
But if I catch you using my photos, or passing off my certificates as yours—I *will*  **hunt you down and skin you alive with a rusty butter knife.**

(Seriously, though:  Please swap in your own awesome content and build something cool. Thanks!)
