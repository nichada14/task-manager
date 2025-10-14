import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center px-4 p-42">
      <div className="w-full max-w-md mt-[-60px]">
        <LoginForm />
      </div>
    </div>
  );
}
