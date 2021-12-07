const pool = require('./pool');

async function getSVG (request, response) {
  await pool.connect();
    const municipio = request.params.nome;
  
    pool.Queryl.SQL.Text('SELECT ST_AsSVG(geom) FROM municipio WHERE nome ilike $1', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  async function  getViewBox (request, response) {
    await pool.connect();
    const municipio = request.params.nome;
  
    pool.query('SELECT getViewBox($1)', [municipio], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

module.exports = {getSVG, getViewBox};