import { useRouter } from 'next/router'
import { useState } from 'react'

// export const getStaticPaths = async () => {
//   const res = await fetch('http://localhost:3000/api/ninjas')
//   // const res = await fetch('https://jsonplaceholder.typicode.com/users')
//   const ninjas = await res.json()

//   const paths = ninjas.map(ninja => {
//     return {
//       params: { id: ninja.id.toString() }
//     }
//   })

//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async ({ params }) => {
export const getServerSideProps = async ({ params }) => {
  const id = params.id
  // const res = await fetch('http://localhost:3000/api/ninjas/' + id)
  const res = await fetch('https://ninja-list-rest-api-nextjs.vercel.app/api/ninjas/' + id)
  const data = await res.json()

  return {
    props: {
      ninja: data
    }
  }
}

const Details = ({ ninja }) => {
  const [id, setId] = useState(ninja.id)
  const [name, setName] = useState(ninja.name)
  const [email, setEmail] = useState(ninja.email)
  const [website, setWebsite] = useState(ninja.website)
  const [city, setCity] = useState(ninja.city)
  const [isEdit, setIsEdit] = useState(false)

  const router = useRouter()

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleDelete = () => {
    // fetch('http://localhost:3000/api/ninjas/' + ninja.id, {
    fetch('https://ninja-list-rest-api-nextjs.vercel.app/api/ninjas/' + ninja.id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        const { msg } = data
        console.log(msg)
        router.push('/')
      })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const ninja = { id, name, email, website, city }

    // fetch(`http://localhost:3000/api/ninjas/${ninja.id}`, {
    fetch(`https://ninja-list-rest-api-nextjs.vercel.app/api/ninjas/${ninja.id}`, {
      method: 'PUT',
      // method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ninja)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      router.push('/')
    })
  }

  return (
    <div className="container">
      { isEdit
        ? <div className="create">
            <form onSubmit={handleSubmit}>
              <label>Ninja name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label>Ninja email:</label>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label>Ninja website:</label>
              <input
                type="text"
                required
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
              <label>Ninja City:</label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <div className="btn">
                <button>Save</button>
              </div>
            </form>
            <style jsx>{`
            .create { 
              max-width: 400px; 
              margin: 0 auto;
              text-align: center
              border: 1px solid red;
            }
            .create label {
              text-align:left;
              display: block;
            }
            .create input {
              width: 100%;
              padding: 6px 10px;
              margin: 10px 0;
              border: 1px solid #ddd;
              box-sizing: border-box;
              display: block;
            }
            .create .btn {
              display: flex;
              justify-content: center;
            }
            .create button {
              background: #f1356d;
              color: #fff;
              border: 0;
              padding: 8px;
              border-radius: 8px;
              cursor: pointer;
            }
          `}</style>
        </div>
        : <div className="content">
          <h1>{ninja.name}</h1>
          <p>{ninja.email}</p>
          <p>{ninja.website}</p>
          <p>{ninja.city}</p>
          <button style={{ marginRight: '1rem' }} onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      }
      <style>{`
        .container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Details
