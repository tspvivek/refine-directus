//@ts-nocheck
import { authentication, createDirectus, readMe, rest, staticToken } from "@directus/sdk";

export const AuthHelper = (directusClient: any) => {
    return {
        login: async (identifier: string, password: string, mode: string = "json") => {
            let response = await directusClient.login(identifier, password, { mode });

            return response;
        },
        me: async (metaData: {}) => {
            let me = await directusClient.request(readMe(metaData));
            return me;
        },
        setToken: async (token: string) => {
            await directusClient.with(staticToken(token));
        },
        getToken: () => {
            return directusClient.getToken();
        },
        logout: async () => {
            return await directusClient.logout();
        },
    };
};
