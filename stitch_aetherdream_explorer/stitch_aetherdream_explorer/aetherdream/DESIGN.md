---
name: AetherDream
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#ffafd3'
  on-tertiary: '#620040'
  tertiary-container: '#ae397b'
  on-tertiary-container: '#ffdce9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#ffafd3'
  on-tertiary-fixed: '#3d0026'
  on-tertiary-fixed-variant: '#85145a'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  display-hero:
    fontFamily: Bodoni Moda
    fontSize: 80px
    fontWeight: '300'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  telemetry-label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  void-margin: 4rem
  portal-gutter: 2rem
  telemetry-gap: 0.5rem
  container-max-width: 1440px
---

## Brand & Style
The design system embodies a **Cyber-Ethereal** aesthetic, blending the precision of advanced technology with the fluid, mysterious nature of the subconscious. It is designed for a "neural dreamscape explorer," positioning the interface not as a tool, but as a portal into a digital void.

The visual language is rooted in **Cinematic Minimalism** and **Refined Glassmorphism**. It prioritizes vast negative space to evoke a sense of scale and quietude. Surfaces are non-existent; instead, the UI consists of light-fields and high-blur translucent layers that feel like they are floating in a deep, atmospheric vacuum. The emotional response is one of calm curiosity, intellectual depth, and sophisticated immersion.

## Colors
The palette is centered on a **Deep Midnight (#020617)** foundation, serving as the "void" background. Atmospheric depth is created using gradients of **Rich Violet** and **Indigo**, applied as soft, out-of-focus background glows rather than solid fills.

- **Primary (Violet/Indigo):** Used for atmospheric lighting, primary actions, and branding.
- **Secondary (Subtle Cyan):** Reserved for technical telemetry, data visualization, and positive interactive states.
- **Tertiary (Subtle Magenta):** Used sparingly for alerts, deep-dream indicators, or secondary highlights.
- **Silver/White:** All functional typography and high-contrast iconography use silver-tinted white to ensure maximum legibility against the dark void.

## Typography
The typography strategy relies on the contrast between classical editorial elegance and modern technical precision.

- **Hero Headings:** Use **Bodoni Moda**. The high-contrast serifs provide a "premium editorial" feel that grounds the sci-fi elements in luxury. Use light weights with tight tracking for a cinematic look.
- **Interface & Body:** Use **Geist**. This provides a clean, neutral, and highly legible experience that doesn't distract from the immersive visuals.
- **Telemetry & Metadata:** Use **JetBrains Mono**. Applied to small-scale data, coordinates, and system status indicators. Always use wide letter-spacing and uppercase for these elements to emphasize their "readout" nature.

## Layout & Spacing
The layout follows a **Fluid Void** model. Content is not boxed; it floats. 

- **The Void Margin:** A generous 64px (4rem) outer margin is maintained on desktop to ensure the UI feels like it is drifting in the center of the screen.
- **Asymmetric Balance:** Use intentional asymmetry to mimic the unpredictable nature of dreams. Large display type should be offset against small, precise telemetry blocks.
- **Breakpoints:**
  - **Desktop (1280px+):** 12-column grid, 32px gutters.
  - **Tablet (768px - 1279px):** 8-column grid, 24px gutters, margins reduced to 32px.
  - **Mobile (Below 768px):** 4-column grid, 16px gutters, margins reduced to 16px. Vertical stacking is mandatory, but maintain the high-contrast display type at a smaller scale.

## Elevation & Depth
Depth is achieved through **Luminous Stratification** rather than shadows. 

1. **The Foundation:** Solid #020617.
2. **Atmospheric Layer:** Large, low-opacity (5-10%) radial gradients of primary/secondary colors that move subtly or remain fixed behind content.
3. **Glass Portals:** UI containers use a background blur (30px-50px) with an extremely thin (0.5px) silver border at 15% opacity. No solid background fill—only a slight lightening of the background behind the blur.
4. **Interaction Glow:** Hovered elements do not lift; they "ignite." A soft, colored outer glow (Bloom) is applied to the element to indicate focus.

## Shapes
The shape language is **Precise & Architectural**. 

Use **Soft (0.25rem)** roundedness for standard UI elements like input fields and buttons to maintain a sophisticated, slightly sharp edge. Larger "portal" containers or dream-cards can use **rounded-lg (0.5rem)**. Avoid pill-shapes or high roundedness, as they feel too "friendly" and detract from the technical, cinematic tone. Circles are reserved exclusively for telemetry indicators and profile avatars.

## Components
- **Buttons:** Ghost-style buttons with 1px silver borders. On hover, the border glows with a primary violet tint and the text gains a slight "bloom" effect. No solid fills unless for a "Primary Pulse" action.
- **Telemetry Chips:** Small, rectangular labels using JetBrains Mono. They often include a 2px "status dot" that pulses slowly to indicate a live neural connection.
- **Glass Cards:** High-blur containers with no shadow. Content inside should have high vertical padding to maintain the "portal" feel.
- **Input Fields:** Bottom-border only (1px silver). When active, the border extends to the full container height with a 5% silver fill and a cyan cursor.
- **Neural Lists:** List items are separated by thin, 0.5px lines that fade out at the edges (linear-gradient).
- **Additional Component - The Horizon Divider:** A full-width, ultra-thin line used to separate major dream-sections, often accompanied by a small coordinate readout on the far right.