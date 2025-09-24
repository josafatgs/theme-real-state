# Real Estate Shopify Theme

## ⚠️ SOLUCIÓN PARA ERRORES LIQUID

### Error: 'section' is not a valid section type

Si ves errores como:
- `'announcement-bar' is not a valid section type`
- `'hero' is not a valid section type`

**CAUSA**: Las secciones no tienen un esquema (`{% schema %}`) válido.

**SOLUCIÓN**: ✅ **COMPLETAMENTE CORREGIDO** - Todas las secciones han sido simplificadas al máximo con esquemas básicos válidos.

### Error 404 en la página principal

Si el tema muestra una página 404 después de instalarlo, sigue estos pasos:

### Paso 1: Verificar instalación
1. Ve a **Shopify Admin > Temas**
2. Asegúrate de que el tema esté **publicado** (botón "Publicar")
3. Si no está publicado, haz clic en "Acciones" > "Publicar"

### Paso 2: Limpiar caché
1. Ve a **Shopify Admin > Configuración > Archivos**
2. Elimina cualquier archivo de caché antiguo
3. Refresca tu tienda en una ventana de incógnito

### Paso 3: Verificar archivos críticos
Asegúrate de que estos archivos estén presentes:
- `layout/theme.liquid` ✓
- `templates/index.liquid` ✓
- `sections/hero.liquid` ✓
- `config/settings_data.json` ✓

### Paso 4: Configuración inicial
1. Ve a **Personalizar tema**
2. Configura al menos:
   - Nombre de la empresa
   - Información de contacto
   - Colores básicos

## Problemas Solucionados

### ✅ Errores Liquid corregidos:
- **Secciones sin schema válido**: Todas las secciones ahora tienen `{% schema %}` correcto
- **Contenido duplicado**: Eliminado código duplicado en `benefits.liquid`, `testimonials.liquid`, `lead-form.liquid`
- **Sintaxis malformada**: Corregidos errores de sintaxis en esquemas JSON
- **Referencias inválidas**: Eliminadas referencias a archivos inexistentes

### ✅ Otros errores corregidos:
- Archivos CSS faltantes (`section-header.css`, `section-footer.css`)
- Template `index.liquid` simplificado
- Snippets básicos creados (`meta-tags.liquid`, `whatsapp-float.liquid`)
- Configuración por defecto establecida

### ✅ Optimizaciones:
- Secciones simplificadas sin dependencias complejas
- JavaScript optimizado para móviles
- SEO básico implementado
- Estructura de archivos corregida

## Instalación Paso a Paso

1. **Comprimir archivos**: Selecciona TODOS los archivos y carpetas, créalos en un ZIP
2. **Subir tema**: Shopify Admin > Temas > "Agregar tema" > "Subir archivo de tema"
3. **Esperar procesamiento**: Shopify procesará el archivo (puede tomar 1-2 minutos)
4. **Publicar**: Una vez procesado, haz clic en "Publicar"
5. **Verificar**: Visita tu tienda para confirmar que funciona

## Si Persiste el Error 404

### Opción A: Reinstalar
1. Elimina el tema actual
2. Vuelve a subir el archivo ZIP
3. Publica el tema

### Opción B: Verificar contenido
1. Ve a **Productos** y asegúrate de tener al menos un producto
2. Ve a **Páginas** y verifica que la página de inicio esté configurada
3. Ve a **Navegación** y revisa los menús

### Opción C: Contactar soporte
Si el problema persiste:
1. Verifica la consola del navegador (F12) para errores
2. Revisa los logs de Shopify
3. Contacta al soporte de Shopify

## 🏠 Características del Tema

### Página de Producto (Propiedades)
- **Galería de imágenes** con slider interactivo
- **Especificaciones completas** (recámaras, baños, m², etc.)
- **Botón de WhatsApp** para agendar citas directamente
- **Información detallada** con metafields personalizados
- **Descripción del proyecto** con formato rico
- **Call-to-action prominente** para contacto

### Metafields Incluidos
- 📍 Ubicación, tipo de propiedad, estado
- 🏠 Recámaras, baños, metros cuadrados
- 🚗 Estacionamiento, año de construcción
- ✨ Características y amenidades
- 👤 Información del agente responsable
- 🎥 Enlaces a tours virtuales y videos

### Diseño General
- Diseño responsivo optimizado para móviles
- Secciones: Hero, Beneficios, Testimonios, Formulario de contacto
- Integración completa con WhatsApp
- SEO optimizado para bienes raíces
- Colores y tipografías personalizables

## Configuración Recomendada

### Configuración mínima:
- ✅ Logo de la empresa
- ✅ Información de contacto (teléfono, email)
- ✅ Número de WhatsApp
- ✅ Colores del tema
- ✅ Título y subtítulo del hero

### Configuración de Propiedades:
- ✅ Configurar metafields (ver `docs/metafields-setup-guide.md`)
- ✅ Subir imágenes de alta calidad
- ✅ Completar especificaciones básicas
- ✅ Agregar descripción detallada

### Configuración avanzada:
- Imagen de fondo del hero
- Testimonios personalizados
- Beneficios de la empresa
- Redes sociales
- Tours virtuales y videos

## Estructura de Archivos

```
theme/
├── layout/
│   └── theme.liquid
├── templates/
│   ├── index.liquid
│   ├── product.liquid
│   └── collection.liquid
├── sections/
│   ├── hero.liquid
│   ├── benefits.liquid
│   ├── testimonials.liquid
│   ├── lead-form.liquid
│   ├── header.liquid
│   └── footer.liquid
├── assets/
│   ├── base.css
│   ├── theme.css
│   ├── section-header.css
│   ├── section-footer.css
│   └── global.js
├── snippets/
│   ├── meta-tags.liquid
│   ├── whatsapp-float.liquid
│   └── structured-data.liquid
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
└── locales/
    └── es.json
```

## Soporte Técnico

**Errores comunes y soluciones:**

1. **404 Error**: Seguir los pasos de arriba
2. **Estilos no cargan**: Verificar archivos CSS en `/assets/`
3. **JavaScript no funciona**: Revisar `global.js` y consola del navegador
4. **Secciones no aparecen**: Verificar archivos en `/sections/`
5. **Configuraciones no guardan**: Revisar `settings_schema.json`

**Para desarrolladores:**
- El tema usa CSS Grid y Flexbox
- JavaScript vanilla (sin jQuery)
- Optimizado para Core Web Vitals
- Compatible con Shopify 2.0