const { Kafka } = require('kafkajs');

const kf = new Kafka({
    clientId: "learning", // anything like service name or something else
    brokers:["localhost:9092"],
});

module.exports = kf;
