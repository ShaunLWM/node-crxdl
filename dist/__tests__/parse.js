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
const download_1 = __importDefault(require("download"));
const path_1 = __importDefault(require("path"));
const temp_dir_1 = __importDefault(require("temp-dir"));
const __1 = require("../");
jest.mock("download", () => jest.fn());
const extensions = [
    {
        url: "https://chrome.google.com/webstore/detail/noisli/klejemegaoblahjdpcajmpcnjjmkmkkf?hl=en",
        id: "klejemegaoblahjdpcajmpcnjjmkmkkf",
    },
    {
        url: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
        id: "nkbihfbeogaeaoehlefnkodbefgpgknn",
    },
    {
        url: "https://chrome.google.com/webstore/detail/google-hangouts/nckgahadagoaajjgafhacjanaoiihapd?hl=en",
        id: "nckgahadagoaajjgafhacjanaoiihapd",
    },
];
const invalid = [
    {
        url: "http://google.com",
    },
    {
        url: "http://yahoo.com",
    },
];
describe("library test", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it("should match id given", () => {
        for (const extension of extensions) {
            expect(extension.id).toBe(__1.getExtensionId(extension.url));
        }
    });
    it("should throw when url is invalid", () => {
        for (const extension of invalid) {
            expect(__1.getExtensionId(extension.url)).toBeNull();
        }
    });
    it("should download extension for valid url", () => __awaiter(void 0, void 0, void 0, function* () {
        extensions.push({
            url: "bmnlcjabgnpnenekpadlanbbkooimhnj",
            id: "bmnlcjabgnpnenekpadlanbbkooimhnj",
        });
        for (const extension of extensions) {
            const directory = yield __1.crxdl({ url: extension.url });
            expect(download_1.default).toBeCalled();
            expect(directory).toBe(path_1.default.join(temp_dir_1.default, `${extension.id}.crx`));
        }
    }));
});
