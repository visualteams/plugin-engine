import { nanoid } from 'nanoid'

interface ICallbackFunc {
    (err: string, res: any): any;
}

interface ICallFunc {
    (method: string, data: string | number | Record<any, any>, cb: ICallbackFunc): void
}

type TCallbacksList = Record<string, ICallbackFunc>


class Plugin {
    private callbacks: TCallbacksList = {}

    constructor() {
        require('net').createServer().listen();

        process.on('message', message => {
            if (message.type === 'call') this.callbacks[message.id](message.err, message.res)
        })
    }

    call: ICallFunc = (method, data, cb) => {
        const id: string = nanoid()

        this.callbacks[id] = cb

        if (process?.send) process.send({type: 'call', id, method, data})
    }
}

export default Plugin
