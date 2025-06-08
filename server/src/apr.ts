// APR = (feesWindow / liquidityWindow) * (365 days / windowDays)
// because our snapshots are hourly, windowHours = 1 | 12 | 24
export function calcAPR(
    feeSum: number,
    liquidityAvg: number,
    windowHours: 1 | 12 | 24
  ) {
    const yearlyFactor = 8760 / windowHours; // 365*24 / windowHours
    return (feeSum / liquidityAvg) * yearlyFactor * 100; // percentage
  }
  