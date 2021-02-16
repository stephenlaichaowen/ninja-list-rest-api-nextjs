import { useRouter } from 'next/router'

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
  // console.log(`id: ${id}`)
  // const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
  // const res = await fetch('http://localhost:3000/api/ninjas/' + id)
  const res = await fetch('https://ninja-list-rest-api-nextjs.vercel.app/api/ninjas/' + id)
  const data = await res.json()

  // fetch('http://localhost:3000/api/ninjas/' + id)
  // .then(res => res.json())
  // .then(data => {   })

  return {
    props: {
      ninja: data
    }
  }
}

const Details = ({ ninja }) => {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/ninjas/${ninja.id}/edit`)
    console.log(`id: ${ninja.id}`)
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

  return (
    <div className="container">
      <div className="content">
        <h1>{ ninja.name }</h1>
        <p>{ ninja.email }</p>
        <p>{ ninja.website }</p>
        <p>{ ninja.city }</p>
        <button style={{ marginRight: '1rem' }} onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
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
