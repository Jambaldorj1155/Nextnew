"use client"

import axios from 'axios';
import { SvgGeld } from '@/components/files';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const { elements } = formRef.current;
    const name = elements.name.value;
    const email = elements.email.value;
    const password = elements.password.value;
    const rePassword = elements.rePassword.value;

    if (password !== rePassword) {
      setError("Passwordoo zuv davtaj bichee bro");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://localhost:8000/api/signup", { name, email, password });
      if (response.status === 201) {
        router.push("/signin");
      } else {
        setError(response.data.error || "Sign up failed");
      }
    } catch (error) {
      setError("Boldgue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <form ref={formRef} onSubmit={onSubmit}>
          <div className="flex flex-col items-center gap-10">
            <SvgGeld />
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-900 text-2xl font-semibold">Create Geld account</p>
              <p className="text-slate-700">Sign up below to create your Wallet account</p>
            </div>
            <div className="w-full space-y-4">
              <Input className="bg-[#F3F4F6]" name="name" placeholder="Name" required />
              <Input className="bg-[#F3F4F6]" name="email" type="email" placeholder="Email" required />
              <Input className="bg-[#F3F4F6]" name="password" type="password" placeholder="Password" required />
              <Input className="bg-[#F3F4F6]" name="rePassword" type="password" placeholder="Re-password" required />
            </div>
            <Button type="submit" className="bg-[#0166FF] w-full rounded-3xl" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <div className="flex items-center">
              <p>Already have an account?</p>
              <Link href="/signin">
                <p className="text-[#0166FF] px-3 py-1">Log in</p>
              </Link>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </div>
      <div className="bg-[#0166FF] w-full h-screen"></div>
    </div>
  );
};

export default SignUp;
