import fs from 'fs'

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        /* fetch jsonplaceholder
        const result = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
        const ninja = await result.json()           
        res.json(ninja)    
        console.log(ninja)
        */
        
        /* readFile() */
        // fs.readFile('data.json', (err, data) => {
        //   if (err) throw err
      
        //   const ninjas = JSON.parse(data)        
        //   const ninja = ninjas.find(ninja => ninja.id === id)

        //   res.json(ninja)   
        // })
        
        const ninjas = JSON.parse(fs.readFileSync('/data.json'))        
        const ninja = ninjas.find(ninja => ninja.id === req.query.id)
        // console.log(ninja)
        res.json(ninja) 

      } catch (error) {
        res.json({ msg: error })
      }
      break
    case 'PATCH':
      const { name, email, website, city } = req.body

      try {
        const ninjas = JSON.parse(fs.readFileSync('/data.json'))
        ninjas.push({ id, name, email, website, city })
        // ninjas.push(req.body)

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
        /* fetch jasonplaceholder
        fetch('https://jsonplaceholder.typicode.com/users/' + id, {
          method: 'DELETE'
        })
        .then(() => {
          res.json({ msg: `ninja_id:${id} has been deleted` })  
        })
        */

        fs.readFile('data.json', (err, data) => {
          if (err) throw err
      
          let ninjas = JSON.parse(data)              
          ninjas = ninjas.filter(ninja => ninja.id !== req.query.id)

          fs.writeFile('/data.json', JSON.stringify(ninjas, null, 2), (err) => {
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