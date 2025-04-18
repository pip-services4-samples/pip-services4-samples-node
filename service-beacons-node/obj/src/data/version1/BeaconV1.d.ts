import { IStringIdentifiable } from 'pip-services4-data-node';
export declare class BeaconV1 implements IStringIdentifiable {
    id: string;
    site_id: string;
    type?: string;
    udi: string;
    label?: string;
    center?: any;
    radius?: number;
}
