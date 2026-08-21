# Portfolio Data Guide

All the content for your portfolio is driven by `portfolioData.json`. This makes it extremely easy to add new projects, update your experience, or change your contact details without touching any React code!

## 1. Projects (`nodes` array)
To add a new project, simply append a new object to the `nodes` array.

### Standard Project Template
```json
{
  "id": "unique-project-id",
  "type": "project",
  "title": "My Awesome Game",
  "role": "Solo Developer",
  "tech": ["Unity", "C#"],
  "summary": "A short summary of what the game is and why it's cool.",
  "keyContributions": [
    "Programmed the core movement loop.",
    "Designed 5 levels."
  ],
  "githubLink": "https://github.com/...",
  "itchLink": "https://itch.io/...",
  "video": "https://player.vimeo.com/video/123456",
  "videos": [
    { "title": "Part 1", "url": "https://www.youtube.com/embed/..." }
  ],
  "x": 1000,
  "y": 250,
  "pX": 500,
  "pY": 1300,
  "icon": "vr"
}
```

### Graduation Projects
To mark a project as a "Graduation Project" so it gets special styling at the top of the Projects list, add these two fields to the project object:
```json
"isGraduationProject": true,
"gradInfo": {
  "title": "Bachelor's Graduation Project",
  "text": "University Name",
  "logos": [
    { "src": "/logo.png", "alt": "Logo Name" }
  ]
}
```

### Map Coordinates (`x`, `y`, `pX`, `pY`)
- `x` and `y` represent the position of the project on the Overworld Map in standard Desktop view.
- `pX` and `pY` represent the position of the project on the Overworld Map in Mobile (Portrait) view.
- `icon`: The icon used on the map (e.g., `"vr"`, `"pc"`, `"mobile"`, `"house"`, `"crystal"`, `"telephone"`).

## 2. Experience (`internships` array)
Add your jobs/internships here. Each one will get its own stylized expandable card in the About Me section.
```json
{
  "id": "unique-job-id",
  "title": "Job Title",
  "institution": "Company Name",
  "date": "MM/YYYY - MM/YYYY",
  "description": "What you did there."
}
```

## 3. Education (`education` array)
Similar to Experience, but for degrees and certifications.
```json
{
  "id": "unique-edu-id",
  "degree": "Degree Name",
  "institution": "University Name",
  "date": "MM/YYYY - MM/YYYY",
  "gpa": "3.5"
}
```

## 4. Profile Information
Edit the `profile` object at the top of the file to change your name, contact info, summary, and skills list. The Skills are dynamically generated as pixel-buttons in the Technical Arsenal section!
