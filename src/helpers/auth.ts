export const AuthHelper = (directusClient: any) => {
	return {
		login: async (identifier: string, password: string) => {
			let response = await directusClient.auth.login({
				email: identifier,
				password: password
			});

			return response;
		},
		me: async (metaData: {}) => {
			let me = await directusClient.users.me.read(metaData);
			return me;
		},
		setToken: async (token: string) => {
			await directusClient.auth.static(token);
		},
		getToken: () => {
			return directusClient.auth.token;
		},
		logout: async () => {
			return await directusClient.auth.logout();
		}
	};
};
