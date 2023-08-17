export { NextRouteComponent as default } from "@refinedev/nextjs-router/legacy";
import { checkAuthentication } from "@refinedev/nextjs-router/legacy";

import { GetServerSideProps } from "next";
import authProvider from "src/authProvider";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, ...props } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return props;
    }

    return {
        props: {},
    };
};
