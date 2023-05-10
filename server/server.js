
const mongoose = require('mongoose')
const Document = require("./Document")

const uri  = "mongodb+srv://db_user:bOnENxdnIlnTIyUD@cluster0.mfb37py.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


const io = require("socket.io")(3001 , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET" ,"POST"]
    }
})

const defaultValue = ""





////////////
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://db_user:bOnENxdnIlnTIyUD@cluster0.mfb37py.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
////////////

io.on("connection",async socket => {
    socket.on('get-document',async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        console.log(document)
        socket.emit('load-document',document.data)

        socket.on('send-changes' , delta => {
            socket.broadcast.to(documentId).emit("receive-changes" , delta)
        })

        socket.on("save-document" , async data => {
            await Document.findByIdAndUpdate(documentId, {data})
        })
    })

    socket.on('get-all-documents', async () => {
          console.log("getting all the documents")
          const documents = await getAllDocuments();
          socket.emit('receive-all-documents', documents);
      });
    
    console.log("connected")
})

const findOrCreateDocument = async (id) => {
    if(id == null) return
    

    const document = await Document.findById(id)
    // console.log(`document:${document}`)
    if(document) return document
    return await Document.create({_id:id ,data:defaultValue})
}

const getAllDocuments = async () =>{
    try{
    const documents = await Document.find()
    return documents
    }
    catch (err) {
        console.error(err);
    }

}