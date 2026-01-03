import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const ErrorState = ({
  title = 'Failed to load data',
  message = 'Something went wrong while fetching the data. Please try again.',
  onRetry,
  isRetrying = false,
}: ErrorStateProps) => {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <WifiOff className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

interface NetworkErrorProps {
  error: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const NetworkError = ({ error, onRetry, isRetrying }: NetworkErrorProps) => {
  const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network');
  
  return (
    <ErrorState
      title={isNetworkError ? 'Connection Error' : 'Error Loading Content'}
      message={
        isNetworkError
          ? 'Unable to connect to the server. Please check your internet connection and try again.'
          : error?.message || 'An unexpected error occurred. Please try again.'
      }
      onRetry={onRetry}
      isRetrying={isRetrying}
    />
  );
};
