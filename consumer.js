const kf = require('./client');
const group = process.argv[2];

(async function init() {
    const consumer = kf.consumer({
        groupId: group
    })
    await consumer.connect();
    await consumer.subscribe({
        topics: ['rider-updates'],
        fromBeginning: true   // we want messages from starting
        
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${group}: [${topic}]: PART:${partition}`, message.value.toString())
        }
    });
})()