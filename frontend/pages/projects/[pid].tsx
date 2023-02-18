import { useRouter } from 'next/router'

const Problem = () => {
  const router = useRouter()
  const { pid } = router.query

  return (
    <>
      <h1> Problem</h1>
      {pid}
    </>
  )
}

export default Problem
