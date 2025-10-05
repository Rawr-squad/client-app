// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './routes/__root';
import './index.css';
import { ElectronProvider } from './providers/ElectronProvider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
		},
	},
});

// Check if we're in Electron
const isElectron =
	typeof window !== 'undefined' &&
	window.process &&
	window.process.type === 'renderer';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ElectronProvider>
				<RouterProvider router={router} />
				{!isElectron && <ReactQueryDevtools initialIsOpen={false} />}
			</ElectronProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

