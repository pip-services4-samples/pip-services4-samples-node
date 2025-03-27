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
const assert = require('chai').assert;
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_components_node_2 = require("pip-services4-components-node");
const pip_services4_components_node_3 = require("pip-services4-components-node");
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const pip_services4_http_node_1 = require("pip-services4-http-node");
const BeaconTypeV1_1 = require("../../../src/data/version1/BeaconTypeV1");
const BeaconsMemoryPersistence_1 = require("../../../src/persistence/BeaconsMemoryPersistence");
const BeaconsService_1 = require("../../../src/services/BeaconsService");
const BeaconsHttpControllerV1_1 = require("../../../src/controllers/version1/BeaconsHttpControllerV1");
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
suite('BeaconsHttpControllerV1', () => {
    let persistence;
    let service;
    let controller;
    let client;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        let restConfig = pip_services4_components_node_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.port', 3000, 'connection.host', 'localhost');
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services4_components_node_1.ConfigParams());
        service = new BeaconsService_1.BeaconsService();
        service.configure(new pip_services4_components_node_1.ConfigParams());
        controller = new BeaconsHttpControllerV1_1.BeaconsHttpControllerV1();
        controller.configure(restConfig);
        client = new pip_services4_http_node_1.TestCommandableHttpClient('v1/beacons');
        client.configure(restConfig);
        let references = pip_services4_components_node_3.References.fromTuples(new pip_services4_components_node_2.Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services4_components_node_2.Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller, new pip_services4_components_node_2.Descriptor('beacons', 'service', 'http', 'default', '1.0'), service);
        service.setReferences(references);
        controller.setReferences(references);
        yield persistence.open(null);
        yield controller.open(null);
        yield client.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield controller.close(null);
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        let beacon1;
        // Create the first beacon
        let beacon = yield client.callCommand('create_beacon', null, {
            beacon: BEACON1
        });
        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Create the second beacon
        beacon = yield client.callCommand('create_beacon', null, {
            beacon: BEACON2
        });
        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Get all beacons
        let page = yield client.callCommand('get_beacons', null, {
            filter: new pip_services4_data_node_1.FilterParams(),
            paging: new pip_services4_data_node_2.PagingParams()
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        beacon1 = page.data[0];
        // Update the beacon
        beacon1.label = 'ABC';
        beacon = yield client.callCommand('update_beacon', null, {
            beacon: beacon1
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        assert.equal('ABC', beacon.label);
        // Get beacon by udi
        beacon = yield client.callCommand('get_beacon_by_udi', null, {
            udi: beacon1.udi
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Calculate position for one beacon
        let position = yield client.callCommand('calculate_position', null, {
            site_id: '1',
            udis: ['00001']
        });
        assert.isObject(position);
        assert.equal('Point', position.type);
        assert.lengthOf(position.coordinates, 2);
        assert.equal(0, position.coordinates[0]);
        assert.equal(0, position.coordinates[1]);
        // Delete the beacon
        beacon = yield client.callCommand('delete_beacon_by_id', null, {
            beacon_id: beacon1.id
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Try to get deleted beacon
        beacon = yield client.callCommand('get_beacon_by_id', null, {
            beacon_id: beacon1.id
        });
        assert.isNull(beacon || null);
    }));
});
//# sourceMappingURL=BeaconsHttpControllerV1Test.js.map