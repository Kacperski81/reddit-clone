import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import useStore from './store';

const queryClient = new QueryClient();

export default function AppProviders({ children }: { children: React.ReactNode }) {
    const isDarkTheme = useStore(state => state.isDarkTheme);
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-center" />
            <ThemeProvider theme={theme(isDarkTheme)}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    )
}