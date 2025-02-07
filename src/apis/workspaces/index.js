import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspace', {
            name,
            description
        }, {
            headers: {
                'x-access-token': token
            }
        });
        
        console.log('Response in create workspace request', response);
        return response?.data;
    } catch (error) {
        console.log('Error in create workspace request', error);
        throw error.response.data;
    }
};

export const fetchWorkspacesRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspace', {
            headers: {
                'x-access-token': token
            }
        });
        
        console.log('Response in fetch workspaces request', response);
        return response?.data;
    } catch (error) {
        console.log('Error in fetch workspaces request', error);
        throw error.response.data;
    }
};