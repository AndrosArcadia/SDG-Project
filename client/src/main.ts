import Phaser from "phaser";
import { Client } from "colyseus.js";

const colyseus = new Client("ws://localhost:2567");

colyseus.joinOrCreate("my_room").then(room => {
    console.log("✅ Conectado a la sala:", room.sessionId);
});

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#1e1e1e",
    scene: {
        create() {
            this.add.text(300, 250, "¡Estoy probando Phaser!", {
                color: "#fff",
                fontSize: "24px",
            });
        },
    },
};

new Phaser.Game(config);
