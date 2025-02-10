import { useMutation } from '@tanstack/react-query';

import { addChannelToWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useAddChannelToWorkspace = () => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: addChannelToWorkspaceMutation } = useMutation({
        mutationFn: ({ workspaceId, channelName }) => addChannelToWorkspaceRequest({ workspaceId, channelName, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Successfully added channel to the workspace', data);
        },
        onError: (error) => {
            console.log('Failed to add channel to the workspace', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addChannelToWorkspaceMutation
    };
};