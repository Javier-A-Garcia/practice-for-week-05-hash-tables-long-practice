class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
    this.loadFactor = 0.7;

  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    const pair = new KeyValuePair(key, value);
    const bucketIndex = this.hashMod(key);
    let current = this.data[bucketIndex];

    if (current) {
      let changed = false;

      while (current && !changed) {
        if (current.key === key) {
          current.value = value;
          changed = true;
        }
        current = current.next;
      }

      if (!changed) {
        pair.next = this.data[bucketIndex];
        this.data[bucketIndex] = pair;
        this.count++;
      }
    } else {
      this.data[bucketIndex] = pair;
      this.count++;
    }

    if (this.count/this.capacity >= this.loadFactor) {
      this.resize();
    }
  }


  read(key) {
    // Your code here
    let value;

    const bucketIndex = this.hashMod(key);

    let current =  this.data[bucketIndex];

     if (current) {
      while (current) {
        if (current.key === key) {
          value = current.value;
        }
        current = current.next;
      }
     }

     return value;
  }

  resize() {
    // Your code here
    let dataBackup = [...this.data];

    this.count = 0;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);

    dataBackup.forEach(el => {
      let current = el;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    });
  }


  delete(key) {
    // Your code here
    const bucketIndex = this.hashMod(key);
    let current = this.data[bucketIndex];

    if (!this.read(key)) {
      return "Key not found";
    }

    while (current) {
      if (current.key === key) {
        let newHead = current.next;
        this.count--;
        this.data[bucketIndex] = newHead;
      } else if (current.next && current.next.key === key) {
        current.next = current.next.next;
        this.count--;
      }
      current = current.next;
    }
  }
}

module.exports = HashTable;
