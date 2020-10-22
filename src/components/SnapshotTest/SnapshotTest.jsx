import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

//https://dev.to/nicomartin/how-to-test-async-react-hooks-392j

const SnapshotTest = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `https://api.github.com/repos/ant-design/ant-design`
      )
      setData(result)
      console.log(55, result)
    }
    fetchData()
  }, [])

  if (!data) return <div>loading...</div>

  return <div>{data.default_branch}</div>
}

export default SnapshotTest
