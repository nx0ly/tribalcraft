import type { PlayerType } from "../entities/Player";

interface CowWS extends WebSocket {
    super();

    player: PlayerType;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    on: (type: string, action: (buffer: Buffer) => void) => any;
    // biome-ignore lint/suspicious/noExplicitAny: literally can be anything
    wsSend: (data: any[]) => void;
}

export type {
    CowWS
}