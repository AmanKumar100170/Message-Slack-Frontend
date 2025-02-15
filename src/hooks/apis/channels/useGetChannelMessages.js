import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId) => {
    const { auth } = useAuth();
    
    const { isFetching, isError, error, data: messages } = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, limit:10, offset:0, token: auth?.token }),
        queryKey: ['getPaginatedMessages', channelId]
    });

    return {
        isFetching,
        isError,
        error,
        messages
    };
};