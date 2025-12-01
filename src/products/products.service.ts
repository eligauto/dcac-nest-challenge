import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private getPrecioUsd(): number {
    const precioUsd = parseFloat(process.env.PRECIO_USD || '1');
    return precioUsd;
  }

  private formatProductResponse(product: Product) {
    const precioUsd = this.getPrecioUsd();
    return {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: parseFloat(product.precio.toString()),
      precio_usd: parseFloat((parseFloat(product.precio.toString()) / precioUsd).toFixed(2)),
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return this.formatProductResponse(savedProduct);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products.map((product) => this.formatProductResponse(product));
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return this.formatProductResponse(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    return this.formatProductResponse(updatedProduct);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    await this.productRepository.remove(product);
    return { message: `Producto con id ${id} eliminado correctamente` };
  }
}
