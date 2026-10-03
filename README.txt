105X ADVISORY WEBSITE — DEMO BUILD
==================================

Files
- index.html       Main landing page
- style.css        Responsive design system and styling
- script.js        Mobile navigation, scroll effects, article loading/filtering
- blog.html        Insights index with search and category filters
- blog-details.html Dynamic article detail page
- blog.json        Editable demonstration article content

How to preview
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Run a local server, for example with the VS Code Live Server extension.
   Alternatively, from this folder run: python -m http.server 8000
4. Visit http://localhost:8000

Why use a local server?
The journal pages fetch blog.json, and browsers may block fetch requests when
HTML is opened directly as file://.

Demo notes
- Founder portrait is a placeholder image. Replace it with an approved portrait.
- Service descriptions and all sample articles are demonstration copy and need
  review/approval by 105X Advisory before launch.
- Social links are placeholders.
- Google Fonts, Lucide icons, and the sample portrait require internet access.
- No backend, framework, database, or build process is required.
- Contact email and phone are based on the supplied visiting card.
