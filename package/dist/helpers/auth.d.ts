export declare const AuthHelper: (directusClient: any) => {
    login: (identifier: string, password: string, mode?: string) => Promise<any>;
    me: (metaData: {}) => Promise<any>;
    setToken: (token: string) => Promise<void>;
    getToken: () => any;
    logout: () => Promise<any>;
};
