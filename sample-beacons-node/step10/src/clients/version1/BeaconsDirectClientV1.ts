import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { DirectClient } from 'pip-services4-rpc-node';
import { Descriptor } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';

import { BeaconV1 } from '../../data/version1/BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';
import { IBeaconsService } from '../../services/IBeaconsService';

export class BeaconsDirectClientV1 extends DirectClient<IBeaconsService> implements IBeaconsClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('service', new Descriptor('beacons', 'service', '*', '*', '1.0'));
    }

    public async getBeacons(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        let timing = this.instrument(ctx, 'beacons.get_beacons');

        try {
            return await this._service.getBeacons(ctx, filter, paging);
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
        
    }

    public async getBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        let timing = this.instrument(ctx, 'beacons.get_beacon_by_id');

        try {
            return await this._service.getBeaconById(ctx, beaconId); 
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }

    public async getBeaconByUdi(ctx: IContext, udi: string): Promise<any> {
        let timing = this.instrument(ctx, 'beacons.get_beacon_by_udi');
        try {
            return await this._service.getBeaconByUdi(ctx, udi); 
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }

    public async calculatePosition(ctx: IContext, siteId: string, udis: string[]): Promise<any> {
        let timing = this.instrument(ctx, 'beacons.calculate_position');
        try {
            return await this._service.calculatePosition(ctx, siteId, udis); 
        } catch(err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }

    public async createBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        let timing = this.instrument(ctx, 'beacons.create_beacon');
        try {
            return await this._service.createBeacon(ctx, beacon);
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }

    public async updateBeacon(ctx: IContext, beacon: BeaconV1): Promise<BeaconV1> {
        let timing = this.instrument(ctx, 'beacons.update_beacon');
        try {
            return await this._service.updateBeacon(ctx, beacon); 
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }

    public async deleteBeaconById(ctx: IContext, beaconId: string): Promise<BeaconV1> {
        let timing = this.instrument(ctx, 'beacons.delete_beacon_by_id');
        try {
            return await this._service.deleteBeaconById(ctx, beaconId); 
        } catch (err) {
            timing.endFailure(err);
        } finally {
            timing.endSuccess();
        }
    }
}