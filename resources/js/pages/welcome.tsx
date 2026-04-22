import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex flex-col bg-background text-foreground">
                {/* Navbar */}
                <header className="w-full border-b">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">
                            BarberGo
                        </h1>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="max-w-4xl text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Manage Your Barber Shop
                            <br />
                            <span className="text-primary">
                                Easily & Efficiently
                            </span>
                        </h1>

                        <p className="text-muted-foreground max-w-xl mx-auto">
                            BarberGo helps you manage barbers, organize data,
                            and build your own barber system with a modern
                            dashboard.
                        </p>

                        {/* CTA */}
                        <div className="flex justify-center gap-3 pt-2">
                            <Link
                                href={auth.user ? dashboard() : login()}
                                className="px-5 py-2 bg-primary text-white rounded-md text-sm font-medium hover:opacity-90"
                            >
                                {auth.user
                                    ? 'Go to Dashboard'
                                    : 'Get Started'}
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-4 pt-10">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold">
                                    Manage Barbers
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Add, edit, and manage barber data easily
                                </p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold">
                                    Fast & Simple
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Built with modern Laravel + React stack
                                </p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold">
                                    Scalable
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Ready for booking & advanced features
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-xs text-muted-foreground py-6">
                    Built with Laravel + Inertia + React ⚡
                </footer>
            </div>
        </>
    );
}