import { dashboard } from '@/routes';
import { create as barberCreate, index as barberIndex } from '@/routes/barbers';

type Props = {
    totalBarbers?: number;
    barbersCreatedToday?: number;
};

export default function Dashboard({
    totalBarbers = 0,
    barbersCreatedToday = 0,
}: Props) {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Overview of your barber system
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Barbers */}
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Total Barbers
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {totalBarbers}
                    </h2>

                    <a
                        href={barberIndex.url()}
                        className="text-sm text-primary mt-3 inline-block hover:underline"
                    >
                        View all →
                    </a>
                </div>

                {/* Barbers created today */}
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        New Today
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {barbersCreatedToday}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        Barbers added today
                    </p>
                </div>

                {/* Another card */}
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        App Status
                    </p>
                    <h2 className="text-lg font-semibold mt-2 text-green-600">
                        Running
                    </h2>
                    <p className="text-xs text-muted-foreground mt-2">
                        System is working normally
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={barberCreate.url()}
                        className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:opacity-90"
                    >
                        + Add Barber
                    </a>

                    <a
                        href={barberIndex.url()}
                        className="px-4 py-2 border rounded-md text-sm hover:bg-muted"
                    >
                        View Barbers
                    </a>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard.url(),
        },
    ],
};
