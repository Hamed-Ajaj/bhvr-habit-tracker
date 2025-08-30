
import { signIn, useSession } from '@/lib/auth-client'
import { CircleX, KeyRound, Mail, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Zod validation schema
const signUpSchema = z.object({
  email: z
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignIn() {
  const navigate = useNavigate()
  const { data: session, isPending } = useSession()


  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, setError, formState: { isSubmitting, errors } } = form

  useEffect(() => {
    if (!isPending && session) {
      navigate('/todos')
    }
  }, [session, navigate])

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
      },
        {
          credentials: 'include',

        }
      )
      navigate('/todos')
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      })
      console.error('Loagin failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {errors.root && (
              <Alert variant="destructive">
                <CircleX className="h-4 w-4" />
                <AlertDescription>
                  {errors.root.message}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="mail@site.com"
                            disabled={isSubmitting}
                            className="pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                            disabled={isSubmitting}
                            className="pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Login...
                    </>
                  ) : (
                    'login'
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
