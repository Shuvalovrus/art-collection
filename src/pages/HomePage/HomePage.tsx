import { Button, Card, List } from "antd"
import { useEffect, useState } from "react"

import Header from "../../components/Header/Header"
import "./HomePage.css"

interface PictureUnit {
  title: string
  century: string
  primaryimageurl: string
}

const HomePage = () => {
  const [collection, setCollection] = useState<PictureUnit[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const fetchData = async (page: number): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=b32e07c4-2a7c-4f05-aea1-0be744328ef4&hasimage=1&classification=26&page=${page}`,
      )
      if (!response.ok) {
        throw new Error("Error while fetch data")
      }
      const data: { records: PictureUnit[] } = await response.json()

      const filteredRecords = data.records.filter(
        record => record.primaryimageurl,
      )

      setCollection(prevCollection => [...prevCollection, ...filteredRecords])
    } catch (err) {
      console.error("Error fetching data:", err.message)
    }
  }

  const loadMore = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="home">
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={collection}
        renderItem={item => (
          <List.Item>
            <Card hoverable style={{ width: 300 }} title={item.title}>
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  alt={item.title}
                  src={item.primaryimageurl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Card>
          </List.Item>
        )}
      ></List>
      <Button onClick={loadMore} style={{ marginBottom: 20 }}>
        Загрузить еще
      </Button>
    </div>
  )
}

export default HomePage
