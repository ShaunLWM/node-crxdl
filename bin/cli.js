const download = require("download");
const path = require("path");

const CWS_PATTERN = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/;
const CWS_DOWNLOAD_PATTERN = /^https?:\/\/clients2\.google\.com\/service\/update2\/crx\b.*?%3D([a-z]{32})%26uc/;

function getExtensionId(url) {
    let match = CWS_PATTERN.exec(url);
    if (match) return match[1];
    match = CWS_DOWNLOAD_PATTERN.exec(url);
    return match && match[1];
}

module.exports = async function ({ url, output = "./" }) {
    let match = getExtensionId(url);
    let extensionId = match ? match : url;
    let crx = `https://clients2.google.com/service/update2/crx?response=redirect&os=win&arch=x86-64&os_arch=x86-64&nacl_arch=x86-64&prod=chromecrx&prodchannel=unknown&prodversion=76.0.3809.132&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc`
    await download(crx, output, { filename: `${extensionId}.crx` });
    return path.join(output, `${extensionId}.crx`);
}