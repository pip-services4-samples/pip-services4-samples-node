import { CommandSet } from 'pip-services4-rpc-node';
import { IBeaconsService } from '../../src/services/IBeaconsService';
export declare class BeaconsCommandSet extends CommandSet {
    private _service;
    constructor(service: IBeaconsService);
    private makeGetBeaconsCommand;
    private makeGetBeaconByIdCommand;
    private makeGetBeaconByUdiCommand;
    private makeCalculatePositionCommand;
    private makeCreateBeaconCommand;
    private makeUpdateBeaconCommand;
    private makeDeleteBeaconByIdCommand;
}
