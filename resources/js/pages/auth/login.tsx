import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, KeyRound, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { home } from '@/routes';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 selection:bg-purple-500 selection:text-white">
            {/* Background glowing decorative orbs & ambient light */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

            {/* Back to Live Website link */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href={home().url}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Portfolio</span>
                </Link>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <Head title="Admin Access - Portfolio CMS" />

                <div className="group relative rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl sm:p-10 transition-all">
                    {/* Top Subtle Border Highlight */}
                    <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/25 ring-1 ring-white/20">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-[11px] font-medium text-purple-300 mb-2">
                            <Sparkles className="h-3 w-3" />
                            <span>PORTFOLIO CMS</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                            Enter your administrator credentials to access the control panel.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs font-medium text-emerald-400">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-medium text-slate-300">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="admin@portfolio.local"
                                            className="h-11 rounded-xl border-white/10 bg-slate-950/60 pl-10 text-sm text-white placeholder:text-slate-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-xs font-medium text-slate-300">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs text-purple-400 hover:text-purple-300 hover:underline"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 z-10">
                                            <Lock className="h-4 w-4" />
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="h-11 rounded-xl border-white/10 bg-slate-950/60 pl-10 text-sm text-white placeholder:text-slate-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            defaultChecked={true}
                                            className="rounded border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="cursor-pointer text-xs font-normal text-slate-400 select-none"
                                        >
                                            Remember session
                                        </Label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 h-11 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-medium text-white shadow-lg shadow-purple-600/25 transition-all hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-600/40 active:scale-[0.99] disabled:opacity-70"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <Spinner className="h-4 w-4" />
                                            <span>Authenticating...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <KeyRound className="h-4 w-4" />
                                            <span>Sign In to Dashboard</span>
                                        </div>
                                    )}
                                </Button>
                            </>
                        )}
                    </Form>

                    {/* Footer note */}
                    <div className="mt-8 border-t border-white/10 pt-4 text-center text-[11px] text-slate-500">
                        Protected area. Unauthorized access attempts are monitored and logged.
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.layout = (page: React.ReactNode) => page;
