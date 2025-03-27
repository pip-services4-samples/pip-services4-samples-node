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
exports.BeaconsMongoDbPersistence = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_mongodb_node_1 = require("pip-services4-mongodb-node");
class BeaconsMongoDbPersistence extends pip_services4_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('beacons');
        this._maxPageSize = 100;
    }
    composeFilter(filter) {
        filter = filter || new pip_services4_data_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) {
            criteria.push({ site_id: siteId });
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({ label: label });
        }
        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            criteria.push({ udi: udi });
        }
        let udis = filter.getAsObject('udis');
        if (typeof udis === "string") {
            udis = udis.split(',');
        }
        if (Array.isArray(udis)) {
            criteria.push({ udi: { $in: udis } });
        }
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(ctx, filter, paging) {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }
    getOneByUdi(ctx, udi) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                udi: udi
            };
            let item = yield this._collection.findOne(criteria);
            if (item != null)
                this._logger.trace(ctx, "Found beacon by %s", udi);
            else
                this._logger.trace(ctx, "Cannot find beacon by %s", udi);
            item = this.convertToPublic(item);
            return item;
        });
    }
}
exports.BeaconsMongoDbPersistence = BeaconsMongoDbPersistence;
//# sourceMappingURL=BeaconsMongoDbPersistence.js.map