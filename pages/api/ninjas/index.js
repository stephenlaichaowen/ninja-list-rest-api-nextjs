// local data
import { ninjas } from '../../../data'
import fs from 'fs'
import path from 'path'

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const ninjas = JSON.parse(fs.readFileSync('data.json'))
        res.json(ninjas) 

      } catch (error) {
        res.json({ msg: error })
      }
      break
    case 'POST':
      const { id, name, email, website, city } = req.body
      console.log(req.body)

      try {
        const ninjas = JSON.parse(fs.readFileSync('data.json'))
        // const ninjas = JSON.parse(fs.readFileSync(path.resolve('./public/data.json')))
        ninjas.push({ id, name, email, website, city })
        console.log(ninjas)

        // fs.writeFile(path.resolve('./public/data.json'), JSON.stringify(ninjas, null, 2), (err) => {
        fs.writeFile('data.json', JSON.stringify(ninjas, null, 2), (err) => {
          if (err) throw err;
          console.log('Data written to file');

          res.json({ msg: 'write data successfully' })
        });
      } catch (error) {
        res.json({ msg: error })
      }
  }



}