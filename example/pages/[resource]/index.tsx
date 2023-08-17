export { NextRouteComponent as default } from "@refinedev/nextjs-router/legacy";

import { checkAuthentication } from "@refinedev/nextjs-router/legacy";
import { dataProvider } from "@tspvivek/refine-directus";


import { GetServerSideProps } from "next";
import { directusClient } from "src/directusClient";

import authProvider from "../../src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, ...props } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return props;
    }

    const { query } = context;

    try {
        const data = await dataProvider(directusClient).getList({
            resource: query["resource"] as string,
        });

        return {
            props: {
                initialData: data,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};
