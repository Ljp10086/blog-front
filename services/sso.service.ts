import { NextRouter } from 'next/router';

export const loginWithGithubSSO = (router: NextRouter) => {
	router.push('/api/github-sso/login');
};
