##### RabbitMQ and Apache Kafka 
- They are both message brokers that can send messages between applications.
- RabbitMQ is a traditional messaging system. Kafta is a Real-time data streaming, event-driven microservices, and log aggregation.
- RabbitMQ is easier to deploy and maintain.
-  RabbitMQ is a good choice for event-driven messaging, while Kafka is a good choice for real-time data streaming. 

Genearlly DB has LOW Throughput (operation per second).
Kafka solves this issue - It has HIGH Throughput.
##### 📌 Kafka Concepts
1. Producer (Data Producer)
2. Consumer (Consumes the data -> Proocess -> Bulk DB Insert)
3. Consumer Group (Multiple consumers in a single Group, Can have multiple groups as well)
4. Topic (Logical partitioning of the messages/data)
5. Partition (Split the data into multiple partitions) eg. partitioned based on area wise (location)
6. Offset
7. Broker (kafka server)
8. CLuster (multiple kafka servers)
9. Zookeper
10. Queue (only one producer -> only one consumer) RabitMQ, SQS
11. pub/sub (one producer -> can have multiple consumers)

👉 [Sample Code](https://gist.github.com/piyushgarg-dev/32cadf6420c452b66a9a6d977ade0b0)

##### 👉 Kafka References
  - [Youtube 1](https://www.youtube.com/watch?v=ZJJHm_bd9Zo)
  - [Youtube 2](https://www.youtube.com/watch?v=oVZtzZVe9Dg)
