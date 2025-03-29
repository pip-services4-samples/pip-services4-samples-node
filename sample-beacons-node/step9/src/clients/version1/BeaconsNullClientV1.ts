import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsNullClientV1 implements IBeaconsClientV1 {
    public async getBeacons(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        return new DataPage([], 0);
    }

    public async getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return null;
    }

    public async getBeaconByUdi(ctx: IContext, udi: string): Promise<any> {
        return null;
    }

    public async calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any> {
        return null;
    }

    public async createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        return null;
    }

    public async updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        return null;
    }

    public async deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return null;
    }

}