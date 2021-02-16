import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Create() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [city, setCity] = useState('')

  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()

    const ninja = { id: Date.now().toString(), name, email, website, city }
    // console.log(ninja)

    fetch(`${process.env.PRODUCTION}/ninjas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ninja)
    })
    .then(res => res.json)
    .then(data => { 
      console.log(data)
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
        <label>Ninja city:</label>
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
