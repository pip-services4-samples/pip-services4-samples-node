"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconV1Schema = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_commons_node_1 = require("pip-services4-commons-node");
class BeaconV1Schema extends pip_services4_data_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services4_commons_node_1.TypeCode.String);
        this.withRequiredProperty('site_id', pip_services4_commons_node_1.TypeCode.String);
        this.withOptionalProperty('type', pip_services4_commons_node_1.TypeCode.String);
        this.withRequiredProperty('udi', pip_services4_commons_node_1.TypeCode.String);
        this.withOptionalProperty('label', pip_services4_commons_node_1.TypeCode.String);
        this.withOptionalProperty('center', null);
        this.withOptionalProperty('radius', pip_services4_commons_node_1.TypeCode.Float);
    }
}
exports.BeaconV1Schema = BeaconV1Schema;
//# sourceMappingURL=BeaconV1Schema.js.map