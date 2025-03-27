"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsHttpControllerV1 = void 0;
const pip_services4_http_node_1 = require("pip-services4-http-node");
const pip_services4_components_node_1 = require("pip-services4-components-node");
class BeaconsHttpControllerV1 extends pip_services4_http_node_1.CommandableHttpController {
    constructor() {
        super('v1/beacons');
        this._dependencyResolver.put('service', new pip_services4_components_node_1.Descriptor('beacons', 'service', '*', '*', '1.0'));
    }
}
exports.BeaconsHttpControllerV1 = BeaconsHttpControllerV1;
//# sourceMappingURL=BeaconsHttpControllerV1.js.map