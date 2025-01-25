/* 
    - Consistent Hashing
        - Circular Ring 
        - Virtual Nodes
*/

class ConsistentHashing {
    constructor() {
        this.N = 10;
        // stores serverIndex, serverIP
        this.hashRing = {};
        // key server map
        this.keyNServerMap = {};
    }
    stringToHash(string) { // should use proper hash function
        let hash = 0;

        if (string.length == 0) return hash;

        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash  += char;
        }
        return Math.abs(Math.floor(hash/this.N));
    }
    addServer(ip) {
        const serverIndex = this.stringToHash(ip);
        if (this.hashRing[serverIndex]) {
            console.log("Server Collision !!!");
        } else {
            this.hashRing[serverIndex] = ip;
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
        let server = ''; let firstServer = '';
        for (let i in this.hashRing) {
            console.log(i, keyIndex);
            firstServer = firstServer ? firstServer : this.hashRing[i];
            if (i >= keyIndex) {
                server = this.hashRing[i];
                break;
            }
        }
        if (!server) {
            this.keyNServerMap[key] = firstServer;
        } else {
            this.keyNServerMap[key] = server;
        }
    }
}

const ch = new ConsistentHashing();
ch.addServer("11.111.1.1");
ch.addServer('2321.456.171.1');
ch.addServer('86671.86.2.27');
console.log(ch.getServers());

ch.lookupServer("key-");
ch.lookupServer("key1-98765");
ch.lookupServer("aq-121")
ch.lookupServer("asas-");
ch.lookupServer("dgd-98765");
ch.lookupServer("hdhdh-0")
console.log(ch.keyNServerMap);