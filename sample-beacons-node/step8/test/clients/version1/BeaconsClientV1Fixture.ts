let assert = require('chai').assert;

import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';

import { BeaconV1 } from '../../../src/data/version1/BeaconV1';
import { BeaconTypeV1 } from '../../../src/data/version1/BeaconTypeV1';
import { IBeaconsClientV1 } from '../../../src/clients/version1/IBeaconsClientV1';

const BEACON1: BeaconV1 = {
    id: '1',
    udi: '00001',
    type: BeaconTypeV1.AltBeacon,
    site_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [ 0, 0 ] },
    radius: 50
};
const BEACON2: BeaconV1 = {
    id: '2',
    udi: '00002',
    type: BeaconTypeV1.iBeacon,
    site_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [ 2, 2 ] },
    radius: 70
};

export class BeaconsClientV1Fixture {
    private _client: IBeaconsClientV1;

    public constructor(client: IBeaconsClientV1) {
        assert.isNotNull(client);
        this._client = client;
    }

    public async testCrudOperations() {
        let beacon1: BeaconV1;
        
        // Create the first beacon
        let beacon = await this._client.createBeacon(null, BEACON1);

        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);

        // Create the second beacon
        beacon = await this._client.createBeacon(null, BEACON2);

        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);

        // Get all entities
        let page = await this._client.getBeacons(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        beacon1 = page.data[0];

        // Update the beacon
        beacon1.label = 'ABC';

        beacon = await this._client.updateBeacon(null, beacon1);

        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        assert.equal('ABC', beacon.label);

        // Get beacon by udi
        beacon = await this._client.getBeaconByUdi(null, beacon1.udi);

        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);

        // Delete the beacon
        beacon = await this._client.deleteBeaconById(null, beacon1.id);

        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);

        // Try to get deleted beacon
        beacon = await this._client.getBeaconById(null, beacon1.id);
        assert.isNull(beacon || null);
    }

    public async testCalculatePosition() {
        // Create the first beacon
        let beacon = await this._client.createBeacon(null, BEACON1,);

        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);

        // Create the second beacon
        beacon = await this._client.createBeacon(null, BEACON2);

        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);

        // Calculate position for one beacon
        let position = await this._client.calculatePosition(
            null, '1', ['00001']);

        assert.isObject(position);
        assert.equal('Point', position.type);
        assert.lengthOf(position.coordinates, 2);
        assert.equal(0, position.coordinates[0]);
        assert.equal(0, position.coordinates[1]);
    }
}
