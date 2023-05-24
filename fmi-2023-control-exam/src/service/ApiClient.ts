const API_PORT = process.env.API_PORT || "4000";
export const BASE_API_URL = `http://localhost:${API_PORT}`;

export type ApiResponse<T> =
	| {
			success: true;
			data: T;
	  } //
	| {
			success: false;
			error: string;
	  }; //

export const handleRequest = async <D>(url: string, options?: RequestInit) => {
	try {
		const resp = await fetch(url, options);
		if (resp.status >= 400) {
			return Promise.reject(resp.body);
		}
		return resp.json() as D;
	} catch (err) {
		return Promise.reject(err);
	}
};
