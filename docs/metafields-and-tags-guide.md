# Guía de Metafields y Tags para Propiedades

## Introducción

Este documento explica cómo configurar y utilizar los metafields personalizados y el sistema de tags para gestionar propiedades en el tema de Shopify para bienes raíces.

## Metafields Configurados

### Información Básica de la Propiedad

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Ubicación | `custom.location` | Texto | Ubicación específica de la propiedad |
| Recámaras | `custom.bedrooms` | Número entero | Número de recámaras |
| Baños | `custom.bathrooms` | Número decimal | Número de baños completos |
| Medios Baños | `custom.half_bathrooms` | Número entero | Número de medios baños |
| Metros Cuadrados | `custom.square_meters` | Número entero | Superficie total en m² |
| Tamaño del Terreno | `custom.lot_size` | Número entero | Superficie del terreno en m² |
| Tipo de Propiedad | `custom.property_type` | Texto | casa, departamento, terreno, etc. |
| Estado | `custom.property_status` | Texto | disponible, vendida, rentada, etc. |
| Año de Construcción | `custom.year_built` | Número entero | Año de construcción |
| Estacionamientos | `custom.parking_spaces` | Número entero | Número de espacios |

### Ubicación Detallada

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Colonia/Fraccionamiento | `custom.neighborhood` | Texto | Nombre de la colonia |
| Ciudad | `custom.city` | Texto | Ciudad |
| Estado | `custom.state` | Texto | Estado |
| Código Postal | `custom.postal_code` | Texto | CP |
| Latitud | `custom.latitude` | Número decimal | Coordenada GPS |
| Longitud | `custom.longitude` | Número decimal | Coordenada GPS |

### Características y Amenidades

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Características | `custom.features` | Texto multilínea | Lista separada por comas |
| Amenidades | `custom.amenities` | Texto multilínea | Lista separada por comas |

### Información Financiera

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Cuota de Mantenimiento | `custom.maintenance_fee` | Dinero | Cuota mensual |
| Predial Anual | `custom.property_tax` | Dinero | Impuesto anual |

### Multimedia

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Tour Virtual | `custom.virtual_tour_url` | URL | Enlace al tour virtual |
| Video | `custom.video_url` | URL | Enlace al video |

### Información del Agente

| Metafield | Namespace.Key | Tipo | Descripción |
|-----------|---------------|------|-------------|
| Nombre del Agente | `custom.agent_name` | Texto | Nombre completo |
| Teléfono del Agente | `custom.agent_phone` | Texto | Número de contacto |
| Email del Agente | `custom.agent_email` | Texto | Correo electrónico |

## Sistema de Tags

### Tags de Tipo de Propiedad

- `casa` - Casa unifamiliar
- `departamento` - Departamento o condominio
- `terreno` - Terreno o lote
- `local_comercial` - Local comercial
- `oficina` - Espacio de oficina
- `bodega` - Bodega o almacén

### Tags de Tipo de Transacción

- `venta` - Propiedad en venta
- `renta` - Propiedad en renta

### Tags de Rangos de Precio

- `precio-0-500000` - Hasta $500,000 MXN
- `precio-500000-1000000` - $500,000 - $1,000,000 MXN
- `precio-1000000-2000000` - $1,000,000 - $2,000,000 MXN
- `precio-2000000-5000000` - $2,000,000 - $5,000,000 MXN
- `precio-5000000-plus` - Más de $5,000,000 MXN

### Tags de Ubicación

Usar el formato `ubicacion-nombre-zona`:

- `ubicacion-centro` - Zona centro
- `ubicacion-zona-norte` - Zona norte
- `ubicacion-zona-sur` - Zona sur
- `ubicacion-zona-este` - Zona este
- `ubicacion-zona-oeste` - Zona oeste
- `ubicacion-residencial-campestre` - Zona residencial campestre

### Tags de Recámaras

- `recamaras-1` - 1 recámara
- `recamaras-2` - 2 recámaras
- `recamaras-3` - 3 recámaras
- `recamaras-4` - 4 recámaras
- `recamaras-5-plus` - 5 o más recámaras

### Tags de Estado

- `disponible` - Propiedad disponible
- `vendida` - Propiedad vendida
- `rentada` - Propiedad rentada
- `en_proceso` - En proceso de venta/renta
- `reservada` - Propiedad reservada

### Tags Especiales

- `destacada` - Propiedad destacada
- `nueva` - Propiedad nueva
- `precio-reducido` - Precio reducido
- `oportunidad` - Oportunidad de inversión
- `exclusiva` - Propiedad exclusiva

## Configuración de Colecciones

### Colecciones Principales

1. **Todas las Propiedades** (`propiedades`)
   - Contiene todos los productos
   - Ordenamiento manual

2. **Por Tipo de Propiedad**
   - `casas` - Filtrado por tag "casa"
   - `departamentos` - Filtrado por tag "departamento"
   - `terrenos` - Filtrado por tag "terreno"
   - `comerciales` - Filtrado por tags comerciales

3. **Por Tipo de Transacción**
   - `venta` - Filtrado por tag "venta"
   - `renta` - Filtrado por tag "renta"

4. **Colecciones Especiales**
   - `destacadas` - Filtrado por tag "destacada"
   - `nuevas` - Propiedades recientes (últimos 30 días)

## Cómo Agregar una Nueva Propiedad

### Paso 1: Crear el Producto en Shopify

1. Ve a Productos > Agregar producto
2. Completa título, descripción y precio
3. Sube las imágenes de la propiedad

### Paso 2: Configurar Metafields

1. En la sección de metafields del producto, completa:
   - Información básica (recámaras, baños, m², etc.)
   - Ubicación detallada
   - Características y amenidades
   - Información financiera (si aplica)
   - URLs de multimedia (si aplica)
   - Información del agente responsable

### Paso 3: Aplicar Tags

Aplica los tags correspondientes según:

1. **Tipo de propiedad**: `casa`, `departamento`, `terreno`, etc.
2. **Tipo de transacción**: `venta` o `renta`
3. **Rango de precio**: Según el precio del producto
4. **Ubicación**: Usando el formato `ubicacion-nombre-zona`
5. **Recámaras**: Según el número de recámaras
6. **Estado**: `disponible`, `vendida`, etc.
7. **Tags especiales**: `destacada`, `nueva`, etc. (si aplica)

### Paso 4: Asignar a Colecciones

Las colecciones automáticas se actualizarán según los tags aplicados. Para colecciones manuales como "destacadas", agregar manualmente.

## Reglas de Auto-Tagging

El sistema incluye reglas automáticas para aplicar tags basados en:

- Tipo de propiedad (metafield `custom.property_type`)
- Rango de precio (basado en el precio del producto)
- Número de recámaras (metafield `custom.bedrooms`)

## Filtros en la Página de Colección

Los filtros disponibles incluyen:

1. **Tipo de propiedad** - Basado en tags de tipo
2. **Recámaras** - Basado en tags de recámaras
3. **Ubicación** - Basado en tags de ubicación
4. **Rango de precio** - Basado en tags de precio

## Mejores Prácticas

### Para Metafields

1. **Consistencia**: Usa siempre el mismo formato para datos similares
2. **Completitud**: Llena todos los metafields relevantes para cada propiedad
3. **Precisión**: Verifica que los datos sean correctos antes de publicar
4. **Multimedia**: Incluye URLs de tours virtuales y videos cuando estén disponibles

### Para Tags

1. **Estandarización**: Usa siempre los tags predefinidos
2. **Ubicaciones**: Mantén consistencia en los nombres de ubicación
3. **Actualización**: Actualiza el estado de la propiedad cuando cambie
4. **Limpieza**: Remueve tags obsoletos regularmente

### Para Colecciones

1. **Organización**: Mantén las colecciones organizadas por criterios claros
2. **Nombres**: Usa nombres descriptivos y consistentes
3. **Descripciones**: Incluye descripciones útiles para SEO
4. **Ordenamiento**: Configura el ordenamiento apropiado para cada colección

## Solución de Problemas

### Metafields No Aparecen

1. Verifica que el metafield esté configurado correctamente
2. Asegúrate de que el namespace y key coincidan exactamente
3. Revisa que el producto tenga valor en ese metafield

### Filtros No Funcionan

1. Verifica que los tags estén aplicados correctamente
2. Asegúrate de que el JavaScript de filtros esté funcionando
3. Revisa la consola del navegador para errores

### Colecciones Vacías

1. Verifica las reglas de la colección
2. Asegúrate de que los productos tengan los tags correctos
3. Revisa que los productos estén publicados

## Archivos de Configuración

- `config/metafields.json` - Definición de metafields
- `config/collections.json` - Configuración de colecciones
- `config/tags.json` - Sistema de tags y reglas
- `locales/es.json` - Traducciones en español
- `templates/product.liquid` - Template de producto con metafields
- `templates/collection.liquid` - Template de colección con filtros
- `snippets/property-card.liquid` - Componente de tarjeta de propiedad