"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import FormInput from '@/app/components/FormInput'
import { Button } from '@/components/ui/button'
import { loginSignup } from '@/action/user'
import { toast } from '../../../components/ui/use-toast'
import { z } from 'zod'


const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

function Signup() {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<any>({})

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    
    const formData = new FormData(e.target as HTMLFormElement)

   
    setFormErrors({})

    
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    
    try {
      signupSchema.parse(formValues) 
    } catch (err: any) {
      setFormErrors(err.formErrors.fieldErrors)
      return 
    }

    
    setLoading(true)
    const res = await loginSignup(formData, false)

    if (res?.error) {
      toast({ title: res?.error })
    }

    setLoading(false)
  }

  return (
    <div className="grid place-content-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center gap-5 items-center py-10 w-[450px] shadow-lg rounded-lg bg-white">
        <h1 className="text-center font-bold text-4xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="w-full px-5">
          <FormInput
            name="name"
            type="text"
            placeholder="Enter your name"
            label="Full Name"
            error={formErrors.name}
          />

          <FormInput
            name="email"
            type="email"
            placeholder="Enter the email"
            label="Email"
            error={formErrors.email}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Enter the password"
            label="Enter Password"
            error={formErrors.password}
          />

          <Button
            type="submit"
            className={`${
              loading && "disabled cursor-not-allowed"
            } w-full bg-blue-500`}
          >
            {loading ? "loading..." : "Register"}
          </Button>
        </form>
        <Link
          href="/login"
          className="text-center text-blue-800 cursor-pointer underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default Signup
