import { Button, List } from "antd"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ArtCard from "../ArtCard/ArtCard"
import "./CardList.css"
import { fetchCards, selectAllCards } from "./cardsApiSlice"

const CardList = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectAllCards)
  const cardStatus = useAppSelector(state => state.cards.status)
  const isLoading = cardStatus === "loading"

  const onLoadMore = async () => {
    dispatch(fetchCards(cards.length / 10 + 1))
  }

  useEffect(() => {
    if (cardStatus === "idle") {
      dispatch(fetchCards(1))
    }
  }, [cardStatus, dispatch])

  const loadMore = !isLoading ? (
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
      loading={isLoading}
      dataSource={cards}
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
