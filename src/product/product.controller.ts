import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
		UsePipes,
		ValidationPipe,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { PageDto, ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }
  @Get('get')
  @UsePipes(new ValidationPipe())
  get(@Query('page') page: number) {
    return this.productService.get(page);
  }
}
