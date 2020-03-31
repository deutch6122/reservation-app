const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const FakeDb = require('./fake-db')

const productRoutes = require('./route/products')
const path = require('path')

// 直書きのことハードコーディングとも言う
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    if(process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb()
      // fakeDb.initDb()
    }
  }
)



const app = express()

// /api/v1/productへのアクセスでproductRoutesモジュールに移行。
app.use('/api/v1/products', productRoutes)

if(process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'reservation-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}


// app.get('/products', function(req, res){
//   res.json({'success': true})
// })


const PORT = process.env.PORT || '3001'

app.listen('3001', function(){
  console.log('I am running!')
})

// Node.jsのawait asyncについて
// 処理1を待たずに処理2が進んでしまうことを防ぐ目的の技術
// 今回はデータベースの情報を削除した後に、サンプルデータを追加する処理にするために利用
