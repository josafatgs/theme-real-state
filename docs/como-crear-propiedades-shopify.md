# 🏠 Cómo Crear Propiedades en Shopify

## Paso 1: Configurar Metafields (SOLO UNA VEZ)

### 1.1 Acceder a Metafields
1. Ve a **Shopify Admin**
2. **Configuración** → **Metafields**
3. Selecciona **Productos**
4. Haz clic en **Agregar definición**

### 1.2 Crear Metafields Esenciales

#### Metafield: Recámaras
- **Namespace y clave**: `custom.bedrooms`
- **Nombre**: Recámaras
- **Descripción**: Número de recámaras
- **Tipo**: Número entero
- **Validación**: Min: 0, Max: 20

#### Metafield: Baños
- **Namespace y clave**: `custom.bathrooms`
- **Nombre**: Baños
- **Descripción**: Número de baños
- **Tipo**: Número decimal
- **Validación**: Min: 0, Max: 20

#### Metafield: Metros Cuadrados
- **Namespace y clave**: `custom.square_meters`
- **Nombre**: Metros Cuadrados
- **Descripción**: Superficie en m²
- **Tipo**: Número entero
- **Validación**: Min: 1, Max: 10000

#### Metafield: Ubicación
- **Namespace y clave**: `custom.location`
- **Nombre**: Ubicación
- **Descripción**: Ubicación de la propiedad
- **Tipo**: Línea de texto
- **Validación**: Max: 100 caracteres

#### Metafield: Tipo de Propiedad
- **Namespace y clave**: `custom.property_type`
- **Nombre**: Tipo de Propiedad
- **Descripción**: Casa, departamento, etc.
- **Tipo**: Línea de texto
- **Validación**: Max: 50 caracteres

#### Metafield: Estacionamiento
- **Namespace y clave**: `custom.parking_spaces`
- **Nombre**: Estacionamiento
- **Descripción**: Espacios de estacionamiento
- **Tipo**: Número entero
- **Validación**: Min: 0, Max: 20

## Paso 2: Crear Colecciones

### 2.1 Crear Colección Principal
1. Ve a **Productos** → **Colecciones**
2. Haz clic en **Crear colección**
3. **Título**: "Propiedades"
4. **Handle**: `propiedades` (automático)
5. **Descripción**: "Todas nuestras propiedades disponibles"
6. **Tipo de colección**: Manual o Automática
7. **Guardar**

### 2.2 Crear Colecciones por Tipo
Repite el proceso para:
- **Casas** (`casas`)
- **Departamentos** (`departamentos`)
- **Terrenos** (`terrenos`)

## Paso 3: Crear una Propiedad (Producto)

### 3.1 Información Básica
1. Ve a **Productos** → **Todos los productos**
2. Haz clic en **Agregar producto**

**Título**: Casa en Residencial Los Pinos
**Descripción**: 
```
Hermosa casa de dos plantas ubicada en el exclusivo Residencial Los Pinos. 

Esta propiedad cuenta con acabados de primera calidad, amplios espacios y una ubicación privilegiada cerca de centros comerciales, escuelas y hospitales.

Características destacadas:
• Cocina integral con barra desayunadora
• Sala y comedor con doble altura
• Recámara principal con baño completo y vestidor
• Jardín trasero con asador
• Cochera techada para 2 autos

El residencial cuenta con:
• Seguridad 24/7
• Área de juegos infantiles
• Parque central
• Calles pavimentadas

¡Una excelente oportunidad de inversión!
```

### 3.2 Multimedia
**Imágenes**:
1. Sube 8-12 fotos de alta calidad
2. **Primera imagen**: Fachada principal (será la imagen destacada)
3. **Orden sugerido**:
   - Fachada
   - Sala
   - Cocina
   - Recámaras
   - Baños
   - Jardín/Terraza
   - Vista general

**Alt text para cada imagen**:
- "Casa en Residencial Los Pinos - Fachada principal"
- "Casa en Residencial Los Pinos - Sala"
- etc.

### 3.3 Precio y Disponibilidad
- **Precio**: $2,500,000.00 MXN
- **Comparar precio**: (opcional, precio anterior)
- **SKU**: CASA-LP-001 (código único)
- **Código de barras**: (dejar vacío)
- **Inventario**: 1
- **Continuar vendiendo cuando no haya inventario**: ❌ (desactivar)

### 3.4 Envío
- **Producto físico**: ❌ (desactivar)
- **Peso**: 0

### 3.5 SEO
- **Título SEO**: Casa en Venta Residencial Los Pinos - 3 Recámaras
- **Descripción SEO**: Casa de 180m² en Residencial Los Pinos. 3 recámaras, 2.5 baños, jardín, cochera. Seguridad 24/7. ¡Agenda tu cita!

### 3.6 Organización
- **Tipo de producto**: Propiedades
- **Proveedor**: Tu Inmobiliaria
- **Colecciones**: 
  - ✅ Propiedades
  - ✅ Casas
- **Tags**: casa, residencial, 3-recamaras, los-pinos, seguridad, jardin

## Paso 4: Completar Metafields

Desplázate hasta la sección **Metafields** y completa:

### Información Básica
- **Ubicación**: "Residencial Los Pinos, San Pedro Garza García"
- **Tipo de Propiedad**: "casa"
- **Recámaras**: 3
- **Baños**: 2.5
- **Metros Cuadrados**: 180
- **Estacionamiento**: 2

### Información Adicional (si configuraste estos metafields)
- **Año de Construcción**: 2020
- **Colonia**: "Los Pinos"
- **Ciudad**: "San Pedro Garza García"
- **Estado**: "Nuevo León"
- **Código Postal**: "66220"

## Paso 5: Guardar y Publicar

1. **Guardar producto**
2. **Estado**: Activo
3. **Disponibilidad**: 
   - ✅ Tienda online
   - ✅ Punto de venta (si aplica)

## Ejemplo Completo: Casa en Venta

```
TÍTULO: Casa en Residencial Los Pinos - 3 Recámaras

PRECIO: $2,500,000 MXN

DESCRIPCIÓN:
Hermosa casa de dos plantas en exclusivo residencial con seguridad 24/7.
Acabados de primera, cocina integral, jardín privado y cochera techada.

METAFIELDS:
✅ Ubicación: "Residencial Los Pinos, San Pedro"
✅ Tipo: "casa"
✅ Recámaras: 3
✅ Baños: 2.5
✅ M²: 180
✅ Estacionamiento: 2

COLECCIONES:
✅ Propiedades
✅ Casas

TAGS: casa, residencial, 3-recamaras, seguridad, jardin
```

## Consejos Importantes

### ✅ Mejores Prácticas
1. **Fotos de calidad**: Mínimo 8 fotos, máximo 20
2. **Descripción detallada**: 200-500 palabras
3. **Precio claro**: Incluye moneda (MXN)
4. **Tags útiles**: Para filtros y búsqueda
5. **SEO optimizado**: Títulos y descripciones descriptivos

### ❌ Errores Comunes
1. No completar metafields básicos
2. Fotos de baja calidad o pocas
3. Descripciones muy cortas
4. No asignar a colecciones
5. Precios sin formato claro

### 🔄 Flujo de Trabajo Recomendado
1. **Preparar contenido**: Fotos, descripción, datos
2. **Crear producto**: Información básica
3. **Subir imágenes**: En orden lógico
4. **Completar metafields**: Toda la información técnica
5. **Revisar y publicar**: Verificar que todo esté correcto

## Estados de Propiedades

### Disponible
- **Estado**: Activo
- **Inventario**: 1
- **Tag**: disponible

### Vendida
- **Estado**: Borrador o Archivado
- **Tag**: vendida
- **Nota**: Cambiar título a "VENDIDA - [Título Original]"

### En Proceso
- **Estado**: Activo
- **Tag**: en-proceso
- **Nota**: Agregar "EN PROCESO" al título

## Automatización con Tags

Usa tags para automatizar colecciones:

### Tags Sugeridos
- **Tipo**: casa, departamento, terreno
- **Recámaras**: 1-recamara, 2-recamaras, 3-recamaras
- **Precio**: economico, medio, premium
- **Estado**: disponible, vendida, rentada
- **Zona**: zona-norte, centro, zona-sur

### Colecciones Automáticas
Crea colecciones que se actualicen automáticamente:
- **Casas**: productos con tag "casa"
- **Departamentos**: productos con tag "departamento"
- **Disponibles**: productos con tag "disponible"