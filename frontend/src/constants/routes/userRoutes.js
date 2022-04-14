const userRoutesDefault = '/user';
const userRoutes = {
  get: {
    url: `${userRoutesDefault}/get`
  },
  getByEmail: {
    url: `${userRoutesDefault}/get/email`
  },
  create: {
    url: `${userRoutesDefault}/create`
  },
  update: {
    url: `${userRoutesDefault}/edit`
  },
  updatePassword: {
    url: `${userRoutesDefault}/edit/password`
  },
  deleteUser: {
    url: `${userRoutesDefault}/delete`
  },
  recoveryPassword: {
    url: `${userRoutesDefault}/recovery-password`
  },
  codeVerificationValidate: {
    url: `${userRoutesDefault}/code-verification`
  },

  calculateCart: {
    url: `${userRoutesDefault}/cart/calculate`
  },
  getAllCart: {
    url: `${userRoutesDefault}/cart`
  },
  addCart: {
    url: `${userRoutesDefault}/cart`
  },
  deleteCart: {
    url: `${userRoutesDefault}/cart`
  },
  deleteAllCart: {
    url: `${userRoutesDefault}/cart`
  },
  getMyShopping: {
    url: `${userRoutesDefault}/shopping`
  }
}

export default userRoutes;