import { Button, List } from "antd"
import { useEffect, useState } from "react"

import ArtCard from "../ArtCard/ArtCard"
import "./CardList.css"

const CardList = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const fetchData = async page => {
    try {
      const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=b32e07c4-2a7c-4f05-aea1-0be744328ef4&hasimage=1&classification=26&page=${page}`,
      )
      if (!response.ok) {
        throw new Error("Error while fetch data")
      }
      const records = await response.json()

      const filteredRecords = records.records.filter(
        record => record.primaryimageurl,
      )
      const newData = [...data, ...filteredRecords]
      setData(newData)
      setInitLoading(false)
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const onLoadMore = async () => {
    setPage(page + 1)
  }

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null

  return (
    <List
      className="card-list"
      grid={{ gutter: 16, column: 5 }}
      loading={initLoading}
      dataSource={data}
      loadMore={loadMore}
      renderItem={item => (
        <List.Item>
          <ArtCard item={item} />
        </List.Item>
      )}
    ></List>
  )
}

export default CardList
