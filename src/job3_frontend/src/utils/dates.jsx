export const nsFromDateInput = (yyyyMmDd) => {
    // Core.Timestamp biasanya ns (Nat64). Simpel: treat input sebagai 00:00:00 lokal.
    if (!yyyyMmDd) return 0n;
    const ms = new Date(yyyyMmDd + 'T00:00:00').getTime();
    return BigInt(ms) * 1000000n;
};

export const dateInputFromNs = (ns) => {
    if (!ns || ns === 0n) return '';
    const ms = Number(ns / 1000000n);
    const d = new Date(ms);
    // yyyy-mm-dd
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
};

export const monthYearFromNs = (ns) => {
    if (!ns || ns === 0n) return '';
    const ms = Number(ns / 1_000_000n);
    const d = new Date(ms);
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};