const kf = require("./client");

(async function init() {
    const admin = kf.admin();
    console.log("Admin is Connecting");
    admin.connect();
    console.log("Admin Connected");

    console.log("Creating Topics")
    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2
        }]
    })
    console.log("Topic Created");

    console.log("Admin Disconnecting...");
    await admin.disconnect();
})()
