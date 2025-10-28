import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
    @type("number") x = 0;
    @type("number") y = 0;
}

class State extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}

export class MyRoom extends Room<State> {
    onCreate() {
        this.setState(new State());
        this.onMessage("move", (client, data) => {
            const p = this.state.players.get(client.sessionId);
            if (p) {
                p.x += data.x;
                p.y += data.y;
            }
        });
    }
    onJoin(client: Client) {
        this.state.players.set(client.sessionId, new Player());
        console.log("Jugador conectado:", client.sessionId);
    }
    onLeave(client: Client) {
        this.state.players.delete(client.sessionId);
        console.log("Jugador desconectado:", client.sessionId);
    }
}
