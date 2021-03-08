#!/usr/bin/env node
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
const meow_1 = __importDefault(require("meow"));
const _1 = require("./");
const cli = meow_1.default(`
	Usage
      $ crxdl <url> [output]
      
	Options
      --output, -o  Set download destination
      
	Example
      $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa
      # download extension to current directory

      $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa -o /home/downloads
      # download extension to /home/download
`, {
    flags: {
        output: {
            type: "string",
            default: "./",
            alias: "o",
        },
    },
});
const url = cli["input"][0];
if (typeof url === "undefined")
    throw new Error("URL cannot be empty.");
const output = cli["flags"]["output"];
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = yield _1.crxdl({ url, output });
        console.log(`[@] downloaded to ${dir}`);
    }
    catch (error) {
        throw new Error(error);
    }
}))();
