import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { QueryClientProvider, queryClient } from './hooks/useInversiones';

const root = document.getElementById('root');

if (root) {
  render(
    () => (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    root
  );
}
