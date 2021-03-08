#!/usr/bin/env node
import meow from "meow";
import { crxdl } from "./";

const cli = meow(
	`
	Usage
      $ crxdl <url> [output]
      
	Options
      --output, -o  Set download destination
      
	Example
      $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa
      # download extension to current directory

      $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa -o /home/downloads
      # download extension to /home/download
`,
	{
		flags: {
			output: {
				type: "string",
				default: "./",
				alias: "o",
			},
		},
	}
);

const url = cli["input"][0];
if (typeof url === "undefined") throw new Error("URL cannot be empty.");
const output = cli["flags"]["output"];
(async () => {
	try {
		const dir = await crxdl({ url, output });
		console.log(`[@] downloaded to ${dir}`);
	} catch (error) {
		throw new Error(error);
	}
})();
