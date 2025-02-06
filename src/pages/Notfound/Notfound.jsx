import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="flex h-screen w-full flex-col items-center justify-center bg-gray-100"
        >
            <Card className="text-center shadow-lg max-w-lg">
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>404 Not Found</CardTitle>
                    <p
                        className='text-gray-600'
                    >
                        The page you are looking for does not exist.
                    </p>
                </CardHeader>

                <CardContent>

                    <img 
                        className='rounded-lg shadow-md'
                        src="https://thumbs.dreamstime.com/b/error-page-not-found-isolated-banner-flat-cartoon-people-holding-unplugged-socket-plug-trying-to-connect-maintenance-technician-159605206.jpg" 
                        alt="Not Found image" 
                    />

                    <Button
                        variant='outline'
                        className="mt-4"
                        onClick={() => navigate(-1)}
                    >
                        Go back
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};