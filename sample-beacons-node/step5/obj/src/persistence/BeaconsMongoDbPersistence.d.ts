import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IdentifiableMongoDbPersistence } from 'pip-services4-mongodb-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from './IBeaconsPersistence';
export declare class BeaconsMongoDbPersistence extends IdentifiableMongoDbPersistence<BeaconV1, string> implements IBeaconsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>>;
    getOneByUdi(ctx: IContext, udi: string): Promise<BeaconV1>;
}
