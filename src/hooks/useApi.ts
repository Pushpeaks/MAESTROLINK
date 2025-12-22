import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const { toast } = useToast();

  const execute = useCallback(
    async (apiCall: () => Promise<T>, options?: { showSuccessToast?: string; showErrorToast?: boolean }) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await apiCall();
        setState({ data, loading: false, error: null });
        
        if (options?.showSuccessToast) {
          toast({
            title: 'Success',
            description: options.showSuccessToast,
          });
        }
        
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        
        if (options?.showErrorToast !== false) {
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
        }
        
        throw err;
      }
    },
    [toast]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// Hook for file uploads with progress
export function useFileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const upload = useCallback(
    async <T>(
      url: string,
      file: File,
      fieldName: string = 'file'
    ): Promise<T> => {
      setUploading(true);
      setProgress(0);
      setError(null);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append(fieldName, file);

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          setUploading(false);
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch {
              resolve(xhr.responseText as T);
            }
          } else {
            const errorMsg = 'Upload failed';
            setError(errorMsg);
            toast({
              title: 'Upload Error',
              description: errorMsg,
              variant: 'destructive',
            });
            reject(new Error(errorMsg));
          }
        });

        xhr.addEventListener('error', () => {
          setUploading(false);
          const errorMsg = 'Network error during upload';
          setError(errorMsg);
          toast({
            title: 'Upload Error',
            description: errorMsg,
            variant: 'destructive',
          });
          reject(new Error(errorMsg));
        });

        const token = localStorage.getItem('authToken');
        xhr.open('POST', url);
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        xhr.send(formData);
      });
    },
    [toast]
  );

  const reset = useCallback(() => {
    setProgress(0);
    setUploading(false);
    setError(null);
  }, []);

  return { progress, uploading, error, upload, reset };
}
