// @ts-nocheck
import * as SDK from "@directus/sdk";
import { ConditionalFilter, CrudFilters, CrudSorting, DataProvider, LogicalFilter } from "@refinedev/core";
import pluralize from "pluralize";

const operators = {
    eq: "_eq",
    ne: "_neq",
    lt: "_lt",
    gt: "_gt",
    lte: "_lte",
    gte: "_gte",
    in: "_in",
    nin: "_nin",
    contains: "_contains",
    containss: "_icontains",
    ncontains: "_ncontains",
    ncontainss: undefined,
    null: "_null",
    nnull: "_nnull",
    between: "_between",
    nbetween: "_nbetween",
    startswith: "_starts_with",
    startswiths: "_istarts_with",
    nstartswith: "_nstarts_with",
    nstartswiths: "_nistarts_with",
    endswith: "_ends_with",
    endswiths: "_iends_with",
    nendswith: "_nends_with",
    nendswiths: "_niends_with",
    or: "_or",
    and: "_and",
    intersects: "_intersects",
    nintersects: "_nintersects",
    intersectsbbox: "_intersects_bbox",
    nintersectsbbox: "_nintersects_bbox",
};

const strToObj = (str: string, val: any) => {
    var i: number,
        obj = {},
        strarr = str.split(".");
    var x: any = obj;
    for (i = 0; i < strarr.length - 1; i++) {
        x = x[strarr[i]] = {};
    }
    x[strarr[i]] = val;
    return obj;
};

const generateSort = (sort?: CrudSorting) => {
    const _sort: string[] = [];

    if (sort) {
        sort.map((item) => {
            if (item.order) {
                item.order === "desc" ? _sort.push(`-${item.field}`) : _sort.push(`${item.field}`);
            }
        });
    }

    return _sort;
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: any } = {};
    let search: string = "";
    if (filters) {
        queryFilters["_and"] = [];
        filters.map((filter) => {
            if (filter.operator !== "or" && filter.operator !== "and" && "field" in filter) {
                const { field, operator, value } = filter;

                if (value) {
                    if (field === "search") {
                        search = value;
                    } else {
                        let logicalFilter = generateLogicalFilter(filter);
                        logicalFilter && queryFilters["_and"].push(logicalFilter);
                    }
                }
            } else {
                let conditionalFilter = generateConditionalFilter(filter);
                conditionalFilter && queryFilters["_and"].push(conditionalFilter);
            }
        });
    }

    return { search: search, filters: queryFilters };
};

//Function to handle logical filters
const generateLogicalFilter = (item?: LogicalFilter) => {
    if (item === undefined) return null;

    const { field, operator, value } = item;
    const directusOperator = operators[operator];
    let queryField = `${field}.${directusOperator}`;
    let filterObj = strToObj(queryField, value);

    return filterObj;
};

//Function to handle conditional filters
const generateConditionalFilter = (item?: ConditionalFilter) => {
    if (item === undefined) return null;

    const { operator, value } = item;
    const directusOperator = operators[operator];

    const conditionalFilters: { [key: string]: any } = {};
    conditionalFilters[directusOperator] = [];

    value.map((item) => {
        if ("field" in item) {
            let logicalFilter = generateLogicalFilter(item);
            logicalFilter && conditionalFilters[directusOperator].push(logicalFilter);
        } else {
            let conditionalFilter = generateConditionalFilter(item);
            conditionalFilter && conditionalFilters[directusOperator].push(conditionalFilter);
        }
    });

    return conditionalFilters;
};

//Function to return SDK function based on resource and type
const getSDKFunction = (resource: string, type: string, singular: boolean = false) => {
    //If resource is directus_users then function is readUsers, createUsers, etc.
    //If resource is directus_files then function is readFiles, createFiles, etc.
    //If resource is directus_roles then function is readRoles, createRoles, etc.

    //if resource has directus_ then remove it

    let functionName = null;

    if (resource.includes("directus_")) {
        resource = resource.replace("directus_", "");
    } else {
        return null;
    }

    if (singular) {
        functionName = `${type}${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
        //Remove s from end of function name
        functionName = pluralize.singular(functionName);
    } else {
        functionName = `${type}${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
        functionName = pluralize.plural(functionName);
    }

    //Get SDK function
    const sdkFunction = SDK[functionName];

    return sdkFunction as Function;
};

export const dataProvider = (directusClient: any): DataProvider => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 50;

        const _sort = generateSort(sorters);
        const paramsFilters = generateFilter(filters);

        let status: any = { status: { _neq: "archived" } };

        //Assign copy of fields
        let fields: any = meta?.fields ? [...meta.fields] : ["*"];

        //Delete fields from meta
        delete meta?.fields;

        if (meta?.archived === true || meta?.noStatus == true) {
            status = {};
        }

        let search = {};
        if (paramsFilters.search) {
            search = { search: paramsFilters.search };
        }

        let params: any = {
            ...search,
            filter: {
                ...paramsFilters.filters,
                ...status,
            },
            page: current,
            limit: pageSize,
            ...meta,
        };

        let sortString: any = null;
        if (sorters && sorters.length > 0) {
            sortString = _sort.join(",");
        }

        if (sortString) {
            params["sort"] = sortString;
        }

        try {
            const sdkFunction = getSDKFunction(resource, "read", false);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction({ ...params, fields }) : SDK.readItems(resource, { ...params, fields })
            );

            if (pageSize == -1 || pagination?.mode == "off") {
                return {
                    data: response,
                    total: response.length,
                };
            }

            delete params["page"];

            const aggregateField = meta?.aggregateField ? meta.aggregateField : "id";

            const total = await directusClient.request(
                SDK.aggregate(resource, {
                    query: params,
                    aggregate: {
                        countDistinct: aggregateField,
                    },
                })
            );

            return {
                data: response,
                total: parseInt(total[0]?.countDistinct?.[aggregateField]) ?? 0,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    getMany: async ({ resource, ids, meta }) => {
        let fields: any = meta?.fields ? [...meta.fields] : ["*"];
        let aggregateField = meta?.aggregateField ? meta.aggregateField : "id";

        //Delete fields from meta
        delete meta?.fields;
        delete meta?.aggregateField;

        let params: any = {
            filter: {
                [aggregateField]: { _in: ids },
            },
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "read", false);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction({ ...params, fields }) : SDK.readItems(resource, { ...params, fields })
            );

            return {
                data: response,
                total: response.length,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    create: async ({ resource, variables, meta }) => {
        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "create", true);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction(params) : SDK.createItem(resource, params)
            );

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    update: async ({ resource, id, variables, meta }) => {
        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "update", true);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction(id, params) : SDK.updateItem(resource, id, params)
            );

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
        let idsFormatted: any = ids;

        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "update", false);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction(idsFormatted, params) : SDK.updateItems(resource, idsFormatted, params)
            );

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    createMany: async ({ resource, variables, meta }) => {
        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "create", false);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction(params) : SDK.createItems(resource, params)
            );

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    getOne: async ({ resource, id, meta }) => {
        let params: any = {
            ...meta,
        };

        try {
            const sdkFunction = getSDKFunction(resource, "read", true);

            const response: any = await directusClient.request(
                sdkFunction ? sdkFunction(id, params) : SDK.readItem(resource, id, params)
            );

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    deleteOne: async ({ resource, id, meta }) => {
        try {
            if (meta && meta.deleteType === "archive") {
                let params: any = {
                    status: "archived",
                    ...meta,
                };

                const sdkFunction = getSDKFunction(resource, "update", true);

                const response: any = await directusClient.request(
                    sdkFunction ? sdkFunction(id, params) : SDK.updateItem(resource, id, params)
                );

                return {
                    data: response,
                };
            } else {
                const sdkFunction = getSDKFunction(resource, "delete", true);

                const response: any = await directusClient.request(
                    sdkFunction ? sdkFunction(id) : SDK.deleteItem(resource, id)
                );

                return {
                    data: response,
                };
            }
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    deleteMany: async ({ resource, ids, meta }) => {
        try {
            let idsFormatted: any = ids;

            if (meta && meta.deleteType === "archive") {
                let params: any = {
                    status: "archived",
                    ...meta,
                };

                const sdkFunction = getSDKFunction(resource, "update", false);

                const response: any = await directusClient.request(
                    sdkFunction ? sdkFunction(idsFormatted, params) : SDK.updateItems(resource, idsFormatted, params)
                );

                return {
                    data: response,
                };
            } else {
                const sdkFunction = getSDKFunction(resource, "delete", false);

                const response: any = await directusClient.request(
                    sdkFunction ? sdkFunction(idsFormatted) : SDK.deleteItems(resource, idsFormatted)
                );

                return {
                    data: response.data,
                };
            }
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    getApiUrl: () => {
        const url: any = directusClient.url;
        return url;
    },

    custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
        let response: any;
        switch (method) {
            case "put":
                response = await directusClient.request(() => ({
                    path: url,
                    method: "PUT",
                    body: JSON.stringify(payload),
                    params: query as any,
                }));

                break;
            case "post":
                response = await directusClient.request(() => ({
                    path: url,
                    method: "POST",
                    body: JSON.stringify(payload),
                    params: query as any,
                }));
                break;
            case "patch":
                response = await directusClient.request(() => ({
                    path: url,
                    method: "PATCH",
                    body: JSON.stringify(payload),
                    params: query as any,
                }));
                break;
            case "delete":
                response = await directusClient.request(() => ({
                    path: url,
                    method: "DELETE",
                    params: query as any,
                }));
                break;
            default:
                response = await directusClient.request(() => ({
                    path: url,
                    method: "GET",
                    params: query as any,
                }));
                break;
        }

        return {
            data: response,
        };
    },
});
