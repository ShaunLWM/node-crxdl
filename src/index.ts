import download from "download";
import https from "https";
import path from "path";
import tempDirectory from "temp-dir";

const CWS_PATTERN = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/;

export const getExtensionId = (url: string) => {
	let match = CWS_PATTERN.exec(url);
	if (match) return match[1];
	return null;
};

export const crxdl = async ({
	url,
	output,
	filename,
}: {
	url: string;
	output?: string;
	filename?: string;
}): Promise<string> => {
	try {
		const extensionId = url.length === 32 ? url : getExtensionId(url);
		if (!extensionId) throw new Error("Failed to parse extension id");
		const extensionUrl = `https://clients2.google.com/service/update2/crx?response=redirect&os=win&arch=x86-64&os_arch=x86-64&nacl_arch=x86-64&prod=chromecrx&prodchannel=unknown&prodversion=76.0.3809.132&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc`;
		await download(extensionUrl, output ?? tempDirectory, {
			filename: filename ?? `${extensionId}.crx`,
			agent: new https.Agent({ keepAlive: true }),
		});

		return path.join(output ?? tempDirectory, filename ?? `${extensionId}.crx`);
	} catch (error) {
		throw new Error(error);
	}
};
