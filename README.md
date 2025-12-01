## Tecnologias

- **Node.js** con **NestJS**
- **TypeORM** como ORM
- **MySQL** como base de datos
- **Docker** y **Docker Compose** para contenedores

## Requisitos Previos

- Docker y Docker Compose instalados
- Node.js 20+ (para desarrollo local)
- Yarn (para desarrollo local)

## Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```env
PRECIO_USD=1435

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=products_db

PORT=3000

# Entorno
NODE_ENV=development
```


## Ejecucion con Docker

### Iniciar todos los servicios

```bash
docker-compose up -d
```

Este comando levanta:
- **nest-products-api**: API NestJS en el puerto 3000
- **mysql-products-db**: Base de datos MySQL en el puerto 3306


## Desarrollo Local

### Instalación

```bash
yarn install
```

### Ejecutar en modo desarrollo

```bash
# Podes tener MySQL corriendo localmente o usa el contenedor de MySQL
docker-compose up -d mysql

# Correr la API
yarn start:dev
```

### Compilar para produccion

```bash
yarn build
yarn start:prod
```

## Endpoints de la API

### Base URL: `http://localhost:3000`

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/productos` | Obtener todos los productos |
| GET | `/productos/:id` | Obtener un producto por ID |
| POST | `/productos` | Crear un nuevo producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |

### Ejemplos de uso

#### Obtener todos los productos

```bash
curl http://localhost:3000/productos
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Laptop HP",
    "descripcion": "Laptop HP 15.6\" Intel Core i5 8GB RAM 256GB SSD",
    "precio": 450000,
    "precio_usd": 313.59,
    "created_at": "2025-11-29T10:00:00.000Z",
    "updated_at": "2025-11-29T10:00:00.000Z"
  }
]
```

#### Obtener un producto por ID

```bash
curl http://localhost:3000/productos/1
```

#### Crear un producto

```bash
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Smartphone Samsung",
    "descripcion": "Samsung Galaxy S24 Ultra 256GB",
    "precio": 850000
  }'
```

#### Actualizar un producto

```bash
curl -X PUT http://localhost:3000/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop HP Actualizada",
    "precio": 500000
  }'
```

#### Eliminar un producto

```bash
curl -X DELETE http://localhost:3000/productos/1
```