import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
export interface IBeaconsPersistence {
    getPageByFilter(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>>;
    getOneById(ctx: IContext, id: string): Promise<BeaconV1>;
    getOneByUdi(ctx: IContext, udi: string): Promise<BeaconV1>;
    create(ctx: IContext, item: BeaconV1): Promise<BeaconV1>;
    update(ctx: IContext, item: BeaconV1): Promise<BeaconV1>;
    deleteById(ctx: IContext, id: string): Promise<BeaconV1>;
}
