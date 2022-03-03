export declare const AuthHelper: (directusClient: any) => {
    login: (identifier: string, password: string) => Promise<any>;
    me: (metaData: {}) => Promise<any>;
    setToken: (token: string) => Promise<void>;
    getToken: () => Promise<any>;
    logout: () => Promise<any>;
};
