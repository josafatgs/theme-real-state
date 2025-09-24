# Guía de Configuración de Metafields para Propiedades

## Metafields Disponibles

### Información Básica
- **location**: Ubicación general (ej: "Zona Norte, Monterrey")
- **property_type**: Tipo de propiedad (casa, departamento, terreno, etc.)
- **property_status**: Estado (disponible, vendida, rentada, etc.)

### Especificaciones Físicas
- **bedrooms**: Número de recámaras (0-20)
- **bathrooms**: Número de baños completos (decimal permitido)
- **half_bathrooms**: Número de medios baños (0-10)
- **square_meters**: Metros cuadrados de construcción (1-10,000)
- **lot_size**: Tamaño del terreno en m² (0-50,000)
- **year_built**: Año de construcción (1900-2030)
- **parking_spaces**: Espacios de estacionamiento (0-20)

### Ubicación Detallada
- **neighborhood**: Colonia o fraccionamiento
- **city**: Ciudad
- **state**: Estado
- **postal_code**: Código postal
- **latitude**: Coordenada de latitud (para mapas)
- **longitude**: Coordenada de longitud (para mapas)

### Información Financiera
- **maintenance_fee**: Cuota mensual de mantenimiento
- **property_tax**: Impuesto predial anual

### Características y Amenidades
- **features**: Características especiales (separadas por comas)
  - Ejemplo: "Cocina integral, Closets empotrados, Pisos de mármol"
- **amenities**: Amenidades del desarrollo (separadas por comas)
  - Ejemplo: "Alberca, Gimnasio, Área de juegos, Seguridad 24/7"

### Multimedia
- **virtual_tour_url**: Enlace al tour virtual
- **video_url**: Enlace al video de la propiedad

### Información del Agente
- **agent_name**: Nombre del agente responsable
- **agent_phone**: Teléfono del agente
- **agent_email**: Email del agente

## Cómo Configurar los Metafields en Shopify

### 1. Acceder a Metafields
1. Ve a **Configuración > Metafields**
2. Selecciona **Productos**
3. Haz clic en **Agregar definición**

### 2. Crear Metafields Básicos

#### Ejemplo: Recámaras
- **Namespace y clave**: `custom.bedrooms`
- **Nombre**: Recámaras
- **Descripción**: Número de recámaras de la propiedad
- **Tipo de contenido**: Número entero
- **Validación**: Mínimo 0, Máximo 20

#### Ejemplo: Ubicación
- **Namespace y clave**: `custom.location`
- **Nombre**: Ubicación
- **Descripción**: Ubicación específica de la propiedad
- **Tipo de contenido**: Línea de texto
- **Validación**: Máximo 100 caracteres

### 3. Asignar Metafields a Productos

1. Ve a **Productos**
2. Selecciona una propiedad
3. Desplázate hasta la sección **Metafields**
4. Completa los campos según la propiedad

## Ejemplo de Uso Completo

### Casa en Venta - Ejemplo
```
Título: Casa en Residencial Los Pinos
Precio: $2,500,000 MXN
Descripción: Hermosa casa de dos plantas en exclusivo residencial...

Metafields:
- location: "Residencial Los Pinos, San Pedro"
- property_type: "casa"
- bedrooms: 3
- bathrooms: 2.5
- square_meters: 180
- lot_size: 200
- year_built: 2020
- parking_spaces: 2
- neighborhood: "Los Pinos"
- city: "San Pedro Garza García"
- state: "Nuevo León"
- postal_code: "66220"
- features: "Cocina integral, Closets empotrados, Jardín, Terraza"
- amenities: "Alberca, Gimnasio, Área de juegos, Seguridad 24/7"
```

## Consejos de Uso

### Para Mejores Resultados:
1. **Completa todos los campos relevantes** - Más información = mejor experiencia
2. **Usa formato consistente** - Mantén el mismo estilo en todas las propiedades
3. **Separa características por comas** - Para features y amenities
4. **Incluye coordenadas** - Para mostrar mapas (opcional)
5. **Actualiza el estado** - Cambia property_status cuando se venda/rente

### Campos Obligatorios Recomendados:
- location
- property_type
- bedrooms (si aplica)
- bathrooms (si aplica)
- square_meters

### Campos Opcionales pero Útiles:
- features
- amenities
- agent_name
- virtual_tour_url

## Troubleshooting

### Problema: Los metafields no aparecen
**Solución**: Verifica que el namespace sea exactamente `custom` y la clave coincida

### Problema: Los valores no se muestran en la página
**Solución**: Revisa que el template de producto esté usando la sintaxis correcta:
```liquid
{{ product.metafields.custom.bedrooms }}
```

### Problema: Formato de dinero incorrecto
**Solución**: Para campos de dinero, usa el tipo "Money" en Shopify y el filtro `| money` en Liquid