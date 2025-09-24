# Theme Settings Test Guide

## Testing Theme Customization

To test the theme settings functionality in Shopify admin:

### 1. Hero Section Settings
- Navigate to **Customize Theme** in Shopify admin
- Go to **Theme Settings** > **Hero Section**
- Test the following settings:
  - Upload a hero background image
  - Change hero title text
  - Modify hero subtitle
  - Update CTA button text and link
  - Adjust overlay opacity
  - Change text alignment (left, center, right)

### 2. Benefits Section Settings
- Go to **Theme Settings** > **Benefits Section**
- Test the following settings:
  - Update section title and subtitle
  - Modify each benefit title and description
  - Change benefit icon classes

### 3. Testimonials Section Settings
- Go to **Theme Settings** > **Testimonials Section**
- Test the following settings:
  - Update section title and subtitle
  - Modify testimonial text for each testimonial
  - Change author names and locations
  - Upload author photos

### 4. Lead Form Section Settings
- Go to **Theme Settings** > **Lead Form Section**
- Test the following settings:
  - Update form title and subtitle
  - Change submit button text
  - Modify success message
  - Change form layout (stacked/inline)

### 5. Contact Information Settings
- Go to **Theme Settings** > **Contact Information**
- Test the following settings:
  - Update WhatsApp number
  - Change default WhatsApp message
  - Update company information

### 6. Color and Typography Settings
- Go to **Theme Settings** > **Colors**
- Test changing brand colors
- Go to **Theme Settings** > **Typography**
- Test changing fonts and font scales

### 7. Footer Settings
- Go to **Theme Settings** > **Footer**
- Test updating footer content and company information
- Toggle social links and contact info display

### 8. Property Listings Settings
- Go to **Theme Settings** > **Property Listings**
- Test changing properties per page
- Modify default sort order
- Toggle filtering and property count display
- Adjust property card display options

### 9. SEO & Performance Settings
- Go to **Theme Settings** > **SEO & Performance**
- Update SEO title suffix and meta description
- Toggle lazy loading and image optimization

### 10. Advanced Settings
- Go to **Theme Settings** > **Advanced Settings**
- Test custom CSS and JavaScript functionality
- Add tracking codes (Google Analytics, Facebook Pixel)

## Expected Results

All settings should:
1. Save properly in Shopify admin
2. Reflect changes on the frontend immediately
3. Maintain proper fallback values when settings are empty
4. Work across all device sizes (mobile, tablet, desktop)

## Validation Checklist

### Core Functionality
- [ ] Hero section displays custom content from theme settings
- [ ] Benefits section shows customized benefits
- [ ] Testimonials section displays custom testimonials
- [ ] Lead form uses custom text and styling
- [ ] WhatsApp button uses correct number and message
- [ ] Footer displays custom company information
- [ ] Property listings respect display settings

### Design & Styling
- [ ] Color changes apply throughout the theme
- [ ] Typography changes are visible
- [ ] Custom CSS applies correctly
- [ ] Button and form styling follows theme settings
- [ ] Media and card styling works properly

### Performance & SEO
- [ ] Lazy loading works when enabled
- [ ] Custom JavaScript executes properly
- [ ] Google Analytics tracking code loads
- [ ] Facebook Pixel tracking code loads
- [ ] SEO meta tags display correctly

### Responsiveness & Compatibility
- [ ] All settings have proper fallback values
- [ ] Theme works on mobile and desktop
- [ ] No console errors in browser developer tools
- [ ] Settings save and load correctly in Shopify admin
- [ ] Theme customizer preview updates in real-time

### Admin Experience (Requirements 7.5 & 8.5)
- [ ] Testimonials can be easily managed through theme settings
- [ ] Property information updates through standard Shopify product interface
- [ ] All theme settings are organized logically in admin
- [ ] Settings descriptions and info text are helpful
- [ ] Default values are appropriate for real estate theme