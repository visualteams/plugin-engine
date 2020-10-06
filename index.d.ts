import { TEvents } from "./definitions/events/TEvents";
declare class Plugin {
    private events;
    constructor();
    /** Events */
    registerEvents: (events: TEvents) => void;
}
export default Plugin;
