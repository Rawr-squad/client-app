// src/routes/__root.tsx
import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { SecretsManager } from '../pages/SecretsManager';
import { Settings } from '../pages/Settings';

const rootRoute = createRootRoute({
	component: () => (
		<Layout>
			<Outlet />
		</Layout>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Dashboard,
});

const secretsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/secrets',
	component: SecretsManager,
});

const settingsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/settings',
	component: Settings,
});

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	secretsRoute,
	settingsRoute,
	loginRoute,
]);

export const router = createRouter({ routeTree });
