//Importar tipo de persistencia desde json y sus url para mongo
class PersistenciaFactory {

  constructor() { }

  getPersistencia(tipo) {
    try {
      let modulo = require(`${__dirname}/persistencias/${tipo}.js`);
      return modulo
    } catch (error) {
      console.log('No se encontro el tipo de persistencia:', error);
    }
  }
}


module.exports = new PersistenciaFactory();