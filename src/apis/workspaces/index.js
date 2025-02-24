import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspaces', {
            name,
            description
        }, {
            headers: {
                'x-access-token': token
            }
        });
        
        console.log('Response in create workspace request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in create workspace request', error);
        throw error.response.data;
    }
};

export const fetchWorkspacesRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspaces', {
            headers: {
                'x-access-token': token
            }
        });
        
        console.log('Response in fetch workspaces request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in fetch workspaces request', error);
        throw error.response.data;
    }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in fetching workspace details request');
        throw error.response;
    }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error int delete workspace request', error);
        throw error.response.data;
    }
};

export const updateWorkspaceRequest = async ({ workspaceId, name, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}`, {
            name
        }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in update workspace request', error);
        throw error.response.data;
    }
};

export const addChannelToWorkspaceRequest = async ({ workspaceId, channelName, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/channels`, {
            channelName
        }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in adding channel to workspace request', error);
        throw error.response.data;
    }
};

export const resetJoinCodeRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in reset join code request', error);
        throw error.response.data;
    }
};

export const addMemberToWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/members`, {}, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in add member to the workspace request', error);
        throw error.response.data;
    }
};

export const joinWorkspaceRequest = async ({ workspaceId, joinCode, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/join`, {
            joinCode
        }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('Error in join workspace request', error);
        throw error.response.data;
    }
};