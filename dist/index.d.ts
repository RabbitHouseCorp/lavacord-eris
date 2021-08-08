import { Manager as LavacordManager, LavalinkNodeOptions, ManagerOptions } from "lavacord";
import { Client as ErisClient } from "eris";
export declare class Manager extends LavacordManager {
    readonly client: ErisClient;
    constructor(client: ErisClient, nodes: LavalinkNodeOptions[], options?: ManagerOptions);
}
