import CategoryProductFilters from '../../../interfaces/Product/CategoryProductFilters';
import { ProductInterface } from './../../../interfaces/ProductInterface';

export default interface IProductRepository {
  create({ name, description, price, category, advertiser, licenseType, rating }: ProductInterface): Promise<ProductInterface>;
  getAll(): Promise<any>;
  getAllWithFilter(filter: CategoryProductFilters): Promise<any>;
}