# GeoWatch AI

A bilingual Arabic/English geospatial intelligence **demonstration MVP** focused on the UAE.

## Features
- Interactive Leaflet / OpenStreetMap map
- Five UAE city markers with selectable location details
- City filter and map reset
- Arabic RTL / English LTR toggle
- Responsive light-theme dashboard
- Synthetic demo indicators, explicitly labeled

## Run locally
Open `index.html` in a browser with internet access, or serve the folder with:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy
Enable GitHub Pages for the repository (Settings > Pages > Deploy from a branch > main / root) if you want public hosting. Note: this repository is currently private, and Pages availability depends on account settings.

## Data integrity and limitations
All indicator values are synthetic and have no real-world interpretation. Map tiles come from OpenStreetMap through Leaflet's public CDN. There is no live satellite imagery, environmental API, AI inference, backend, user authentication, or real-time alerting in this MVP. Never use demo data for operational decisions.

## Next milestones
- Add a proper TypeScript application and test suite
- Integrate documented, licensed geospatial data APIs
- Add server-side secrets handling and data provenance
- Add report generation and AI analysis only after connecting verified sources
