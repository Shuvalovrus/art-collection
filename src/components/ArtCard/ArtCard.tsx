import { Card } from "antd"

import "./ArtCard.css"

interface Item {
  id: number
  title: string
  culture: string
  primaryimageurl: string
}

interface Props {
  item: Item
}

const ArtCard = ({ item }: Props) => {
  return (
    <Card hoverable className="art-card" title={item.title}>
      <div className="art-card__content">
        <img
          alt={item.title}
          src={item.primaryimageurl}
          className="art-card__image"
        />
      </div>
    </Card>
  )
}

export default ArtCard
