import download from "download";
import path from "path";
import tempDirectory from "temp-dir";
import { crxdl, getExtensionId } from "../";

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
	})

	it("should match id given", () => {
		for (const extension of extensions) {
			expect(extension.id).toBe(getExtensionId(extension.url));
		}
	});

	it("should throw when url is invalid", () => {
		for (const extension of invalid) {
			expect(getExtensionId(extension.url)).toBeNull();
		}
	});

	it("should download extension for valid url", async () => {
		extensions.push({
			url: "bmnlcjabgnpnenekpadlanbbkooimhnj",
			id: "bmnlcjabgnpnenekpadlanbbkooimhnj",
		});

		for (const extension of extensions) {
			const directory = await crxdl({ url: extension.url });
			expect(download).toBeCalled();
			expect(directory).toBe(path.join(tempDirectory, `${extension.id}.crx`))
		}
	});
});
