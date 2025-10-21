import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(import.meta.env.VITE_ADMIN_API, {
        username,
        password,
      });
      dispatch(loginSuccess(res.data.token));

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setError("Invalid username or password.");
    }
  };

  return (
    <Card className="w-full max-w-sm border-gray-200">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label>Username</Label>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              className="border-gray-400"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-black/80 hover:bg-black text-white"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
