---
name: Map of Vienna
description: A clear-line district atlas for people considering a move to Vienna.
colors:
  paper: "#fff7e8"
  paper-bright: "#fffdf7"
  paper-deep: "#f5ead6"
  ink: "#2d2a26"
  ink-soft: "#665f56"
  outline: "#39342e"
  peach: "#f3b59f"
  mint: "#a8d9c3"
  lavender: "#c5b8e7"
  sky: "#a8d2e8"
  butter: "#f6df8a"
  rose: "#eca9bb"
  active: "#f08b62"
  connected: "#94d3c0"
  transport-green: "#397b68"
  transport-amber: "#8b7430"
  transport-rail: "#a64e49"
  transport-air: "#625785"
typography:
  display:
    fontFamily: "Outfit, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 450
    lineHeight: 1.5
rounded:
  panel: "2px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "10px 12px"
---

# Design System: Map of Vienna

## Overview

**Creative North Star: "The Clear-Line City Atlas"**

Map of Vienna uses the disciplined flat color, even charcoal linework, and direct storytelling of ligne claire illustration. It is a research tool first: the visitor should understand a district's role at a glance, then reveal only the detail needed to compare it. Warm paper and a curated pastel register make unfamiliar geography approachable without softening the data.

**Key Characteristics:** flat fields, visible construction, warm editorial utility, contextual detail, and a map that does the explaining.

## Colors

The palette is a six-color pastel atlas on warm paper, held together by one consistent charcoal outline.

### Primary
- **Atlas Ink** (`#2d2a26`): all primary copy, district outlines, and interaction affordances.
- **Selection Coral** (`#f08b62`): the active district and decisive comparison state only.

### Secondary
- **Map Pastels** (`#f3b59f`, `#a8d9c3`, `#c5b8e7`, `#a8d2e8`, `#f6df8a`, `#eca9bb`): district fields and comparison cues; never decorative gradients.

### Neutral
- **Paper** (`#fff7e8`): page and map ground.
- **Bright Paper** (`#fffdf7`): readable labels and panels.
- **Soft Ink** (`#665f56`): secondary copy only.

**The Flat Field Rule.** Pastels are solid map information, never translucent chrome, gradients, or ambient decoration.

## Typography

**Display Font:** Outfit, Arial, sans-serif
**Body Font:** Inter, Arial, sans-serif

Outfit gives names and moments a compact, poster-like confidence. Inter carries dense transport and housing data without costume or noise.

### Hierarchy
- **Display** (700, `clamp(1.8rem, 3vw, 2.6rem)`, 0.95): product title and selected district name.
- **Headline** (700, 1.1rem, 1.1): panel titles and comparison cards.
- **Body** (450, 0.9375rem, 1.5): explanatory and district copy.
- **Label** (700, 0.7rem, 0.08em): compact category and map labels.

## Layout

The desktop surface is a narrow field-guide column beside an expansive atlas. The map always owns the first mobile viewport; the guide follows as a practical desk. Spacing uses a 6/10/16/24px rhythm, with the selected district desk kept closest to the map task.

## Elevation & Depth

No shadows. Depth comes from solid paper layers, charcoal borders, and the map's painted regions. Selection changes line weight and color rather than elevation.

## Shapes

Panels, controls, and labels use square-to-nearly-square corners (2px) like printed map annotations. Pills are reserved for compact filters and tags.

## Components

### Buttons
- **Shape:** square outlined control (2px).
- **Primary:** butter field, charcoal border, 10px by 12px padding.
- **Hover / Focus:** solid pastel swap and a 3px charcoal focus outline with offset.

### Chips
- **Style:** paper field with 1.5px charcoal outline.
- **State:** selected chips use a distinct solid pastel, never a shadow.

### Cards / Containers
- **Corner Style:** square map panels with 1.5–2px charcoal borders and no shadows.
- **Map:** flat pastel polygons with uniform charcoal boundaries; labels are printed annotations.

## Do's and Don'ts

- Do make every map state readable without a legend.
- Do keep filters grouped by what a mover is deciding.
- Do use movement to confirm selection, not to decorate idle UI.
- Do not use gradients, glassmorphism, blurred panels, or drop shadows.
- Do not introduce arbitrary district colors outside the curated pastel sequence.
- Do not bury comparison, loading, no-match, or recovery states in the sidebar.
