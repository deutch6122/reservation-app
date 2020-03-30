const Product = require('./model/product')

class FakeDb {
  constructor(){
    this.products = [
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'iPhone X',
        price: 150,
        description: '斬新デザインに高機能なSiriが特徴',
        heading1: '使い心地',
        heading2: '機能',
        heading3: 'コストパフォーマンス',
        headingtext1: '肌に程よいフィット感を与えてくれます。',
        headingtext2: '家電製品のリンクを手助けするSiri機能を強化',
        headingtext3: 'iPhone史上、高価な金額だが手に取る価値あり。'
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'ローター（中挿れ可能）',
        price: 50,
        description: '性能評価1位獲得！！　あそこの奥にまで入り込む仕様で子宮に直接振動を与えることを可能にした商品です。',
        heading1: '使い心地',
        heading2: '気持ちよさ',
        heading3: 'コストパフォーマンス',
        headingtext1: 'サンプル',
        headingtext2: '',
        headingtext3: ''
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '爽快な感覚を巡らせ、新しい感じ方へつれていく。',
        heading1: '使い心地',
        heading2: '気持ちよさ',
        heading3: 'コストパフォーマンス',
        headingtext1: 'サンプル',
        headingtext2: '',
        headingtext3: ''
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '玄人向けなハードプレイに最適',
        heading1: '使い心地',
        heading2: '気持ちよさ',
        heading3: 'コストパフォーマンス',
        headingtext1: 'サンプル',
        headingtext2: '',
        headingtext3: ''
      }
    ]
  }

  async initDb() {
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb() {
    await Product.deleteMany({})
  }

  pushProductsToDb() {
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product)
        newProduct.save()
      }
    )
  }
}

module.exports = FakeDb
