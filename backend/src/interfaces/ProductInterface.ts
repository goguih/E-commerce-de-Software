export interface ProductInterface {
  _id?: string,
  name: string,
  description: string,
  price: number,
  category: number,
  advertiser?: string,
  licenseType: number,
  rating?: number,
}