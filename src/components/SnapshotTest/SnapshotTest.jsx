import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

//https://dev.to/nicomartin/how-to-test-async-react-hooks-392j

const SnapshotTest = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.github.com/repos/ant-design/ant-design`
      )
      setData(result.data)
    }
    fetchData()
  }, [])

  if (!data) return <div>loading...</div>

  return <div>{data.name}</div>
}

export default SnapshotTest
