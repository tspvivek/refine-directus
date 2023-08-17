import { LegacyAuthProvider as AuthProvider, useLogout } from "@refinedev/core";
import { AuthHelper } from '@tspvivek/refine-directus';
import { directusClient } from './directusClient';

const directusAuthHelper = AuthHelper(directusClient);

const authProvider: AuthProvider = {
	login: async ({ username, password }) => {
		const { access_token } = await directusAuthHelper.login(username, password);
		return access_token ? Promise.resolve("/posts") : Promise.reject();
	},
	logout: async () => {
		directusAuthHelper.logout();
		await Promise.resolve();
	},

	checkError: () => {
		return Promise.resolve();
	},

	checkAuth: async () => {
		if (directusAuthHelper.getToken()) {
			return Promise.resolve();
		} else {
			//return Promise.reject();
		}
	},
	getPermissions: () => Promise.resolve(),

	getUserIdentity: async () => {
		try {
			const data = await directusAuthHelper.me({ fields: [ '*.*' ] });
			return Promise.resolve(data);
		} catch (e) {
			window.location.href = "/login";
			return Promise.reject();
		}
	}
};

export default authProvider;
