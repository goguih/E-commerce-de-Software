const paymentRoutesDefault = '/payment';

const paymentRoutes = {
  getUserPayments: {
    url: `${paymentRoutesDefault}/user`
  },
  create: {
    url: `${paymentRoutesDefault}/create`
  },

  getCard: {
    url: `${paymentRoutesDefault}/card/check`
  },
  getCardByNumber: {
    url: `${paymentRoutesDefault}/card/cardNumber`
  },
  getUserCards: {
    url: `${paymentRoutesDefault}/card/user`
  },
  addCard: {
    url: `${paymentRoutesDefault}/card`
  },
  delete: {
    url: `${paymentRoutesDefault}/card/cardNumber`
  },

  getCardBalance: {
    url: `${paymentRoutesDefault}/card/balance/cardNumber`
  },
  addCardBalance: {
    url: `${paymentRoutesDefault}/card/balance/add`
  },
  removeCardBalance: {
    url: `${paymentRoutesDefault}/card/balance/remove`
  },
}

export default paymentRoutes;