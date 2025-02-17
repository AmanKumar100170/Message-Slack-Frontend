import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId) => {
    const { auth } = useAuth();
    
    const { isFetching, isError, error, data, isSuccess } = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, limit:20, offset:0, token: auth?.token }),
        queryKey: ['getPaginatedMessages'],
        cacheTime: 0
    });

    return {
        isFetching,
        isError,
        error,
        messages: data,
        isSuccess
    };
};