import { Node } from './node.js';
​
export class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
​
    addToTheEnd(value) {
        let node = new Node(value);
​
        if (this.length === 0) {
            this.head = node;
        } else {
            let current = this.head;
​
            while(current.next) {
                current = current.next;
            }
​
            current.next = new Node(value);
        }
​
        this.length++;
    }
​
    insertInPosition(position, value) {
        if (position < 0 || position > this.length) {
            return 'Incorrect value of position';
        }
​
        let node = new Node(value);
​
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            let prev = null;
            let index = 0;
​
            while (index < position) {
                prev = current;
                current = current.next;
                index++;
            }
​
            prev.next = node;
            node.next = current;
        }
​
        this.length++;
    }
​
    removeFromPosition(position) {
        if (position < 0 || position > this.length) {
            return 'Incorrect value of position';
        }
​
        let current = this.head;
​
        if (position === 0) {
            this.head = current.next;
        } else {
            let prev = null;
            let index = 0;
​
            while(index < position) {
                prev = current;
                current = current.next;
                index++;
            }
​
            prev.next = current.next; // За левым элементом будет следовать не current, а следующий элемент за current.
        }
​
        this.length--;
        return current.value;
    }
​
    removeElementByValue(value) {
        return this.removeFromPosition(this.getIndexOf(value));
    }
​
    getNodeByPosition(position) {
        if (position < 0 || position > this.length) {
            return 'Incorrect value of position';
        }
​
        let current = this.head;
        let index = 0;
​
        while(index < position) {
            current = current.next;
            index++;
        }
​
        return current.value;
    }
​
    getIndexOf(value) {
        let current = this.head;
        let index = 0;
​
        while(current) {
            if (current.value === value) {
                return index;
            }
            
            current = current.next;
            index++;
        }
​
        return -1;
    }
​
    isEmpty() {
        return this.length === 0;
    }
​
    getLength() {
        return this.length;
    }
​
    print() {
        let current = this.head;
​
        while(current) {
            console.log("Node: " + current.value);
            current = current.next;
        }
    }
}