import {
    ConditionalFilter,
    CrudFilter,
    CrudFilters,
    CrudSorting,
    DataProvider,
    LogicalFilter,
} from "@refinedev/core";

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
    startswiths: undefined,
    nstartswith: "_nstarts_with",
    nstartswiths: undefined,
    endswith: "_ends_with",
    endswiths: undefined,
    nendswith: "_nends_with",
    nendswiths: undefined,
    or: "_or",
    and: "_and",
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

export const dataProvider = (directusClient: any): DataProvider => ({
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 50;

        const _sort = generateSort(sorters);
        const paramsFilters = generateFilter(filters);

        const directus = directusClient.items(resource);

        let status: any = { status: { _neq: "archived" } };

        if (meta?.archived === true) {
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
            meta: "*",
            page: current,
            limit: pageSize,
            fields: ["*"],
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
            const response: any = await directus.readByQuery(params);

            return {
                data: response.data,
                total: response.meta.filter_count,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    getMany: async ({ resource, ids, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            filter: {
                id: { _in: ids },
            },
            fields: ["*"],
            ...meta,
        };

        try {
            const response: any = await directus.readByQuery(params);

            return {
                data: response.data,
                total: response.meta.filter_count,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    create: async ({ resource, variables, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const response: any = await directus.createOne(params);

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    update: async ({ resource, id, variables, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const response: any = await directus.updateOne(id, params);

            return {
                data: response,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const response: any = await directus.updateMany(ids, params);

            return {
                data: response.data,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    createMany: async ({ resource, variables, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            ...variables,
            ...meta,
        };

        try {
            const response: any = await directus.createMany(params);

            return {
                data: response.data,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    getOne: async ({ resource, id, meta }) => {
        const directus = directusClient.items(resource);

        let params: any = {
            ...meta,
        };

        try {
            const response: any = await directus.readOne(id, params);

            return Promise.resolve({
                data: response,
            });
        } catch (e) {
            console.log(e);
            throw new Error(e.errors && e.errors[0] && e.errors[0].message);
        }
    },

    deleteOne: async ({ resource, id, meta }) => {
        const directus = directusClient.items(resource);

        try {
            if (meta && meta.deleteType === "archive") {
                let params: any = {
                    status: "archived",
                    ...meta,
                };

                const response: any = await directus.updateOne(id, params);

                return {
                    data: response,
                };
            } else {
                const response: any = await directus.deleteOne(id);

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
        const directus = directusClient.items(resource);

        try {
            if (meta && meta.deleteType === "archive") {
                let params: any = {
                    status: "archived",
                    ...meta,
                };
                const response: any = await directus.updateMany(ids, params);

                return {
                    data: response,
                };
            } else {
                const response: any = await directus.deleteMany(ids);

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
        return directusClient.url;
    },

    custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
        const directusTransport = directusClient.transport;

        let response: any;
        switch (method) {
            case "put":
                response = await directusTransport.put(url, payload, {
                    headers: headers,
                    params: query,
                });
                break;
            case "post":
                response = await directusTransport.post(url, payload, {
                    headers: headers,
                    params: query,
                });
                break;
            case "patch":
                response = await directusTransport.patch(url, payload, {
                    headers: headers,
                    params: query,
                });
                break;
            case "delete":
                response = await directusTransport.delete(url, {
                    headers: headers,
                    params: query,
                });
                break;
            default:
                response = await directusTransport.get(url, {
                    headers: headers,
                    params: query,
                });
                break;
        }

        return {
            ...response,
            data: response.data,
        };
    },
});
