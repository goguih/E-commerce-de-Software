export const constants = {
  database: {
    url: {
      prod: 'mongodb+srv://sa:senha123@projetointegradof.hdic9.mongodb.net/ProjetoIntegradoF_prod?retryWrites=true&w=majority',
      local: 'mongodb+srv://sa:senha123@projetointegradof.hdic9.mongodb.net/ProjetoIntegradoF?retryWrites=true&w=majority',
      mbrunharalocal: 'mongodb://localhost:27017/ProjetoIntegradoF'
    }
  },
  mail: {
    emailFrom: 'projetointegradof@gmail.com',
    sendGrid: {
      apiKey: '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',
      templateId: 'd-7cb7c4562bd14e0d9f0d7880799233be',
    },
  }
}