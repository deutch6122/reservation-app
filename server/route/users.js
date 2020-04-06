const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const config = require('../config')

router.post('/login', function(req, res){
  const {email, password} = req.body
  if(!email) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
  }
  if(!password) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
  }

  User.findOne({email}, function(err, foundUser) {
    if(err){
      //Error message
      return res.status(422).send({errors: [{title: 'User error', detail: 'Somethig went wrong!'}]})
    }
    if(!foundUser) {
      // InvaliError
      return res.status(422).send({errors: [{title: 'User error', detail: 'User dosen`t exists!'}]})
    }
    if(!foundUser.hassamePassword(password)) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)
  })

})

router.post('/register', function(req, res){
  const {username, email, password, confirmPassword} = req.body
/*
　　　　　　　上と下は同じ
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
*/
  if(!username) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username!'}]})
  }
  if(!email) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})

  }
  if(!password) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})

  }
  if(password !== confirmPassword) {
    //InvalidError
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please check passwords!'}]})
  }
  //findOne()一個見つかったら、検索をやめる。
  User.findOne({email}, function(err, foundUser){
    if(err){
      //Error message
      return res.status(422).send({errors: [{title: 'User error', detail: 'Somethig went wrong!'}]})
    }
    if(foundUser) {
      // InvaliError
      return res.status(422).send({errors: [{title: 'User error', detail: 'User already exists!'}]})
    }
    const user = new User({username, email, password})
    user.save(function(err){
      if(err){
        //Error message
        return res.status(422).send({errors: [{title: 'User error', detail: 'Somethig went wrong!'}]})
      }
      return res.json({"registerd": true})
    })
  })
})

module.exports = router
