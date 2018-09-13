'use strict';

const express = require('express');
const User = require('../models/user');
const LinkedList = require('../data-structures/linked-list-class');

const router = express.Router();

// const questions = [
//   {question: 'Hola', answer: 'hello'},
//   {question: 'Amigo', answer: 'friend'},
//   {question: 'Muchacho', answer: 'boy'},
//   {question: 'Comida', answer: 'food'}
// ];


const linkedListContainer = {};


router.get('/:username', (req, res, next) => {
  const { username } = req.params;

  User.find({'username': username}, {'questions' : 'question' })
    .then( result => {
      if (!(username in linkedListContainer)) {
        console.log('create linked list running');
        linkedListContainer[`${username}`] = new LinkedList();
        result[0].questions.forEach((item) => {
          linkedListContainer[`${username}`].insertLast(item);
        });
      }
      
      res.json(linkedListContainer[`${username}`].head.value);
      // console.log('containter', JSON.stringify(linkedListContainer, null, 2));
    })
    .catch(err => {
      next(err);
    });
});

// { mVal: 1,
//   _id: 5b995c666343db159423d8de,
//   question: 'Hola',
//   answer: 'hello' }

router.put('/', (req, res, next) => {
  const { result, username} = req.body;
  let questionList = linkedListContainer[`${username}`];
  //console.log('list inside the put',JSON.stringify(questionList, null, 2));
  if (result === true) {
    questionList.head.value.mVal = questionList.head.value.mVal * 2;
    questionList.spaceQuestion(questionList.head.value.mVal);
  } else {
    questionList.head.value.mVal = 1;
    questionList.spaceQuestion(questionList.head.value.mVal);
  }

  //console.log('PUT but after',JSON.stringify(questionList, null, 2));
  
  if (result === true) {
    User.update({username},
      { $inc:
        {
          correct: 1,
        }}
    );
  }

  User.update({username},
    { $inc:
      {
        total: 1
      }}
  )
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;