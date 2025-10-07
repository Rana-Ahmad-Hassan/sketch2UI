import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        await signup(email, password);
        toast.success("Account created");
        navigate("/login");
      } else {
        await login(email, password);
        toast.success("Welcome back");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Authentication failed");
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-400 hover:text-gray-200 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-white">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-sm text-gray-400">
            {mode === "signup"
              ? "Enter your details to get started"
              : "Enter your credentials to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            {mode === "signup" ? "Create account" : "Sign in"}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-xs text-gray-500">
            {mode === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
          </span>
          <button
            onClick={() => navigate(mode === "signup" ? "/login" : "/signup")}
            className="text-xs text-gray-300 hover:text-white transition-colors"
          >
            {mode === "signup" ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
