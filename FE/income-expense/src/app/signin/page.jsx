"use client";

import { SvgGeld } from "@/components/files";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    const { elements } = formRef.current;
    const email = elements.email.value;
    const password = elements.password.value;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/signIn", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-full">
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <form ref={formRef}>
          <div className="flex flex-col items-center gap-10">
            <SvgGeld />
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-900 text-2xl font-semibold">
                Welcome Back
              </p>
              <p className="text-slate-700">
                Welcome back, Please enter your details
              </p>
            </div>
            <div className="w-full space-y-4">
              <Input
                className="bg-[#F3F4F6]"
                name="email"
                placeholder="Email"
              />
              <Input
                className="bg-[#F3F4F6]"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              onClick={onSubmit}
              type="submit"
              className="bg-[#0166FF] w-full rounded-3xl"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <div className="flex items-center">
              <p>Don’t have account?</p>
              <Link href="/signUp">
                <p className="text-[#0166FF] px-3 py-1">Sign up</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-[#0166FF] w-full h-screen"></div>
    </main>
  );
};

export default Signin;
