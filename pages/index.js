
import Display from './Posts/[Paginate]'

export default function Home() {


  return (
    <>
      <Display />

    </>

  )
}


// export async function getServerSideProps(context) {
//   const res = await fetch("http://127.0.0.1:3000/api/Get", { headers: { "Content-Type": "application/json" } })
//   const data = await res.json()


//   return {
//     props: {
//       data
//     }
//   }
// }
