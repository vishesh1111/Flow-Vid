# Frontend Styles Guide - YouTube Clone

## 🎨 Design System Overview

This document outlines all the styling and design decisions implemented in the YouTube clone frontend.

## Color Palette

### Primary Colors
- **YouTube Black**: `#0f0f0f` (Main background)
- **YouTube Light Black**: `#1a1a1a` (Cards, modals)
- **YouTube Gray**: `#272727` (Buttons, hover states)
- **YouTube Light Gray**: `#3f3f3f` (Active hover states)
- **YouTube Red**: `#ff0000` (Logo, brand)
- **YouTube Blue**: `#3ea6ff` (Links, CTAs, focus states)

### Text Colors
- **Primary Text**: `#f1f1f1` (Headings, main content)
- **Secondary Text**: `#aaaaaa` (Subtitles, metadata)
- **White**: `#ffffff` (High contrast elements)

## Typography

### Font Family
- Primary: `'Roboto', 'Arial', sans-serif`
- System fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`

### Font Sizes
- Headings: `text-2xl` (24px), `text-3xl` (30px)
- Body: `text-sm` (14px), `text-base` (16px)
- Small: `text-xs` (12px)

### Font Weights
- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

## Component Styles

### Navbar
**Dimensions:**
- Height: `56px` (h-14)
- Fixed positioning at top
- z-index: 50

**Features:**
- Shadow: `shadow-yt` (0 2px 8px rgba(0,0,0,0.2))
- Border bottom: `1px solid #222`
- Background: `#0f0f0f`

**Search Bar:**
- Rounded full on both ends
- Border: `1px solid #303030`
- Focus: Blue border (`#3ea6ff`)
- Button hover: Gray background (`#272727`)

**Buttons:**
- Rounded full for user actions
- Hover: Gray background with transition
- Icon size: 24px (w-6 h-6)

### Video Cards
**Layout:**
- Aspect ratio: 16:9
- Border radius: 12px (rounded-xl)
- Gap between cards: 16px horizontal, 40px vertical

**Thumbnail:**
- Hover effect: Scale 105% with smooth transition
- Duration overlay: Bottom right, black with 80% opacity
- Rounded corners: 12px

**Channel Avatar:**
- Size: 36px (w-9 h-9)
- Gradient: Blue → Purple → Pink
- Rounded full circle
- Shadow: Medium

**Text:**
- Title: 2-line clamp, primary text color
- Channel name: Secondary text, hover → primary
- Metadata: Extra small, secondary text

### Category Tabs
**Active State:**
- Background: White
- Text: Black
- Bold font weight

**Inactive State:**
- Background: `#272727`
- Text: Primary
- Hover: `#3f3f3f`

**Layout:**
- Horizontal scroll with hidden scrollbar
- Gap: 12px
- Padding: 16px vertical, 16px horizontal
- Rounded: 8px (rounded-lg)

### Forms (Login/Register)
**Container:**
- Background: `#1a1a1a`
- Border: 1px solid `#222`
- Border radius: 16px (rounded-2xl)
- Padding: 32px
- Shadow: `shadow-yt`

**Input Fields:**
- Background: `#0f0f0f`
- Border: 1px solid `#303030`
- Focus border: `#3ea6ff`
- Rounded: 8px (rounded-lg)
- Padding: 12px 16px

**Buttons:**
- Background: `#3ea6ff`
- Hover: `#2D8FCE`
- Rounded: Full (pill shape)
- Padding: 12px 16px
- Font weight: Semibold (600)
- Shadow on hover: Larger shadow

**Error Messages:**
- Background: Red with 10% opacity
- Border: 1px solid red
- Icon: Alert icon with red color
- Rounded: 8px

### Loading States
**Spinner:**
- Size: 20px (w-5 h-5)
- Color: White
- Animation: Spin (360deg rotation)
- Positioned inline with text

## Transitions & Animations

### Global Transitions
```css
* {
  transition: background-color 0.2s ease, 
              border-color 0.2s ease, 
              color 0.2s ease;
}
```

### Hover Effects
- **Buttons**: Background color change (200ms ease)
- **Video cards**: Image scale (200ms ease-in-out)
- **Links**: Color change (200ms ease)
- **Icons**: Opacity change (200ms ease)

### Focus States
- Outline: 2px solid `#3ea6ff`
- Outline offset: 2px
- Only visible on keyboard focus

## Responsive Grid

### Video Grid Breakpoints
- **Mobile** (< 640px): 1 column
- **Tablet** (640px - 1024px): 2 columns
- **Desktop** (1024px - 1280px): 3 columns
- **Large Desktop** (1280px - 1536px): 4 columns
- **XL Desktop** (> 1536px): 5 columns

### Spacing
- Container padding: 24px (px-6)
- Gap between videos: 16px horizontal, 40px vertical
- Max container width: 1800px

## Custom Utilities

### Line Clamp
```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Scrollbar Styling
**Custom Scrollbar:**
- Width: 8px
- Track: `#0f0f0f`
- Thumb: `#3f3f3f`
- Hover: `#555`
- Border radius: 4px

**Hidden Scrollbar:**
```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

## Accessibility

### Focus Indicators
- All interactive elements have visible focus states
- Blue outline (2px) on keyboard navigation
- Skip to content available

### Color Contrast
- All text meets WCAG AA standards
- Primary text: `#f1f1f1` on `#0f0f0f` (14.8:1 ratio)
- Secondary text: `#aaaaaa` on `#0f0f0f` (7.2:1 ratio)

### ARIA Labels
- Icon-only buttons have `aria-label`
- Form inputs properly labeled
- Navigation landmarks defined

## Icon System

### Icon Library
- Using Heroicons (outline style)
- Stroke width: 2px
- Consistent sizing across components

### Icon Sizes
- Small: 16px (w-4 h-4)
- Medium: 20px (w-5 h-5)
- Large: 24px (w-6 h-6)
- XL: 32px (w-8 h-8)

## Special Effects

### Gradient Avatars
```css
background: linear-gradient(135deg, 
  rgb(99, 102, 241) 0%, 
  rgb(168, 85, 247) 50%, 
  rgb(236, 72, 153) 100%
);
```

### Box Shadows
- **Default**: `0 2px 8px rgba(0, 0, 0, 0.2)`
- **Hover**: `0 4px 12px rgba(0, 0, 0, 0.3)`
- **Cards**: Subtle elevation on hover

### Border Radius
- **Small**: 4px (rounded)
- **Medium**: 8px (rounded-lg)
- **Large**: 12px (rounded-xl)
- **XL**: 16px (rounded-2xl)
- **Full**: 9999px (rounded-full)

## Component-Specific Styles

### Navbar Search
- Combined input + button design
- Voice search button with rounded hover
- Smooth focus transition
- Placeholder: Secondary text color

### Video Thumbnail Overlay
- Duration badge: Bottom right corner
- Background: Black 80% opacity
- Small padding: 2px 4px
- Font: Extra small, semibold

### User Avatar
- Gradient background (Purple to Pink)
- First letter of username in uppercase
- White text, semibold
- Hover: Ring effect (2px gray ring)

### Category Pills
- Active: White background, black text
- Inactive: Gray background, white text
- Hover animation on background
- Smooth color transitions

## Best Practices

### Performance
- Use CSS transforms for animations (GPU accelerated)
- Minimize repaints with `will-change` on animated elements
- Lazy load images with proper placeholders

### Maintainability
- Use Tailwind's custom color variables
- Keep consistent spacing scale (4px base)
- Follow component composition patterns
- Document custom utilities

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers via PostCSS
- Progressive enhancement approach

## Implementation Files

### Core Style Files
1. **`src/index.css`**: Global styles, Tailwind directives
2. **`src/App.css`**: Custom utilities, animations
3. **`tailwind.config.js`**: Theme configuration
4. **`postcss.config.js`**: PostCSS plugins

### Component Styles
- All components use Tailwind utility classes
- Custom styles in App.css for special cases
- Inline styles avoided except for dynamic values

## Dark Theme (Default)

The entire application uses a dark theme by default:
- Background: Very dark gray (`#0f0f0f`)
- Surface: Slightly lighter gray (`#1a1a1a`)
- Borders: Subtle gray tones
- Text: High contrast white/gray

This matches YouTube's modern dark mode interface.

## Mobile Responsiveness

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile Optimizations
- Stack navigation elements on small screens
- Reduce padding and margins
- Adjust font sizes for readability
- Touch-friendly tap targets (min 44x44px)
- Simplified search on mobile

## Future Enhancements

### Potential Additions
- [ ] Light theme toggle
- [ ] Custom font loading
- [ ] Skeleton loading states
- [ ] Micro-interactions
- [ ] Advanced animations
- [ ] Accessibility improvements
- [ ] RTL language support
- [ ] High contrast mode

---

**Last Updated**: November 6, 2025  
**Version**: 1.0.0  
**Maintained By**: Vishesh Verma
