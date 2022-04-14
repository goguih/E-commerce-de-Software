import mongoose from 'mongoose';
import { constants } from '../utilities/constants';

export default class Database {
  public static connect() {
    // const databaseUrl : string = constants.database.url.prod;
    const databaseUrl : string = constants.database.url.local;
    // const databaseUrl : string = constants.database.url.mbrunharalocal;

    try {
      mongoose.connect(databaseUrl);
      console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
    } catch (err) {
      console.log(`Erro ao tentar estabelecer conexão com o Banco de Dados: ${err}`);
    }
  }
}