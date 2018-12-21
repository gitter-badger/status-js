var StatusJS = require("./dist/index.js");

(async () => {
    var status = new StatusJS();
    await status.connect(
        "http://104.197.46.74:8545",
        "0x0011223344556677889900112233445566778899001122334455667788990011"
    );
    // await status.connect("/home/richard/.statusd/geth.ipc");
    console.log("1");
    console.log(await status.getPublicKey());
    const channel = "dawnjs";
    await status.joinChat(channel);

    status.onMessage(channel, (err, data) => {
        console.log("2");
        console.log(data.payload);
    });

    status.onMessage((err, data) => {
        console.log("3");
        console.log("PrivMessage: " + data.payload);
    });

    // mail-02.gc-us-central1-a.eth.beta
    const enode =
        "enode://015e22f6cd2b44c8a51bd7a23555e271e0759c7d7f52432719665a74966f2da456d28e154e836bee6092b4d686fe67e331655586c57b718be3997c1629d24167@35.226.21.19:30504";

    status.mailservers.useMailserver(enode, (err, res) => {
        // Group chats
        let from = 0; // unix timestamp
        let to = 1545361642;
        console.log("4");
        status.mailservers.requestChannelMessages(
            channel,
            { from, to },
            (err, res) => {
                if (err) console.log(err);
            }
        );

        // User messages
        from = parseInt(new Date().getTime() / 1000 - 6000, 10);
        to = parseInt(new Date().getTime() / 1000, 10);
        status.mailservers.requestUserMessages({ from, to }, (err, res) => {
            if (err) console.log(err);
        });
    });

    setInterval(() => {}, 3000);
})();
