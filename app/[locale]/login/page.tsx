import { AuthLayout } from "@/app/components";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login to your account"
      footerConfig={{
        description: "Don't have an account?",
        link: "/register",
        linkText: "Sign up",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
