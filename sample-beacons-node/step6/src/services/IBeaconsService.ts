import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';

export interface IBeaconsService {
    getBeacons(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>>;

    getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1>;

    getBeaconByUdi(ctx: IContext, beaconId: string): Promise<BeaconV1>;

    calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any>;

    createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1>;

    updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1>;

    deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1>;
}