import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useToast } from '@/hooks/use-toast';

export const UserButton = () => {
    const navigate = useNavigate();

    const { auth, logout } = useAuth();
    const { toast } = useToast();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

    async function handleLogout() {
        await logout();
        toast({
            title: 'Successfully signed out',
            message: 'You will be redirected to the signin page in a few seconds.',
        });

        navigate('/auth/signin');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-65 transition'>
                    <AvatarImage src={auth?.user?.avatar} />
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem className='cursor-pointer' onClick={openWorkspaceCreateModal}>
                    <PencilIcon className='size-4 mr-2 h-10' />
                    Create Workspace
                </DropdownMenuItem>

                <DropdownMenuItem className='cursor-pointer'>
                    <SettingsIcon className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>

                <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
                    <LogOutIcon className='size-4 mr-2 h-10' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};