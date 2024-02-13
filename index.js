const express=require('express')

const {mongoConnect}=require('./connection')
const { reqResLog }=require('./middlewares')
const userRouter=require('./routes/user')
const homeRouter=require('./routes/home')

const app=express()
const PORT=8000

// database connection
mongoConnect("mongodb://localhost:27017/nodejs-proj-1");

// express Middleware - Plugin
app.use(express.urlencoded({extended:false}))
app.use(reqResLog('./log.txt'))

// routes
app.use("/",homeRouter);
app.use('/api/users',userRouter);

//server start
app.listen(PORT,()=>console.log("server started at port "+PORT))


// app.get('/api/users',)
// app.post('/api/users',)

// app.get('/api/users/:id',)
// app.patch('/api/users/:id',)
// app.delete('/api/users/:id',)
