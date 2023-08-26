const kf = require("./client");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async function init() {
  const producer = kf.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function(line) {
    const [riderName, location] = line.split(" ");
    await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: "location-update",
            value: JSON.stringify({ name: riderName, loc: location }),
          },
        ],
      });
      console.log("Message Produced Succesfully")

  }).on("close", async() => {
    await producer.disconnect()
  })
})()
