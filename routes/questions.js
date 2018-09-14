'use strict';

const express = require('express');
const User = require('../models/user');
const LinkedList = require('../data-structures/linked-list-class');

const router = express.Router();



const linkedListContainer = {};


router.get('/:username', (req, res, next) => {
  const { username } = req.params;

  User.find({'username': username}, {'questions' : 'question' })
    .then( result => {
      if (!(username in linkedListContainer)) {
        
        linkedListContainer[`${username}`] = new LinkedList();
        result[0].questions.forEach((item) => {
          linkedListContainer[`${username}`].insertLast(item);
        });
      }
      
      res.json(linkedListContainer[`${username}`].head.value);
      
    })
    .catch(err => {
      next(err);
    });
});


router.put('/', (req, res, next) => {
  const { result, username} = req.body;
  let questionList = linkedListContainer[`${username}`];
  
  if (result === true) {
    questionList.head.value.mVal = questionList.head.value.mVal * 2;
    questionList.spaceQuestion(questionList.head.value.mVal);
  } else {
    questionList.head.value.mVal = 1;
    questionList.spaceQuestion(questionList.head.value.mVal);
  }

  //console.log('PUT but after',JSON.stringify(questionList, null, 2));
  
  if (result === true) {
    User.findOneAndUpdate(
      {username},
      {$inc : {correct: 1, total: 1}},
      {new : true}
    )
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        next(err);
      });
  } else {
    User.findOneAndUpdate(
      {username},
      {$inc : {total: 1}},
      {new : true}
    )
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        next(err);
      });
  }
});

router.put('/update', (req, res, next) => {
  const { username } = req.body;
  let questionList = linkedListContainer[`${username}`];
  //console.log('list in update', JSON.stringify(questionList, null, 2));
  const tempArray = [];
  let currNode = questionList.head;
  while (currNode.next !== null) {
    tempArray.push(currNode.value);
    currNode = currNode.next;
  }
  User.update(
    {username},
    {questions: tempArray})
    .then(() => {
      delete linkedListContainer[`${username}`];
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });

});

module.exports = router;