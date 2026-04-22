import { index } from '@/routes/barbers';
import { router } from '@inertiajs/react';

type Barber = {
    id: number;
    name: string;
    phone: string | null;
    specialty: string | null;
};

export default function Index({ barbers = [] }: { barbers?: Barber[] }) {
    const deleteBarber = (id: number) => {
        if (confirm('Yakin hapus barber ini?')) {
            router.delete(`/barbers/${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Barbers</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your barber data
                    </p>
                </div>

                <a
                    href="/barbers/create"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90"
                >
                    + Add Barber
                </a>
            </div>

            {/* Card */}
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    Specialty
                                </th>
                                <th className="px-6 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {barbers.length > 0 ? (
                                barbers.map((b) => (
                                    <tr
                                        key={b.id}
                                        className="border-b last:border-none hover:bg-muted/40 transition"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {b.name}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {b.phone ?? '-'}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {b.specialty ?? '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <a
                                                href={`/barbers/${b.id}/edit`}
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-md hover:bg-muted"
                                            >
                                                Edit
                                            </a>

                                            <button
                                                onClick={() =>
                                                    deleteBarber(b.id)
                                                }
                                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-10 text-center text-muted-foreground"
                                    >
                                        No barbers found 😢
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: index(),
        },
    ],
};