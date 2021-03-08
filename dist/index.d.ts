export declare const getExtensionId: (url: string) => string | null;
export declare const crxdl: ({ url, output, filename, }: {
    url: string;
    output?: string | undefined;
    filename?: string | undefined;
}) => Promise<string>;
