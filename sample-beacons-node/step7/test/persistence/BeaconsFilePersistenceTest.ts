import { ConfigParams } from 'pip-services4-components-node';

import { BeaconsFilePersistence } from '../../src/persistence/BeaconsFilePersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsFilePersistence', () => {
    let persistence: BeaconsFilePersistence;
    let fixture: BeaconsPersistenceFixture;

    setup(async () => {
        persistence = new BeaconsFilePersistence();
        persistence.configure(ConfigParams.fromTuples(
            "path", "data/beacons.test.json"
        ));

        fixture = new BeaconsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilters();
    });

});