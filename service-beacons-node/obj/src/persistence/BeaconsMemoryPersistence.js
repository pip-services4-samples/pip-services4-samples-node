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
exports.BeaconsMemoryPersistence = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_persistence_node_1 = require("pip-services4-persistence-node");
class BeaconsMemoryPersistence extends pip_services4_persistence_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 100;
    }
    composeFilter(filter) {
        filter = filter || new pip_services4_data_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let label = filter.getAsNullableString('label');
        let udi = filter.getAsNullableString('udi');
        let udis = filter.getAsObject('udis');
        if (typeof udis === "string") {
            udis = udis.split(',');
        }
        if (!Array.isArray(udis)) {
            udis = null;
        }
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (label != null && item.label != label)
                return false;
            if (udi != null && item.udi != udi)
                return false;
            if (udis != null && udis.indexOf(item.udi) < 0)
                return false;
            return true;
        };
    }
    getPageByFilter(ctx, filter, paging) {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }
    getOneByUdi(ctx, udi) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((item) => item.udi == udi);
            if (item != null)
                this._logger.trace(ctx, "Found beacon by %s", udi);
            else
                this._logger.trace(ctx, "Cannot find beacon by %s", udi);
            return item;
        });
    }
}
exports.BeaconsMemoryPersistence = BeaconsMemoryPersistence;
//# sourceMappingURL=BeaconsMemoryPersistence.js.map