function HashMap() {
    let buckets = new Array(16);
    let loadFactor = 0.75;
    let keyNumbers = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
      } 

      function set(key, value) {
        let loadRate = length() / buckets.length;
        if (loadRate >= loadFactor) {
            growBucktes();
        }
        let index = hash(key) % buckets.length;

        if(!buckets[index]) {
          buckets[index] = Node(key, value);
        } else {
          let tempNode = buckets[index];
            while(tempNode) {
                if (tempNode.key === key) {
                    tempNode.value = value;
                    return;
                }
                tempNode = tempNode.nextNode;
            }
          
            let newNode = Node(key, value);
            newNode.nextNode = buckets[index];
            buckets[index] = newNode;
        }
        keyNumbers++;
      }

      function get(key) {
        let index = hash(key) % buckets.length;
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

        if (buckets[index]) {
            let tempNode = buckets[index];
            while(tempNode !== null) {
                if (tempNode.key === key) {
                    return tempNode.value;
                }
                tempNode = tempNode.nextNode;
            }
        }
        return null;
      }

      function has(key) {
        let value = get(key);
        return value !== null;
      }

      function remove(key) {
        if (has(key)) {
            let index = hash(key) % buckets.length;
            let currentNode = buckets[index];
            let formerNode;
            while (currentNode.key !== key) {
              formerNode = currentNode;
              currentNode = currentNode.nextNode;
            }

            if(formerNode) {
            formerNode.nextNode = currentNode.nextNode;
            }
            buckets[index] = formerNode;
            keyNumbers--;
        }
      }

      function length() {
        return keyNumbers;
      }

      function clear() {
        buckets = null;
        keyNumbers = 0;
      }

      function keys() {
        let keyArray = [];
        for (let i = 0; i < buckets.length; i++) {
            if(buckets[i]) {
                let tempNode = buckets[i];
                while(tempNode !== null) {
                    keyArray.push(tempNode.key);
                    tempNode = tempNode.nextNode;
                }
            }
        }
        return keyArray;
      }

      function values() {
        let valueArray = [];
        for (let i = 0; i < buckets.length; i++) {
            if(buckets[i]) {
                let tempNode = buckets[i];
                while(tempNode !== null) {
                    valueArray.push(tempNode.value);
                    tempNode = tempNode.nextNode;
                }
            }
        }
        return valueArray;
      }

      function entries() {
        let entriesArray = [];
        for (let i = 0; i < buckets.length; i++) {
            if(buckets[i]) {
                let tempNode = buckets[i];
                while(tempNode !== null) {
                    let entry = [tempNode.key, tempNode.value]
                    entriesArray.push(entry);
                    tempNode = tempNode.nextNode;
                }
            }
        }
        return entriesArray;
      }

      function growBucktes() {
        let bucketsEntries = entries();
        let newCapacity = length()*2;
        clear();
        buckets = new Array(newCapacity);
        for (let entry of bucketsEntries) {
            set(entry[0], entry[1]);
        }
      }

      function getBuckets() {
        return buckets;
      }

      function getBucketsLength() {
        return buckets.length;
      }

      return {hash, set, get, has, remove, length, clear, keys, values, entries, getBuckets};
}

function Node(key, value) {
  let nextNode = null;
  return {key, value, nextNode};
}

let hashMap = HashMap();

/*
hashMap.set('a',1);
hashMap.set('b',2);
hashMap.set('c',3);

console.log(hashMap.getBuckets());
console.log(hashMap.entries());

console.log(hashMap.has('b'));
console.log(hashMap.get('b'));
console.log(hashMap.length());
console.log(hashMap.remove('a'));
console.log(hashMap.getBuckets());
console.log(hashMap.entries());
*/



function testGrow(hashMap) {
  for (let i = 100; i >= 0; i--) {
    hashMap.set(i, i);
    console.log(hashMap.length()+ ',' + hashMap.getBuckets().length);
    console.log(hashMap.entries())
  }
}


testGrow (hashMap);
