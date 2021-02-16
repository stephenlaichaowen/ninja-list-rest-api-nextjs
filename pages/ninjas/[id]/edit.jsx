import { useRouter } from 'next/router'
import { useState } from 'react'

export const getServerSideProps = async ({ params }) => {
  const id = params.id

  const res = await fetch('http://localhost:3000/api/ninjas/' + id)
  const data = await res.json()

  return {
    props: {
      ninja: data
    }
  }
}

export default function Edit({ ninja }) {

  const [name, setName] = useState(ninja.name)
  const [email, setEmail] = useState(ninja.email)
  const [website, setWebsite] = useState(ninja.website)
  const [city, setCity] = useState(ninja.city)

  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()

    const ninja = { name, email, website, city }
    // console.log(ninja)

    fetch('http://localhost:3000/api/ninjas/' + ninja.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, website, city
      })
    })
    .then(res => res.json())    
    .then(data => { 
      const { msg } = data
      console.log(msg)
      router.push('/')
    })
  }

  return (
    <div className="create">
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
  )
}
