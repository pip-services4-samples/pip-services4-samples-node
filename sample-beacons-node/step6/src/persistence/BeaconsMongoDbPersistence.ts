import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IdentifiableMongoDbPersistence } from 'pip-services4-mongodb-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from './IBeaconsPersistence';

export class BeaconsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<BeaconV1, string>
    implements IBeaconsPersistence {

    constructor() {
        super('beacons');
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) {
            criteria.push({ site_id: siteId });
        }

        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({ label: label });
        }

        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            criteria.push({ udi: udi });
        }

        let udis = filter.getAsObject('udis');
        if (typeof udis === "string") {
            udis = udis.split(',');
        }
        if (Array.isArray(udis)) {
            criteria.push({ udi: { $in: udis } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByUdi(ctx: IContext, udi: string): Promise<BeaconV1> {
        let criteria = {
            udi: udi
        };

        let item: any = await this._collection.findOne(criteria);

        if (item != null) this._logger.trace(ctx, "Found beacon by %s", udi);
        else this._logger.trace(ctx, "Cannot find beacon by %s", udi);
        
        item = this.convertToPublic(item);
        return item;
    }
}