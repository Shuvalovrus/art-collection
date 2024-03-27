import { Card } from "antd"

import "./ArtCard.css"

const ArtCard = ({ item }) => {
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
