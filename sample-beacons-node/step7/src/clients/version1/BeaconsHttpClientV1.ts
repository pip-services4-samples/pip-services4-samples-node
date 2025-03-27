import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { CommandableHttpClient } from 'pip-services4-http-node';
import { IContext } from 'pip-services4-components-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsHttpClientV1 extends CommandableHttpClient implements IBeaconsClientV1 {
    public constructor() {
        super('v1/beacons');
    }

    public getBeacons(ctx: IContext, filter: FilterParams, 
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        return this.callCommand(
            'get_beacons',
            ctx,
            { filter: filter, paging: paging },
        );
    }

    public getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return this.callCommand(
            'get_beacon_by_id',
            ctx,
            {
                beacon_id: beaconId
            }
        );
    }

    public getBeaconByUdi(ctx: IContext, udi: string): Promise<any> {
        return this.callCommand(
            'get_beacon_by_udi',
            ctx,
            {
                udi: udi
            }
        );
    }

    public calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any> {
        return this.callCommand(
            'calculate_position',
            ctx,
            {
                site_id: siteId,
                udis: udis
            }
        );    
    }

    public createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        return this.callCommand(
            'create_beacon',
            ctx,
            {
                beacon: beacon
            }
        );
    }

    public updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        return this.callCommand(
            'update_beacon',
            ctx,
            {
                beacon: beacon
            }
        );    
    }

    public deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return this.callCommand(
            'delete_beacon_by_id',
            ctx,
            {
                beacon_id: beaconId
            }
        );
    }
}