'use strict';

class _Node {
  constructor(value, next) {
    this.value=value;
    this.next=next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(newItem, itemAfter) {
    if (!this.head) {
      return null;
    }


    let currNode = this.head;
    let previousNode = this.head;

    if (currNode.value === itemAfter) {
      return this.insertFirst(newItem);
    }


    while((currNode.value !== itemAfter)) {
      if (currNode.next === null) {
        return null;
      } else {
        previousNode = currNode;
        currNode = currNode.next;
      }
    }
    let newNode = new _Node(newItem, currNode);
    previousNode.next = newNode;
  }

  insertAfter(newItem, itemBefore) {
    if (!this.head) {
      return null;
    }

    let currNode = this.head;

    while (currNode.value !== itemBefore) {
      currNode = currNode.next;
    }
    let newNode = new _Node(newItem, currNode.next);
    currNode.next = newNode;
  }

  insertAt(newItem, wantedPosition) {
    if (!this.head) {
      return null;
    }

    if (wantedPosition === 1) {
      return this.insertFirst(newItem);
    }
    let currNode = this.head;
    let previousNode = this.head;
    let currPosition = 0;

    while (wantedPosition-1 !== currPosition) {
      if (currNode.next === null) {
        return this.insertLast(newItem);
      } else {
        previousNode = currNode;
        currNode = currNode.next;
        currPosition++;
      }
    }
    let newNode = new _Node(newItem, currNode);
    previousNode.next = newNode;

  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }
  
  spaceQuestion(position) {
    let insertNode = this.head;

    this.head = this.head.next;
    let currNode = this.head;
    let previousNode = this.head;
    let currentPosition = 1;

    if (position === 1) {
      insertNode.next = currNode.next;
      currNode.next = insertNode;
    } else {
      while (position !== currentPosition) {
        if (currNode.next === null) {
          return this.insertLast(insertNode);
        } else {
          previousNode = currNode;
          currNode = currNode.next;
          currentPosition++;
        }
      }
      insertNode.next = currNode.next;
      currNode.next = insertNode;
    }
  }
}

module.exports = LinkedList;