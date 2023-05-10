import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid"
import "./DocumentCard.css"



export default function DocumentCard({ id, imageSrc, url }) {
  return (
 
    <div className="card" >
      {id === "empty" ? 
      <div>
        <img src={imageSrc} alt="no image" />
        <Link to={`${url}${uuidV4()}`}>Create new document</Link>
      </div>
      : 
      <div>
        <img src={imageSrc} alt="no image" />
        <Link to={`${url}${id}`}>{id}</Link>
      </div>}
    </div>
  )
}
