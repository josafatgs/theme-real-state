# Real Estate Shopify Theme

## Problemas Solucionados

Este tema ha sido corregido para funcionar correctamente en Shopify. Los siguientes problemas han sido resueltos:

### 1. Archivos CSS faltantes
- Se crearon los archivos `section-header.css` y `section-footer.css`
- Se eliminaron referencias a archivos CSS inexistentes

### 2. Estructura de secciones simplificada
- Se simplificó el template `index.liquid` para usar la estructura correcta de Shopify
- Se eliminaron bloques complejos que causaban errores

### 3. Configuración del tema
- Se creó el archivo `settings_data.json` con configuraciones por defecto
- Se establecieron valores predeterminados para todos los settings

### 4. Secciones optimizadas
- Se simplificaron las secciones `hero`, `benefits`, `testimonials` y `lead-form`
- Se eliminaron dependencias complejas de JavaScript

## Instalación

1. Comprimir todos los archivos en un archivo ZIP
2. Subir el archivo ZIP a Shopify Admin > Temas > Agregar tema
3. Publicar el tema

## Configuración Recomendada

Después de instalar el tema:

1. **Logo**: Subir logo en Personalizar tema > Configuración del tema > Logo
2. **Colores**: Ajustar colores en Personalizar tema > Configuración del tema > Colores
3. **Información de contacto**: Configurar teléfono y WhatsApp en Configuración del tema
4. **Contenido del hero**: Personalizar título y subtítulo en Configuración del tema > Hero Section

## Características

- Diseño responsivo optimizado para móviles
- Secciones para bienes raíces: Hero, Beneficios, Testimonios, Formulario de contacto
- Integración con WhatsApp
- SEO optimizado
- Colores y tipografías personalizables

## Soporte

Si encuentras algún problema:

1. Verifica que todos los archivos estén presentes
2. Revisa la consola del navegador para errores JavaScript
3. Asegúrate de que las configuraciones del tema estén completas

## Archivos Principales

- `layout/theme.liquid` - Layout principal
- `templates/index.liquid` - Página de inicio
- `sections/` - Secciones del tema
- `assets/` - CSS, JavaScript e imágenes
- `config/` - Configuraciones del tema