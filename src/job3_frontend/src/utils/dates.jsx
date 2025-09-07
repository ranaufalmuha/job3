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

export const timeAgoFromNs = (
    ns,
    { nowMs = Date.now(), locale = "en", style = "long", numeric = "auto" } = {}
) => {
    if (!ns || ns === 0n) return "";
    const ms = typeof ns === "bigint" ? Number(ns / 1_000_000n) : Number(ns);
    return timeAgoFromMs(ms, { nowMs, locale, style, numeric });
};

export const timeAgoFromMs = (
    ms,
    { nowMs = Date.now(), locale = "en", style = "long", numeric = "auto" } = {}
) => {
    const SEC = 1000;
    const MIN = 60 * SEC;
    const HOUR = 60 * MIN;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;   // approx
    const YEAR = 365 * DAY;   // approx

    const diff = ms - nowMs;  // +future, -past
    const abs = Math.abs(diff);

    // pilih unit
    let unit = "second", unitMs = SEC;

    if (abs < 5 * SEC) {
        return formatRTF(diff / SEC, "second", { locale, style, numeric });
    } else if (abs < MIN) {
        unit = "second"; unitMs = SEC;
    } else if (abs < HOUR) {
        unit = "minute"; unitMs = MIN;
    } else if (abs < DAY) {
        unit = "hour"; unitMs = HOUR;
    } else if (abs < WEEK) {
        unit = "day"; unitMs = DAY;
    } else if (abs < MONTH) {
        unit = "week"; unitMs = WEEK;
    } else if (abs < YEAR) {
        unit = "month"; unitMs = MONTH;
    } else {
        unit = "year"; unitMs = YEAR;
    }

    const value = Math.round(diff / unitMs); // penting: bagi dengan unit dalam ms
    return formatRTF(value, unit, { locale, style, numeric });
};

function formatRTF(value, unit, { locale, style, numeric }) {
    try {
        if (typeof Intl !== "undefined" && Intl.RelativeTimeFormat) {
            const rtf = new Intl.RelativeTimeFormat(locale, { style, numeric });
            return rtf.format(value, unit);
        }
    } catch { }
    const abs = Math.abs(value);
    const suffix = value < 0 ? "ago" : "from now";
    return `${abs} ${abs === 1 ? unit : unit + "s"} ${suffix}`;
}

