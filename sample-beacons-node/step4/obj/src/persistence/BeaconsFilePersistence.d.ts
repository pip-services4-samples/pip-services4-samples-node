import { JsonFilePersister } from 'pip-services4-persistence-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { BeaconsMemoryPersistence } from './BeaconsMemoryPersistence';
import { ConfigParams } from 'pip-services4-components-node';
export declare class BeaconsFilePersistence extends BeaconsMemoryPersistence {
    protected _persister: JsonFilePersister<BeaconV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
