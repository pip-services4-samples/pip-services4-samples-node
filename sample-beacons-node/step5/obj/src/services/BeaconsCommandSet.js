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
exports.BeaconsCommandSet = void 0;
const pip_services4_rpc_node_1 = require("pip-services4-rpc-node");
const pip_services4_rpc_node_2 = require("pip-services4-rpc-node");
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const pip_services4_data_node_3 = require("pip-services4-data-node");
const pip_services4_data_node_4 = require("pip-services4-data-node");
const pip_services4_commons_node_1 = require("pip-services4-commons-node");
const pip_services4_data_node_5 = require("pip-services4-data-node");
const pip_services4_data_node_6 = require("pip-services4-data-node");
const BeaconV1Schema_1 = require("../../src/data/version1/BeaconV1Schema");
class BeaconsCommandSet extends pip_services4_rpc_node_1.CommandSet {
    constructor(service) {
        super();
        this._service = service;
        this.addCommand(this.makeGetBeaconsCommand());
        this.addCommand(this.makeGetBeaconByIdCommand());
        this.addCommand(this.makeGetBeaconByUdiCommand());
        this.addCommand(this.makeCalculatePositionCommand());
        this.addCommand(this.makeCreateBeaconCommand());
        this.addCommand(this.makeUpdateBeaconCommand());
        this.addCommand(this.makeDeleteBeaconByIdCommand());
    }
    makeGetBeaconsCommand() {
        return new pip_services4_rpc_node_2.Command('get_beacons', new pip_services4_data_node_1.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services4_data_node_2.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services4_data_node_3.PagingParamsSchema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services4_data_node_5.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services4_data_node_6.PagingParams.fromValue(args.get('paging'));
            return yield this._service.getBeacons(ctx, filter, paging);
        }));
    }
    makeGetBeaconByIdCommand() {
        return new pip_services4_rpc_node_2.Command('get_beacon_by_id', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('beacon_id', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let beaconId = args.getAsString('beacon_id');
            return yield this._service.getBeaconById(ctx, beaconId);
        }));
    }
    makeGetBeaconByUdiCommand() {
        return new pip_services4_rpc_node_2.Command('get_beacon_by_udi', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('udi', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let udi = args.getAsString('udi');
            return yield this._service.getBeaconByUdi(ctx, udi);
        }));
    }
    makeCalculatePositionCommand() {
        return new pip_services4_rpc_node_2.Command('calculate_position', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('site_id', pip_services4_commons_node_1.TypeCode.String)
            .withRequiredProperty('udis', new pip_services4_data_node_4.ArraySchema(pip_services4_commons_node_1.TypeCode.String)), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let siteId = args.getAsString('site_id');
            let udis = args.getAsObject('udis');
            return yield this._service.calculatePosition(ctx, siteId, udis);
        }));
    }
    makeCreateBeaconCommand() {
        return new pip_services4_rpc_node_2.Command('create_beacon', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('beacon', new BeaconV1Schema_1.BeaconV1Schema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let beacon = args.getAsObject('beacon');
            return yield this._service.createBeacon(ctx, beacon);
        }));
    }
    makeUpdateBeaconCommand() {
        return new pip_services4_rpc_node_2.Command('update_beacon', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('beacon', new BeaconV1Schema_1.BeaconV1Schema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let beacon = args.getAsObject('beacon');
            return yield this._service.updateBeacon(ctx, beacon);
        }));
    }
    makeDeleteBeaconByIdCommand() {
        return new pip_services4_rpc_node_2.Command('delete_beacon_by_id', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('beacon_id', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let beaconId = args.getAsString('beacon_id');
            return yield this._service.deleteBeaconById(ctx, beaconId);
        }));
    }
}
exports.BeaconsCommandSet = BeaconsCommandSet;
//# sourceMappingURL=BeaconsCommandSet.js.map