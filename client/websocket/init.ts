interface customWS extends WebSocket {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    wsSend: ((arg: any[]) => void);
}
export default function initWs() {
    const ws = new WebSocket("ws://localhost:8080") as customWS;

    ws.wsSend = (arg) => {
        ws.send(JSON.stringify(arg));
    }

    ws.onopen = () => {
        ws.wsSend(["sp"])
    }

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        const type = data[0];
        const args = data.slice(1);

        console.log(type, args);

        switch (type) {
            case "": {

                break;
            }
        }
    }

    return ws;
}

const ws = initWs();
export { ws };