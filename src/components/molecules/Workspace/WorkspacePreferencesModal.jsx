import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/hooks/apis/workspaces/useUpdateWorkspace';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';

export const WorkspacePreferencesModal = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [workspaceId, setWorkspaceId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
    const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

    const { confirmation, ConfirmDialog } = useConfirm({ title: 'Do you want to delete the workspace?', message: 'This action cannot be undone!' });

    const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } = useConfirm({ title: 'Do you want to update the workspace?', message: 'This will change the name of the workspace.' });

    const [renameValue, setRenameValue] = useState(workspace?.name);

    useEffect(() => {
        setWorkspaceId(workspace?._id);
        setRenameValue(workspace?.name);
    }, [workspace]);

    async function handleDelete() {
        try {
            const ok = await confirmation();
            if (!ok) {
                return;
            }

            await deleteWorkspaceMutation();
            navigate('/home');
            queryClient.invalidateQueries('fetchWorkspaces');
            setOpenPreferences(false);
            toast({
                title: 'Workspace deleted successfully',
                type: 'success'
            });
        } catch (error) {
            console.log('Error in deleting workspace', error);
            toast({
                title: 'Error in deleting workspace',
                type: 'error'
            });
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const ok = await updateConfirmation();
            if (!ok) {
                return;
            }

            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
            setOpenPreferences(false);
            setEditOpen(false);
            toast({
                title: 'Workspace updated successfully',
                type: 'success'
            });
        } catch (error) {   
            console.log('Error in updating workspace', error);
            toast({
                title: 'Error in updating workspace',
                type: 'error'
            });
        }
    }

    return (
        <>
            <ConfirmDialog />
            <UpdateDialog />
            <Dialog 
                open={openPreferences}
                onOpenChange={() => setOpenPreferences(false)}    
            >
                <DialogContent>
                    <DialogHeader className='p-4 border-b bg-white'>
                        <DialogTitle>
                            Edit Workspace
                        </DialogTitle>
                    </DialogHeader>

                    <div className='px-4 pb-4 flex flex-col gap-y-2'>
                        
                        <Dialog
                            open={editOpen}
                            onOpenChange={setEditOpen}
                        >
                            <DialogTrigger>
                                <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-semibold text-sm'>
                                            Workspace Name
                                        </p>
                                        <p className='text-sm font-semibold hover:underline'>
                                            Edit
                                        </p>
                                    </div>

                                    <p className='text-sm'>
                                        {initialValue}
                                    </p>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Rename Workspace
                                    </DialogTitle>
                                </DialogHeader>

                                <form 
                                    className='space-y-4'
                                    onSubmit={handleFormSubmit}    
                                >
                                    <Input 
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={50}
                                        disabled={isPending}
                                        placeholder='Workspace Name e.g. Design Team'
                                    />

                                    <DialogFooter>
                                        <Button
                                            type='submit'
                                            disabled={isPending}
                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <button 
                            className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg hover:bg-gray-50'
                            onClick={handleDelete}
                        >
                            <TrashIcon className='size-5' />
                            <p className='text-sm font-semibold'>
                                Delete Workspace
                            </p>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};