"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

 class App {
  
   __init() {this.PORT = process.env.PORT || 3000}

  constructor() {;App.prototype.__init.call(this);
    this.express = _express2.default.call(void 0, );
    this.listen();
    this.middleware();
    this.database();
    this.routes();
  }

   getApp()  {
    return this.express;
  }

   middleware()  {
    this.express.use(_cors2.default.call(void 0, ));
  }

   routes()  {
    this.express.get('/', (req, res) => {
      res.status(200).json({ message: 'Olá' });
    });
  }

   database()  {
    try {
      _mongoose2.default.connect('mongodb+srv://sa:senha123@projetointegradof.hdic9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      });

      console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
    } catch (err) {
      console.log(`Erro ao estabelecer conexão com o Banco de Dados: ${err}`);
    }
  }

   listen()  {
    this.express.listen(this.PORT, () => {
      console.log(`Servidor rodando na porta ${this.PORT}`)
    });
  }
} exports.App = App;