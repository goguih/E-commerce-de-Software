const productRoutesDefault = '/product';
const productRoutes = {
  create: {
    url: `${productRoutesDefault}/`
  },
  getAll: {
    url: `${productRoutesDefault}/`
  },
  getAllWithFilter: {
    url: `${productRoutesDefault}/filter`
  },
  getById: {
    url: `${productRoutesDefault}`
  }
}

export default productRoutes;