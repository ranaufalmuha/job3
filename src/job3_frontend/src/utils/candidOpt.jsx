export const isSome = (o) => Array.isArray(o) && o.length > 0;

export const fromOpt = (o, fallback = null) => (isSome(o) ? o[0] : fallback);

// khusus string: [] -> '' | ['text'] -> 'text'
export const strFromOpt = (o, fallback = '') => (isSome(o) ? (o[0] ?? fallback) : fallback);

// tulis balik ke Candid:
// toOpt: value biasa -> [] | [value]
export const toOpt = (v) => (v === null || v === undefined ? [] : [v]);

// string: '' atau spasi -> [] (None), selain itu -> [trimmed]
export const optFromStr = (s) => {
    const v = (s ?? '').trim();
    return v ? [v] : [];
};

// alias nama yang kamu minta
export const OptToText = strFromOpt;
export const TextToOpt = optFromStr;

// [] -> [] ; ['a','b'] -> [['a','b']]
export const optFromList = (arr) => (Array.isArray(arr) && arr.length ? [arr] : []);

// Kalau semua field opsional di obj adalah None/[]/null -> []
// Kalau ada minimal satu Some -> [obj]
export const someOrNone = (obj) => {
    const vals = Object.values(obj ?? {});
    const allNone = vals.every((v) =>
        v == null || (Array.isArray(v) && v.length === 0)
    );
    return allNone ? [] : [obj];
};