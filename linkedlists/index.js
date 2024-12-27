function LinkedList(nodeValue) {
    if (nodeValue === null) {
        return;
    }

    let node = Node(nodeValue);
    let listSize = 1;
    function append(value) {
        let endNode = node;
        while(endNode.nextNode !== null) {
            endNode = endNode.nextNode;
        }
        endNode.nextNode = Node(value);
        listSize++;
    }

    function prepend(value) {
        let startNode = Node(value);
        startNode.nextNode = node;
        node = startNode;
        listSize++;
    }

    function size() {
        return listSize;
    }

    function head() {
        return node;
    }

    function tail() {
        if(node === null) {
            return null;
        }
        let tempNode = node;
        while (tempNode.nextNode !== null) {
            tempNode = tempNode.nextNode;
        }
        return tempNode;
    }
    function at(index) {
        if (index < 0 || index >= listSize) {
            return;
        }
        let tempNode = node;

        if(index > 0) {
            for (let i = 1; i <= index; i++) {
                tempNode = tempNode.nextNode;
            }
        }
        return tempNode;
    }
    function pop() {
        if(listSize <= 1) {
            node = null;
            listSize = 0;
        } else {
        let last2Element = at(listSize-2);
        last2Element.nextNode = null;
        listSize--;}
    }
    function contains(value) {
        let tempNode = node;
        while(tempNode !== null) {
            if(tempNode.value === value) {
                return true;
            }
            tempNode = tempNode.nextNode;
        }
        return false;
    }
    function find(value) {
        let tempNode = node;

        for(let i = 0; i < listSize; i++) {
            if(tempNode.value === value) {
                return i;
            } else {
                tempNode = tempNode.nextNode;
            }
        }
        return null;
    }

    function toString() {
        let tempNode = node;
        let string = '';
        while(tempNode !== null) {
            string += `( ${tempNode.value} ) -> `;
            tempNode = tempNode.nextNode;

        }
        string += 'null';
        return string;
    }
    return {append, prepend, size, head, tail, at, pop, contains, find, toString};
}

function Node(value = null) {
    let nextNode = null;
    return {value, nextNode};
}


let list = LinkedList(3);
list.prepend(2);
list.prepend(1);
list.append(4);
list.append(5);
console.log(list.toString())

console.log(list.contains(1));
console.log(list.contains(10));
console.log(list.find(3));
console.log(list.tail().value);


console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.toString())

console.log(list.pop());
console.log(list.toString())

console.log(list.head());
console.log(list.tail());