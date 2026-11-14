import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends React.Component<
  {children: React.ReactNode},
  ErrorBoundaryState
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false, errorMessage: ''};
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown) {
    console.error('MineLaunch Hub render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full rounded-2xl border border-red-800/60 bg-neutral-900 p-6 space-y-4 shadow-2xl">
            <h1 className="text-lg font-bold text-red-400">
              Gagal Memuat MineLaunch Hub
            </h1>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Terjadi kendala saat merender halaman ({this.state.errorMessage || 'Unknown error'}).
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                Muat Ulang Halaman
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.clear();
                  } catch {
                    // ignore
                  }
                  window.location.reload();
                }}
                className="rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition-colors"
              >
                Reset Cache &amp; Muat Ulang
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>,
);
