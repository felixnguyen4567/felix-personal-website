'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card" // Corrected import
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/actions/auth"

// Define the action state type clearly
const initialState = {
    error: '',
}

export function LoginForm({ locale }: { locale: string }) {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="locale" value={locale} />
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                </div>
                {state?.error && (
                    <p className="text-sm text-red-500">{state.error}</p>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled={isPending}>
                    {isPending ? 'Signing in...' : 'Sign in'}
                </Button>
            </CardFooter>
        </form>
    )
}
