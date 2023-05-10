import React, { useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
// import { v4 as uuidV4 } from "uuid"
import "./HomePage.css"
import DocumentCard from './DocumentCard'
import { io } from "socket.io-client"





export default function HomePage() {

  const [socket, setSocket] = useState()
  const [documents, setDocuments] = useState()



  useEffect(() =>{
    const s = io("http://localhost:3001")
    setSocket(s)



    return () => {
      s.disconnect()
    }
  },[])

  useEffect(() =>{
    console.log("Enterd")
    if(socket == null) return
    console.log("Socket")
    socket.emit('get-all-documents'); // Emit a socket event to request documents

    socket.on('receive-all-documents', allDocuments => {
      console.log(`i receive all the documents : `)
      console.log(allDocuments)
      setDocuments(allDocuments)
      // console.log(documents); // Log the retrieved documents
    })
  },[socket])
  
    return (
        <div>
        <h1>SHARED TEXT DOCUMENT</h1>
        <h2>our documents</h2>
        <ul>
            <li>
                <DocumentCard id="empty" imageSrc="https://t4.ftcdn.net/jpg/05/09/77/07/360_F_509770790_uXFvk71S1woEbxweHob0ny87SLzGECAv.jpg" url="/documents/" />
            </li>
          { documents && documents.map(document => (
            <li key={document._id}>
              <DocumentCard id={document._id} imageSrc="https://t4.ftcdn.net/jpg/05/09/77/07/360_F_509770790_uXFvk71S1woEbxweHob0ny87SLzGECAv.jpg" url="/documents/" />
            </li>
          ))}
        </ul>
      </div>
    )
}
