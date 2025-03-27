"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsPersistenceFixture = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const assert = require('chai').assert;
const BeaconTypeV1_1 = require("../../src/data/version1/BeaconTypeV1");
const BEACON1 = {
    id: '1',
    udi: '00001',
    type: BeaconTypeV1_1.BeaconTypeV1.AltBeacon,
    site_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
const BEACON2 = {
    id: '2',
    udi: '00002',
    type: BeaconTypeV1_1.BeaconTypeV1.iBeacon,
    site_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
const BEACON3 = {
    id: '3',
    udi: '00003',
    type: BeaconTypeV1_1.BeaconTypeV1.AltBeacon,
    site_id: '2',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [10, 10] },
    radius: 50
};
class BeaconsPersistenceFixture {
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
    testCreateBeacons() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create the first beacon
            let beacon = yield this._persistence.create(null, BEACON1);
            assert.isObject(beacon);
            assert.equal(BEACON1.udi, beacon.udi);
            assert.equal(BEACON1.site_id, beacon.site_id);
            assert.equal(BEACON1.type, beacon.type);
            assert.equal(BEACON1.label, beacon.label);
            assert.isNotNull(beacon.center);
            // Create the second beacon
            beacon = yield this._persistence.create(null, BEACON2);
            assert.isObject(beacon);
            assert.equal(BEACON2.udi, beacon.udi);
            assert.equal(BEACON2.site_id, beacon.site_id);
            assert.equal(BEACON2.type, beacon.type);
            assert.equal(BEACON2.label, beacon.label);
            assert.isNotNull(beacon.center);
            // Create the third beacon
            beacon = yield this._persistence.create(null, BEACON3);
            assert.isObject(beacon);
            assert.equal(BEACON3.udi, beacon.udi);
            assert.equal(BEACON3.site_id, beacon.site_id);
            assert.equal(BEACON3.type, beacon.type);
            assert.equal(BEACON3.label, beacon.label);
            assert.isNotNull(beacon.center);
        });
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateBeacons();
            // Get all beacons
            let page = yield this._persistence.getPageByFilter(null, new pip_services4_data_node_1.FilterParams(), new pip_services4_data_node_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 3);
            let beacon1 = page.data[0];
            // Update the beacon
            beacon1.label = 'ABC';
            let beacon = yield this._persistence.update(null, beacon1);
            assert.isObject(beacon);
            assert.equal(beacon1.id, beacon.id);
            assert.equal('ABC', beacon.label);
            // Get beacon by udi
            beacon = yield this._persistence.getOneByUdi(null, beacon1.udi);
            assert.isObject(beacon);
            assert.equal(beacon1.id, beacon.id);
            // Delete the beacon
            beacon = yield this._persistence.deleteById(null, beacon1.id);
            assert.isObject(beacon);
            assert.equal(beacon1.id, beacon.id);
            // Try to get deleted beacon
            beacon = yield this._persistence.getOneById(null, beacon1.id);
            assert.isNull(beacon || null);
        });
    }
    testGetWithFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateBeacons();
            // Filter by id
            let page = yield this._persistence.getPageByFilter(null, pip_services4_data_node_1.FilterParams.fromTuples('id', '1'), new pip_services4_data_node_2.PagingParams());
            assert.lengthOf(page.data, 1);
            // Filter by udi
            page = yield this._persistence.getPageByFilter(null, pip_services4_data_node_1.FilterParams.fromTuples('udi', '00002'), new pip_services4_data_node_2.PagingParams());
            assert.lengthOf(page.data, 1);
            // Filter by udis
            page = yield this._persistence.getPageByFilter(null, pip_services4_data_node_1.FilterParams.fromTuples('udis', '00001,00003'), new pip_services4_data_node_2.PagingParams());
            assert.lengthOf(page.data, 2);
            // Filter by site_id
            page = yield this._persistence.getPageByFilter(null, pip_services4_data_node_1.FilterParams.fromTuples('site_id', '1'), new pip_services4_data_node_2.PagingParams());
            assert.lengthOf(page.data, 2);
        });
    }
}
exports.BeaconsPersistenceFixture = BeaconsPersistenceFixture;
//# sourceMappingURL=BeaconsPersistenceFixture.js.map