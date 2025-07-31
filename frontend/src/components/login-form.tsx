import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.detail || "Login failed");
        return;
      }

      const userData = await response.json();
      console.log("Logged in user:", userData);
      // 👉 Ex: stocke token, redirige, etc.
      // localStorage.setItem("token", userData.token);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-3xl">
        <Card className="overflow-hidden">
          <CardContent className="grid md:grid-cols-2 p-0 min-h-[500px] md:min-h-[600px]">
            <div className="hidden md:block relative bg-muted">
              <img
                src="/matcha.png"
                alt="Matcha"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 flex flex-col justify-center min-h-[550px]"
            >
              <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Login with your Apple or Google account
                </CardDescription>
              </CardHeader>

              {/* Social buttons (unchanged) */}
              {/* ... */}

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-4 mt-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>

              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  onClick={handleSignUpClick}
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
