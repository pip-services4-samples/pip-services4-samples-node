import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { ConfigParams } from 'pip-services4-components-node';
import { IConfigurable } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { IReferences } from 'pip-services4-components-node';
import { IReferenceable } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';
import { IdGenerator } from 'pip-services4-data-node';
import { CommandSet } from 'pip-services4-rpc-node';
import { ICommandable } from 'pip-services4-rpc-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from '../persistence/IBeaconsPersistence';
import { IBeaconsService } from './IBeaconsService';
import { BeaconTypeV1 } from '../data/version1/BeaconTypeV1';
import { BeaconsCommandSet } from './BeaconsCommandSet';

export class BeaconsService implements IBeaconsService, IConfigurable, IReferenceable, ICommandable {
    private _persistence: IBeaconsPersistence;
    private _commandSet: BeaconsCommandSet;

    public constructor() { }

    public configure(config: ConfigParams): void {
    }

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<IBeaconsPersistence>(
            new Descriptor('beacons', 'persistence', '*', '*', '1.0')
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new BeaconsCommandSet(this);
        }

        return this._commandSet;
    }

    public getBeacons(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        return this._persistence.getPageByFilter(ctx, filter, paging);
    }

    public getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return this._persistence.getOneById(ctx, beaconId);
    }

    public getBeaconByUdi(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return this._persistence.getOneByUdi(ctx, beaconId);
    }

    public async calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any> {
        if (udis == null || udis.length == 0) {
            return null;
        }

        let page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'site_id', siteId,
                'udis', udis
            ),
            null
        );
        let beacons = page.data || [];

        let lat = 0;
        let lng = 0;
        let count = 0;
        for (let beacon of beacons) {
            if (beacon.center != null 
                && beacon.center.type == 'Point'
                && Array.isArray(beacon.center.coordinates)) {
                    lng += beacon.center.coordinates[0];
                    lat += beacon.center.coordinates[1];
                    count += 1;
                }
        }

        if (count == 0) {
            return null;
        }

        let position = {
            type: 'Point',
            coordinates: [lng / count, lat / count]
        }
        return position;
    }

    public createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        beacon.id = beacon.id || IdGenerator.nextLong();
        beacon.type = beacon.type || BeaconTypeV1.Unknown;

        return this._persistence.create(ctx, beacon);
    }

    public updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        beacon.type = beacon.type || BeaconTypeV1.Unknown;
        return this._persistence.update(ctx, beacon);
    }

    public deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        return this._persistence.deleteById(ctx, beaconId);
    }

}