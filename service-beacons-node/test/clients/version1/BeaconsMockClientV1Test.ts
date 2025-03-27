
import { BeaconsMockClientV1 } from '../../../src/clients/version1/BeaconsMockClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

suite('BeaconsMockClientV1', () => {
    let client: BeaconsMockClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup(() => {
        client = new BeaconsMockClientV1();
        fixture = new BeaconsClientV1Fixture(client);
    });

    teardown(() => {
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Calculate Positions', async () => {
        fixture.testCalculatePosition();
    });
});