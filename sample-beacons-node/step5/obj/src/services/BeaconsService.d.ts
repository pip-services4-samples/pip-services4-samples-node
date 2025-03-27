import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { ConfigParams } from 'pip-services4-components-node';
import { IConfigurable } from 'pip-services4-components-node';
import { IReferences } from 'pip-services4-components-node';
import { IReferenceable } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';
import { CommandSet } from 'pip-services4-rpc-node';
import { ICommandable } from 'pip-services4-rpc-node';
import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { IBeaconsService } from './IBeaconsService';
export declare class BeaconsService implements IBeaconsService, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getBeacons(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>>;
    getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1>;
    getBeaconByUdi(ctx: IContext, beaconId: string): Promise<BeaconV1>;
    calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any>;
    createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1>;
    updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1>;
    deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1>;
}
