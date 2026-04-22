import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        specialty: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/barbers');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Add Barber</h1>
                <p className="text-sm text-muted-foreground">
                    Create a new barber entry
                </p>
            </div>

            {/* Card */}
            <div className="rounded-xl border bg-card shadow-sm p-6">
                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter phone"
                            value={data.phone}
                            onChange={(e) =>
                                setData('phone', e.target.value)
                            }
                        />
                    </div>

                    {/* Specialty */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Specialty
                        </label>
                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="e.g. Fade Cut"
                            value={data.specialty}
                            onChange={(e) =>
                                setData('specialty', e.target.value)
                            }
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                        <a
                            href="/barbers"
                            className="text-sm text-muted-foreground hover:underline"
                        >
                            ← Back
                        </a>

                        <button
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}