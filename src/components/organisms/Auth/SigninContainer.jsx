import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/apis/auth/useSignin';

import { SigninCard } from './SigninCard';

export const SigninContainer = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signinMutation } = useSignin();

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });

    const onSigninFormSubmit = async (e) => {
        e.preventDefault();

        if (!signinForm.email || !signinForm.password) {
            console.error('Please fill all the fields.');
            setValidationError({ message: 'Please fill all the fields.' });
        }

        setValidationError(null);
        await signinMutation({
            email: signinForm.email,
            password: signinForm.password
        });
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/home');
        }
    }, [isSuccess, navigate]);

    return (
        <SigninCard
            error={error}
            isSuccess={isSuccess}
            isPending={isPending}
            signinForm={signinForm}
            setSigninForm={setSigninForm}
            onSigninFormSubmit={onSigninFormSubmit}
            validationError={validationError}
        />
    );
};