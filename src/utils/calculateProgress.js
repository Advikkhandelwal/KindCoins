export const calculateProgress = (collected, target) => {
    if (!target || target === 0) return 0;
    const progress = collected / target;
    return Math.min(Math.max(progress, 0), 1);
};

export const calculatePercentage = (collected, target) => {
    const progress = calculateProgress(collected, target);
    return (progress * 100).toFixed(1);
};
