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
exports.BeaconsService = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const BeaconTypeV1_1 = require("../../src/data/version1/BeaconTypeV1");
class BeaconsService {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services4_components_node_1.Descriptor('beacons', 'persistence', '*', '*', '1.0'));
    }
    getBeacons(ctx, filter, paging) {
        return this._persistence.getPageByFilter(ctx, filter, paging);
    }
    getBeaconById(ctx, beaconId) {
        return this._persistence.getOneById(ctx, beaconId);
    }
    getBeaconByUdi(ctx, beaconId) {
        return this._persistence.getOneByUdi(ctx, beaconId);
    }
    calculatePosition(ctx, siteId, udis) {
        return __awaiter(this, void 0, void 0, function* () {
            if (udis == null || udis.length == 0) {
                return null;
            }
            let page = yield this._persistence.getPageByFilter(ctx, pip_services4_data_node_1.FilterParams.fromTuples('site_id', siteId, 'udis', udis), null);
            let beacons = page.data || [];
            let lat = 0;
            let lng = 0;
            let count = 0;
            for (let beacon of beacons) {
                if (beacon.center != null
                    && beacon.center.type == 'Point'
                    && Array.isArray(beacon.center.coordinates)) {
                    lng += beacon.center.coordinates[0];
                    lat += beacon.center.coordinates[1];
                    count += 1;
                }
            }
            if (count == 0) {
                return null;
            }
            let position = {
                type: 'Point',
                coordinates: [lng / count, lat / count]
            };
            return position;
        });
    }
    createBeacon(ctx, beacon) {
        beacon.id = beacon.id || pip_services4_data_node_2.IdGenerator.nextLong();
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        return this._persistence.create(ctx, beacon);
    }
    updateBeacon(ctx, beacon) {
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        return this._persistence.update(ctx, beacon);
    }
    deleteBeaconById(ctx, beaconId) {
        return this._persistence.deleteById(ctx, beaconId);
    }
}
exports.BeaconsService = BeaconsService;
//# sourceMappingURL=BeaconsService.js.map