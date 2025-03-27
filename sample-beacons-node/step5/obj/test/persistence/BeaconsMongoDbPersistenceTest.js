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
const pip_services4_components_node_1 = require("pip-services4-components-node");
const BeaconsMongoDbPersistence_1 = require("../../src/persistence/BeaconsMongoDbPersistence");
const BeaconsPersistenceFixture_1 = require("./BeaconsPersistenceFixture");
suite('BeaconsMongoDbPersistence', () => {
    let persistence;
    let fixture;
    let mongoUri = process.env['MONGO_SERVICE_URI'];
    let mongoHost = process.env['MONGO_SERVICE_HOST'] || 'localhost';
    let mongoPort = process.env['MONGO_SERVICE_PORT'] || 27017;
    let mongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';
    // Exit if mongo connection is not set
    if (mongoUri == '' && mongoHost == '')
        return;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new BeaconsMongoDbPersistence_1.BeaconsMongoDbPersistence();
        persistence.configure(pip_services4_components_node_1.ConfigParams.fromTuples('connection.uri', mongoUri, 'connection.host', mongoHost, 'connection.port', mongoPort, 'connection.database', mongoDatabase));
        fixture = new BeaconsPersistenceFixture_1.BeaconsPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilters();
    }));
});
//# sourceMappingURL=BeaconsMongoDbPersistenceTest.js.map