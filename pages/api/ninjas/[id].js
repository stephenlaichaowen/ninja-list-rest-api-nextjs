import fs from 'fs'
import path from 'path'

export default async (req, res) => {
  // module.exports = (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // const ninjas = JSON.parse(fs.readFileSync(path.resolve('./public/data.json')))        
        const ninjas = JSON.parse(fs.readFileSync('data.json'))
        const ninja = ninjas.find(ninja => ninja.id === req.query.id)
        // console.log(ninja)
        res.json(ninja)

      } catch (error) {
        res.json({ msg: error })
      }
      break
    case 'PUT':
    // case 'PATCH':
      const { id, name, email, website, city } = req.body
      console.log('received data: ' + name, email, website, city)

      console.log(req.query.id)

      try {
        let ninjas = JSON.parse(fs.readFileSync('data.json'))
        
        const foundIndex = ninjas.findIndex(ninja => ninja.id === id);
        ninjas[foundIndex] = { id, name, email, website, city }

        fs.writeFile('data.json', JSON.stringify(ninjas, null, 2), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });

        res.json({
          ninja: { id, name, email, website, city },
          msg: 'write data successfully'
        })
      } catch (error) {
        res.json(error)
      }
      break
    case 'DELETE':
      try {
        fs.readFile('data.json', (err, data) => {
          if (err) throw err

          let ninjas = JSON.parse(data)
          ninjas = ninjas.filter(ninja => ninja.id !== req.query.id)

          fs.writeFile('data.json', JSON.stringify(ninjas, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });

          res.json(ninjas)
        })
      } catch (error) {
        res.json({ msg: error })
      }
  }
}