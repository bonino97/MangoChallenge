import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@/utils/urls';

const useAxios = (url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${API_URL}${url}`,
          config
        );
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
};

export default useAxios;
