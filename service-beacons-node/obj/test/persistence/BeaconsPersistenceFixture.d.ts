import { IBeaconsPersistence } from '../../src/persistence/IBeaconsPersistence';
export declare class BeaconsPersistenceFixture {
    private _persistence;
    constructor(persistence: IBeaconsPersistence);
    private testCreateBeacons;
    testCrudOperations(): Promise<void>;
    testGetWithFilters(): Promise<void>;
}
