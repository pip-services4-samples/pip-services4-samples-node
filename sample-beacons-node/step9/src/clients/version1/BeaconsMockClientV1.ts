import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IdGenerator } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsMockClientV1 implements IBeaconsClientV1 {
    private _maxPageSize: number = 100;
    private _items: BeaconV1[];

    public constructor(...items: BeaconV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let label = filter.getAsNullableString('label');
        let udi = filter.getAsNullableString('udi');
        let udis = filter.getAsObject('udis');
        if (typeof udis === "string") {
            udis = udis.split(',');
        }
        if (!Array.isArray(udis)) {
            udis = null;
        }

        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (label != null && item.label != label)
                return false;
            if (udi != null && item.udi != udi)
                return false;
            if (udis != null && udis.indexOf(item.udi) < 0)
                return false;
            return true;
        };
    }

    public async getBeacons(ctx: IContext, filter: FilterParams, 
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        let filterBeacons = this.composeFilter(filter);
        let beacons = this._items.filter(filterBeacons);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = beacons.length;

        if (skip > 0)
            beacons = beacons.slice(skip);
        beacons = beacons.slice(0, take);

        return new DataPage<BeaconV1>(beacons, total);
    }

    public async getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        let beacons = this._items.filter((x) => { return x.id == beaconId; });
        let beacon = beacons.length > 0 ? beacons[0] : null;

        return beacon;
    }

    public async getBeaconByUdi(ctx: IContext, udi: string): Promise<any> {
        let beacons = this._items.filter((x) => { return x.udi == udi; });
        let beacon = beacons.length > 0 ? beacons[0] : null;

        return beacon;
    }

    public async calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any> {
        let beacons: BeaconV1[];
        let position: any = null;

        if (udis == null || udis.length == 0) {
            return;
        }

        let page = await this.getBeacons(
            ctx,
            FilterParams.fromTuples(
                'site_id', siteId,
                'udis', udis
            ),
            null,
        );

        beacons = page ? page.data : [];

        await new Promise(async (resolve, reject) => {
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

            if (count > 0) {
                position = {
                    type: 'Point',
                    coordinates: [lng / count, lat / count]
                }
            }

            resolve(position);
        })

        return position;
    }

    public async createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        if (beacon == null) {
            return;
        }

        beacon = Object.assign({}, beacon);
        beacon.id = beacon.id || IdGenerator.nextLong();

        this._items.push(beacon);

        return beacon;
    }

    public async updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        let index = this._items.map((x) => {
            return x.id;
        }).indexOf(beacon.id);

        if (index < 0) {
            return null;
        }

        beacon = Object.assign({}, beacon);
        this._items[index] = beacon;

        return beacon;
    }

    public async deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        var index = this._items.map((x) => { return x.id; }).indexOf(beaconId);
        var item = this._items[index];

        if (index < 0) {
            return null;
        }

        this._items.splice(index, 1);
        return item;
    }
}