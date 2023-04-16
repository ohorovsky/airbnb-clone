'use client'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>(
    {
      defaultValues: {
        email: '',
        password: '',
      }
    }
  )
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Login successful');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input id="email" label="Email" register={register} disabled={isLoading} errors={errors} required />
      <Input id="password" label="Password" type='password' register={register} disabled={isLoading} errors={errors} required />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <div>Already have an account?</div>
          <div className='text-neutral-800 cursor-pointer hover:underline' onClick={loginModal.onClose}>Login</div>
        </div>
      </div>
    </div>
  )
  return <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel="Continue"
    onClose={loginModal.onClose}
    title="Login"
    body={bodyContent}
    footer={footerContent}
  />
};

export default LoginModal;