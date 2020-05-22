"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./sequelize");
const index_router_1 = require("./controllers/v0/index.router");
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config/config");
const model_index_1 = require("./controllers/v0/model.index");
(() => __awaiter(this, void 0, void 0, function* () {
    const REQUIRED_ENVIRONMENT_SETTINGS = [
        { name: "POSTGRES_USERNAME", message: "Usernam of Postgres DB" },
        { name: "POSTGRES_PASSWORD", message: "Password of Postgres DB" },
        { name: "POSTGRES_DB", message: "DB Name of Postgres DB" },
        { name: "POSTGRES_HOST", message: "Host of Postgres DB" },
        { name: "AWS_REGION", message: "Our AWS Region" },
        { name: "AWS_PROFILE", message: "The used AWS Profile" },
        { name: "AWS_BUCKET", message: "The S3 Bucket" },
        { name: "URL", message: "Local URL" },
        { name: "JWT_SECRET", message: "Secret for JWT" },
    ];
    for (var env of REQUIRED_ENVIRONMENT_SETTINGS) {
        if (!process.env[env.name]) {
            console.error(`Environment variable ${env.name} should be set: ${env.message}`);
        }
        else {
            // convenient for debug; however: this line exposes all environment variable values - including any secret values they may contain
            console.log(`Environment variable ${env.name} is set to : ${process.env[env.name]}`);
        }
    }
    yield sequelize_1.sequelize.addModels(model_index_1.V0_FEED_MODELS);
    yield sequelize_1.sequelize.addModels(model_index_1.V0_USER_MODELS);
    yield sequelize_1.sequelize.sync();
    const app = express_1.default();
    const port = process.env.PORT || 8080;
    app.use(body_parser_1.default.json());
    app.use(cors_1.default({
        allowedHeaders: [
            'Origin', 'X-Requested-With',
            'Content-Type', 'Accept',
            'X-Access-Token', 'Authorization',
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: config_1.config.url,
    }));
    app.use('/api/v0/', index_router_1.IndexRouter);
    // Root URI call
    app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('/api/v0/');
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running ${config_1.config.url}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map