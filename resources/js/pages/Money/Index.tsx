import { router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type CashflowType = 'income' | 'expense';

type Transaction = {
    id: number;
    type: CashflowType;
    amount: number;
    description: string | null;
    occurred_on: string | null;
};

type Props = {
    transactions?: Transaction[];
    summary?: {
        income: number;
        expense: number;
        balance: number;
    };
    filters?: {
        month: string;
        all: boolean;
    };
    today?: string;
};

function formatIDR(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function Index({
    transactions = [],
    summary = { income: 0, expense: 0, balance: 0 },
    filters = { month: '', all: false },
    today = new Date().toISOString().slice(0, 10),
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const defaultOccurredOn = useMemo(() => today, [today]);

    const { data, setData, post, put, processing, errors, reset } = useForm<{
        type: CashflowType;
        amount: string;
        description: string;
        occurred_on: string;
    }>({
        type: 'income',
        amount: '',
        description: '',
        occurred_on: defaultOccurredOn,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            put(`/money/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    reset();
                    setData('occurred_on', defaultOccurredOn);
                    setData('type', 'income');
                },
            });
            return;
        }

        post('/money', {
            onSuccess: () => {
                reset();
                setData('occurred_on', defaultOccurredOn);
                setData('type', 'income');
            },
        });
    };

    const startEdit = (t: Transaction) => {
        setEditingId(t.id);
        setData('type', t.type);
        setData('amount', String(t.amount));
        setData('description', t.description ?? '');
        setData('occurred_on', t.occurred_on ?? defaultOccurredOn);
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
        setData('occurred_on', defaultOccurredOn);
        setData('type', 'income');
    };

    const deleteTransaction = (id: number) => {
        if (confirm('Yakin hapus transaksi ini?')) {
            router.delete(`/money/${id}`);
        }
    };

    const applyMonth = (month: string) => {
        router.get(
            '/money',
            { month, all: 0 },
            { preserveScroll: true, replace: true },
        );
    };

    const toggleAll = () => {
        router.get(
            '/money',
            filters.all ? { month: filters.month, all: 0 } : { all: 1 },
            { preserveScroll: true, replace: true },
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Money</h1>
                    <p className="text-sm text-muted-foreground">
                        Simple cashflow (income & expense)
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">
                            Month
                        </label>
                        <input
                            type="month"
                            className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filters.month}
                            disabled={filters.all}
                            onChange={(e) => applyMonth(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={toggleAll}
                        className="px-3 py-2 border rounded-md text-sm hover:bg-muted"
                    >
                        {filters.all ? 'Show this month' : 'Show all'}
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">Income</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {formatIDR(summary.income)}
                    </h2>
                </div>
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">Expense</p>
                    <h2 className="text-2xl font-bold mt-2">
                        {formatIDR(summary.expense)}
                    </h2>
                </div>
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <h2
                        className={[
                            'text-2xl font-bold mt-2',
                            summary.balance >= 0
                                ? 'text-green-600'
                                : 'text-red-600',
                        ].join(' ')}
                    >
                        {formatIDR(summary.balance)}
                    </h2>
                </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        {editingId ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-muted-foreground hover:underline"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={submit} className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Type</label>
                        <select
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={data.type}
                            onChange={(e) =>
                                setData('type', e.target.value as CashflowType)
                            }
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        {errors.type && (
                            <p className="text-sm text-red-500">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Amount</label>
                        <input
                            inputMode="numeric"
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="e.g. 50000"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500">
                                {errors.amount}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Date</label>
                        <input
                            type="date"
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={data.occurred_on}
                            onChange={(e) =>
                                setData('occurred_on', e.target.value)
                            }
                        />
                        {errors.occurred_on && (
                            <p className="text-sm text-red-500">
                                {errors.occurred_on}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="optional"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-4 flex items-center justify-end gap-3 pt-2">
                        <button
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
                        >
                            {processing
                                ? editingId
                                    ? 'Saving...'
                                    : 'Adding...'
                                : editingId
                                  ? 'Save Changes'
                                  : 'Add'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="text-left px-6 py-3">
                                    Date
                                </th>
                                <th className="text-left px-6 py-3">
                                    Description
                                </th>
                                <th className="text-left px-6 py-3">
                                    Type
                                </th>
                                <th className="text-right px-6 py-3">
                                    Amount
                                </th>
                                <th className="text-right px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((t) => (
                                    <tr
                                        key={t.id}
                                        className="border-b last:border-0 hover:bg-muted/40"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {t.occurred_on ?? '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {t.description || (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={[
                                                    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                                    t.type === 'income'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700',
                                                ].join(' ')}
                                            >
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium whitespace-nowrap">
                                            {formatIDR(t.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startEdit(t)
                                                    }
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteTransaction(t.id)
                                                    }
                                                    className="text-sm text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-muted-foreground"
                                    >
                                        No transactions yet
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
            href: '/dashboard',
        },
        {
            title: 'Money',
            href: '/money',
        },
    ],
};
