const meow = require("meow");
const crxdl = require("./bin/cli");

const cli = meow(`
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
            alias: "o"
        }
    }
});

let url = cli["input"][0]
if (typeof url === "undefined") return console.error("[!] url cannot be empty.")
let output = cli["flags"]["output"];
(async function () {
    let dir = await crxdl({ url, output });
    console.log(`[@] downloaded to ${dir}`);
})();