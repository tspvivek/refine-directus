export interface MediaConfig {
    maxCount: number;
    name: string;
    multiple: boolean;
    normalize?: (item: any) => any;
    title?: string;
    folder?: string;
}
export interface ValuePropsConfig {
    data: any;
    imageUrl: string;
    getFileUrl?: (item: any) => any;
    getFileTitle?: (item: any) => any;
}
export declare const getValueProps: (valueProps: ValuePropsConfig) => {
    file: any;
    fileList: any;
} | {
    fileList: never[];
};
export declare const useDirectusUpload: (mediaConfigList: MediaConfig[], directusClient: any) => (fieldName: string) => {
    uploadedFileIds: string[];
    beforeUpload: (_file: any, files: any[]) => boolean;
    fileList: any[];
    maxCount: number;
    customRequest: ({ file, onError, onSuccess }: any) => Promise<void>;
};
export declare const mediaUploadMapper: (params: any, mediaConfigList: MediaConfig[]) => any;
