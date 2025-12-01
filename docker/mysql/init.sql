-- Script de inicialización de la base de datos
-- Este script se ejecuta automáticamente al crear el contenedor MySQL

USE products_db;

-- Crear la tabla productos si no existe
CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo (opcional)
INSERT INTO productos (nombre, descripcion, precio) VALUES
    ('Laptop HP', 'Laptop HP 15.6" Intel Core i5 8GB RAM 256GB SSD', 450000.00),
    ('Mouse Logitech', 'Mouse inalámbrico Logitech M170', 15000.00),
    ('Teclado Mecánico', 'Teclado mecánico RGB switches blue', 35000.00),
    ('Monitor Samsung', 'Monitor Samsung 24" Full HD LED', 120000.00),
    ('Auriculares Sony', 'Auriculares Sony WH-1000XM4 Bluetooth', 280000.00);
