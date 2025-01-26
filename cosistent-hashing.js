/* 
    - Consistent Hashing
        - Circular Ring 
        - Virtual Nodes
*/

class ConsistentHashing {
  constructor() {
    this.N = 100000;
    // stores serverIndex, serverIP
    this.hashRing = {};
    // key server map
    this.keyNServerMap = {};
    // vitual node
    this.virtualNode = 3;
    this.gap = this.N / this.virtualNode;
  }
  stringToHash(string) {
    // should use proper hash function
    let hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash += char;
    }
    return Math.abs(hash) % this.N;
  }
  addServer(ip) {
    const serverIndex = this.stringToHash(ip);
    for (let i = 0; i < this.virtualNode; i++) {
      const virtualNodeIndex = Math.floor(
        (serverIndex + i * this.gap) % this.N
      );
      if (this.hashRing[virtualNodeIndex]) {
        console.log("Server Collision !!!");
      } else {
        this.hashRing[virtualNodeIndex] = ip;
      }
    }
  }
  removeServer(ip) {
    const serverIndex = this.stringToHash(ip);
    if (this.hashRing[serverIndex]) {
      delete this.hashRing[serverIndex];
    } else {
      console.log("Server not found !!!");
    }
  }
  getServers() {
    return this.hashRing;
  }
  lookupServer(key) {
    let keyIndex = this.stringToHash(key);
    // lower bound algorithm
    let server = "";
    let firstServer = "";
    for (let i in this.hashRing) {
      firstServer = firstServer ? firstServer : this.hashRing[i] + " " + i;
      if (i >= keyIndex) {
        server = this.hashRing[i] + " " + i;
        break;
      }
    }
    if (!server) {
      this.keyNServerMap[key] = firstServer;
    } else {
      this.keyNServerMap[key] = server;
    }
  }
  checkServerLoad() {
    const serverLoadMap = {};
    for (let i in this.keyNServerMap) {
        const ip = this.keyNServerMap[i].split(' ')[0];
        if (serverLoadMap[ip]) {
            serverLoadMap[ip]++
        } else {
            serverLoadMap[ip] = 1;
        }
    }
    return serverLoadMap;
  }
}

const ch = new ConsistentHashing();
ch.addServer("11.111.1.1");
ch.addServer("2321.456.171.1");
ch.addServer("86671.86.2.27");
console.log(ch.getServers());

ch.lookupServer("key-");
ch.lookupServer("key1-98765");
ch.lookupServer("key1-89535");
ch.lookupServer("aq-121");
ch.lookupServer("asas-");
ch.lookupServer("dgd-98765");
ch.lookupServer("hdhdh-0");
ch.lookupServer("qwertyuiop-1");
ch.lookupServer("qwertyuiopzxcvbnmqwertyui-1234567890");
ch.lookupServer(
  "qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjkcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwerlzxcvbnm,qyuiopfw1ebnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwercyuiopasdfvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwercvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,qwertyuiopzxcvbnmqwertyui-1234567890-qwertyuiopasdfghjklzxcvbnm,"
);
console.log(ch.keyNServerMap);
console.log(ch.checkServerLoad());
