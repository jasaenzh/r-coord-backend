# R-Coord Backend

Sistema de gestión de envíos y rutas logísticas - Backend

## 📋 Requisitos

Backend

- Runtime: Node.js 18+
- Base de datos: MySQL 8+
- Cache: Redis 7+
- Gestor de paquetes: npm 9+ o yarn 1.22+

Frontend

- React 18+
- Axios para conexión API

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/jasaenzh/r-coord-backend.git
cd r-coord-backend
```

2. Configurar variables de entorno:

```bash
cp .env.example .env
# Editar el archivo .env con tus credenciales
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar migraciones (MySQL):

```bash
-- Ejecutar en tu cliente MySQL
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  state TINYINT(1) DEFAULT 1,
  role ENUM('administrador', 'empleado', 'cliente') DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipping_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tracking_number VARCHAR(20) UNIQUE NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  recipient_address TEXT NOT NULL,
  package_description TEXT,
  weight DECIMAL(10,2),
  status ENUM('En espera', 'En transito', 'Entregado') DEFAULT 'En espera',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## ⚙️ Configuración

Archivo .env requerido:

```bash
# Server
PORT=8001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=coordinadoradb

# Auth
JWT_SECRET=tu_super_secreto_jwt
JWT_EXPIRES_IN=1h

# Redis
REDIS_URL=redis://localhost:6379

# HERE Maps API
API_KEY_HERE=tu_api_key
```

## 🏃 Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm run start
```

Documentación API:
Accede a Swagger UI en:
http://localhost:8001/documentacion
