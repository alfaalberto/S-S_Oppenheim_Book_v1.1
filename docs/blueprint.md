# **App Name**: Signals and Systems Interactive Slides

## Core Features:

- Slide Loader: Dynamically load and render HTML slide decks for each chapter section.
- Slide Isolation: Isolate slides using Shadow DOM or sandboxed iframes to avoid CSS and JS conflicts.
- Interactive Index: Generate an interactive, multi-level expandable/collapsible table of contents (accordion menu) from the provided book index.
- Local Persistence: Persist slide HTML and app settings (e.g. light/dark mode) to local storage (IndexedDB).
- Responsive Fullscreen: Display slides in fullscreen mode, adapting to different screen sizes. Make them occupy 100% of the viewable area.

## Style Guidelines:

- Primary color: A muted indigo (#667DB6) to suggest a balance of intellect and calm.
- Background color: A very dark gray (#121212) for a comfortable reading experience in dark mode.
- Accent color: A vibrant purple (#B06AB3) to highlight interactive elements.
- Body font: 'Literata', a serif, for readability in longer sections of text.
- Headline font: 'Space Grotesk', a sans-serif, for section titles and emphasis.
- Use minimalist icons to represent different sections of the content. Keep the aesthetic clean and modern.
- The accordion-style table of contents should remain fixed on the left, while the presentation area fills the remaining space on the right.
- Use subtle transitions for slide changes and accordion expansions.