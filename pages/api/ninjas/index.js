// local data
import { ninjas } from '../../../data'
import fs from 'fs'

// export default async (req, res) => {
module.exports = (req, res) => {  
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // const result = await fetch('https://jsonplaceholder.typicode.com/users')
        // const ninjas = await result.json()
        // res.json(ninjas)     

        // const ninjas = JSON.parse(fs.readFileSync('data.json'))
        // res.json(ninjas) 

        fs.readFile('data.json', (err, data) => {
          if (err) throw err
      
          const ninjas = JSON.parse(data)
          res.json(ninjas) 
        })

      } catch (error) {
        res.json({ msg: error })
      }
      break
    case 'POST':
      const { id, name, email, website, city } = req.body

      try {
        // await fetch('https://jsonplaceholder.typicode.com/users', {
        //   method: 'POST',
        //   headers: { '': 'application/json' },
        //   body: JSON.stringify({ name, email, website, city })
        // })

        const ninjas = JSON.parse(fs.readFileSync('data.json'))
        ninjas.push({ id, name, email, website, city })
        // ninjas.push(req.body)

        fs.writeFile('data.json', JSON.stringify(ninjas, null, 2), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });

        res.json({ 
          ninja: req.body,
          msg: 'write data successfully' 
        })
      } catch (error) {
        res.json({ msg: error })
      }
  }



}