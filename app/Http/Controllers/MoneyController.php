<?php

namespace App\Http\Controllers;

use App\Models\Cashflow;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MoneyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $month = $request->string('month')->toString();
        $showAll = $request->boolean('all', false);

        $query = Cashflow::query()->where('user_id', $user->id);

        if (! $showAll) {
            $monthDate = $this->parseMonthOrNow($month);

            $query->whereBetween('occurred_on', [
                $monthDate->copy()->startOfMonth()->toDateString(),
                $monthDate->copy()->endOfMonth()->toDateString(),
            ]);

            $month = $monthDate->format('Y-m');
        }

        $income = (clone $query)->where('type', 'income')->sum('amount');
        $expense = (clone $query)->where('type', 'expense')->sum('amount');

        $transactions = $query
            ->orderByDesc('occurred_on')
            ->orderByDesc('id')
            ->get([
                'id',
                'type',
                'amount',
                'description',
                'occurred_on',
            ])
            ->map(fn (Cashflow $t) => [
                'id' => $t->id,
                'type' => $t->type,
                'amount' => (int) $t->amount,
                'description' => $t->description,
                'occurred_on' => optional($t->occurred_on)->toDateString(),
            ]);

        return Inertia::render('Money/Index', [
            'transactions' => $transactions,
            'summary' => [
                'income' => (int) $income,
                'expense' => (int) $expense,
                'balance' => (int) ($income - $expense),
            ],
            'filters' => [
                'month' => $month,
                'all' => $showAll,
            ],
            'today' => now()->toDateString(),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'type' => ['required', 'in:income,expense'],
            'amount' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string', 'max:255'],
            'occurred_on' => ['required', 'date'],
        ]);

        Cashflow::create([
            ...$validated,
            'user_id' => $user->id,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Cashflow $cashflow)
    {
        $this->ensureOwner($request, $cashflow);

        $validated = $request->validate([
            'type' => ['required', 'in:income,expense'],
            'amount' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string', 'max:255'],
            'occurred_on' => ['required', 'date'],
        ]);

        $cashflow->update($validated);

        return redirect()->back();
    }

    public function destroy(Request $request, Cashflow $cashflow)
    {
        $this->ensureOwner($request, $cashflow);

        $cashflow->delete();

        return redirect()->back();
    }

    private function ensureOwner(Request $request, Cashflow $cashflow): void
    {
        $user = $request->user();

        if ($cashflow->user_id !== $user->id) {
            abort(403);
        }
    }

    private function parseMonthOrNow(string $month): Carbon
    {
        if (preg_match('/^\d{4}-\d{2}$/', $month) !== 1) {
            return now();
        }

        try {
            return Carbon::createFromFormat('Y-m', $month)->startOfMonth();
        } catch (\Throwable) {
            return now();
        }
    }
}

