export const typeClass = (t = '') => {
    const v = (t || '').toLowerCase();
    if (v.includes('full')) return 'bg-green-500/15 text-green-500';
    if (v.includes('part')) return 'bg-blue-500/15 text-blue-500';
    if (v.includes('intern')) return 'bg-purple-500/15 text-purple-500';
    if (v.includes('contract')) return 'bg-amber-500/15 text-amber-500';
    if (v.includes('freelance')) return 'bg-pink-500/15 text-pink-500';
    if (v.includes('volunteer')) return 'bg-teal-500/15 text-teal-500';
    if (v.includes('temporary')) return 'bg-orange-500/15 text-orange-500';
    if (v.includes('self')) return 'bg-cyan-500/15 text-cyan-500';
    return 'bg-highlight/20 text-highlight';
};