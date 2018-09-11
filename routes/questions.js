const express = require('express');
const User = require('../models/user');

const router = express.Router();

// const questions = [
//   {question: 'Hola', answer: 'hello'},
//   {question: 'Amigo', answer: 'friend'},
//   {question: 'Muchacho', answer: 'boy'},
//   {question: 'Comida', answer: 'food'}
// ];


router.get('/', (req, res, next) => {
  User.findOne({}, {'questions' : 'question' })
    .then( result => {
      console.log('RETURNING VALUE', result.questions[0]);
      res.json(result.questions[0]);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;