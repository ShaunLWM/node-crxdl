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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crxdl = exports.getExtensionId = void 0;
const download_1 = __importDefault(require("download"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const temp_dir_1 = __importDefault(require("temp-dir"));
const CWS_PATTERN = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/;
const getExtensionId = (url) => {
    let match = CWS_PATTERN.exec(url);
    if (match)
        return match[1];
    return null;
};
exports.getExtensionId = getExtensionId;
const crxdl = ({ url, output, filename, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extensionId = url.length === 32 ? url : exports.getExtensionId(url);
        if (!extensionId)
            throw new Error("Failed to parse extension id");
        const extensionUrl = `https://clients2.google.com/service/update2/crx?response=redirect&os=win&arch=x86-64&os_arch=x86-64&nacl_arch=x86-64&prod=chromecrx&prodchannel=unknown&prodversion=76.0.3809.132&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc`;
        yield download_1.default(extensionUrl, output !== null && output !== void 0 ? output : temp_dir_1.default, {
            filename: filename !== null && filename !== void 0 ? filename : `${extensionId}.crx`,
            agent: new https_1.default.Agent({ keepAlive: true }),
        });
        return path_1.default.join(output !== null && output !== void 0 ? output : temp_dir_1.default, filename !== null && filename !== void 0 ? filename : `${extensionId}.crx`);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.crxdl = crxdl;
