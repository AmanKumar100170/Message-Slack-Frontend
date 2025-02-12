import { useMutation } from '@tanstack/react-query';

import { joinWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useJoinWorkspace = (workspaceId) => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: joinWorkspaceMutation } = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token }),
        onSuccess: () => {
            console.log('Workspace joined successfully');
        },
        onError: () => {
            console.log('Error in joining workspace');
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        joinWorkspaceMutation
    };
};