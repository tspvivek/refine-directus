import { aS, as, c, co, o } from "@directus/sdk/dist/index-c9cd424a";
import { LiveProvider } from "@refinedev/core";

const eventsMap: any = {
    created: "create",
    updated: "update",
    deleted: "delete",
};

export const liveProvider = (directusClient: any, options: {}): LiveProvider => {
    let openConnections: any = {};
    return {
        subscribe: ({ channel, types, params, callback }) => {
            let connectionId = channel
                ? channel
                : Date.now() +
                  "_" +
                  Math.random()
                      .toString(36)
                      .substring(2, 15);

            let options: any = { uid: connectionId };

            if (params?.query) {
                options = { ...options, query: params.query };
            }

            if (types?.length > 1) {
                throw new Error(
                    "Directus does not support multiple event types in a single subscription. Please create multiple subscriptions for each event type or do not pass any event type to subscribe to all events."
                );
            }

            if (types?.length && eventsMap[types[0]]) {
                options = { ...options, event: eventsMap[types[0]] };
            }

            if (params?.resource) {
                (async () => {
                    const { subscription, unsubscribe } = await directusClient.subscribe(params?.resource, options);

                    const asyncGenerator = async (subscription: any) => {
                        for await (const item of subscription) {
                            // this loop wil await new subscription events
                            callback(item);
                        }
                    };

                    asyncGenerator(subscription); // create a generator

                    openConnections[connectionId] = unsubscribe;
                })();

                return connectionId;
            } else throw new Error("resource is required");
        },

        unsubscribe: async (unsubscribe) => {
            if (unsubscribe && openConnections[unsubscribe]) {
                openConnections[unsubscribe]();
                delete openConnections[unsubscribe];
            }
        },
    };
};
