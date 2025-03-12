import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30 
  } from '../services/superheroeService.mjs';
  import { 
    renderizarSuperheroe, 
    renderizarListaSuperheroes 
  } from '../views/responseView.mjs';
  
  // Obtener superhéroe por ID
  export async function obtenerSuperheroePorIdController(req, res) {
    try {
      const { id } = req.params;
      const superheroe = await obtenerSuperheroePorId(id);
      if (!superheroe)
        return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
  
      const superheroeFormateado = renderizarSuperheroe(superheroe);
      res.status(200).json(superheroeFormateado);
    } catch (error) {
      res.status(500).send({ 
        mensaje: 'Error al obtener el superhéroe', 
        error: error.message 
      });
    }
  }
  
  // Obtener todos los superhéroes
  export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
      const superheroes = await obtenerTodosLosSuperheroes();
      const superheroesFormateados = renderizarListaSuperheroes(superheroes);
      res.status(200).json(superheroesFormateados);
    } catch (error) {
      res.status(500).send({ 
        mensaje: 'Error al obtener los superhéroes', 
        error: error.message 
      });
    }
  }
  
  // Buscar superhéroes por atributo
  export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
      const { atributo, valor } = req.params;
      const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
      if (superheroes.length === 0)
        return res.status(404).send({ 
          mensaje: 'No se encontraron superhéroes con ese atributo' 
        });
  
      const superheroesFormateados = renderizarListaSuperheroes(superheroes);
      res.status(200).json(superheroesFormateados);
    } catch (error) {
      res.status(500).send({ 
        mensaje: 'Error al buscar los superhéroes', 
        error: error.message 
      });
    }
  }
  
  // Obtener superhéroes mayores de 30 años
  export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
      const superheroes = await obtenerSuperheroesMayoresDe30();
      if (superheroes.length === 0)
        return res.status(404).send({ 
          mensaje: 'No se encontraron superhéroes mayores de 30 años' 
        });
  
      const superheroesFormateados = renderizarListaSuperheroes(superheroes);
      res.status(200).json(superheroesFormateados);
    } catch (error) {
      res.status(500).send({ 
        mensaje: 'Error al obtener superhéroes mayores de 30', 
        error: error.message 
      });
    }
  }