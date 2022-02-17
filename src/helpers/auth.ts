import { Directus } from '@directus/sdk';

export const AuthHelper = (apiUrl: string) => {
	const directus = new Directus(apiUrl);

	return {
		login: async (identifier: string, password: string) => {
			return await directus.auth.login({
				email: identifier,
				password: password
			});
		},
		me: async (metaData: {}) => {
			let me = await directus.users.me.read(metaData);
			return me;
		},
		setToken: async (token: string) => {
			await directus.auth.static(token);
		},
		getToken: () => {
			return directus.auth.token;
		},
		logout: async () => {
			return await directus.auth.logout();
		}
	};
};
