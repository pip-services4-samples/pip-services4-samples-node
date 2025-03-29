import { ConfigParams } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { References } from 'pip-services4-components-node';

import { BeaconsMemoryPersistence } from '../../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsService } from '../../../src/services/BeaconsService';
import { BeaconsHttpControllerV1 } from '../../../src/controllers/version1/BeaconsHttpControllerV1';
import { BeaconsHttpClientV1 } from '../../../src/clients/version1/BeaconsHttpClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

suite('BeaconsHttpClientV1', () => {
    let persistence: BeaconsMemoryPersistence;
    let service: BeaconsService;
    let controller: BeaconsHttpControllerV1;
    let client: BeaconsHttpClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup(async () => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        service = new BeaconsService();
        service.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        controller = new BeaconsHttpControllerV1();
        controller.configure(httpConfig);

        client = new BeaconsHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('beacons', 'service', 'default', 'default', '1.0'), service,
            new Descriptor('beacons', 'controller', 'http', 'default', '1.0'), controller,
            new Descriptor('beacons', 'client', 'http', 'default', '1.0'), client
        );
        service.setReferences(references);
        controller.setReferences(references);
        client.setReferences(references);

        fixture = new BeaconsClientV1Fixture(client);

        await persistence.open(null);
        await controller.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await controller.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Calculate Position', async () => {
        await fixture.testCalculatePosition();
    });

});