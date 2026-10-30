import type { DashboardStats } from "../../types/dashboard.types";
import styles from "./StatsPanel.module.css";
import { formatDuration } from "../../../../shared/utils/formatters";

// 🔴 TODO: Accept stats prop (DashboardStats) and use its properties dynamically
// colors to use: #3498db, #e67e22, #2ecc71, #e74c3c
export function StatsPanel({ stats }: { stats: DashboardStats | null }) {
  if (!stats) {
    return <div className={styles.grid}>No stats available</div>;
  }
  // Destructure the properties here so they are directly accessible
  const {
    totalTickets,
    openTickets,
    avgResolutionTimeSeconds,
    slaBreachCount
  } = stats;

  return (
    <div className={styles.grid}>
      {/* // 🔴 TODO: refer to dashboard.png, render StatCard components */
        <>
          <StatCard title="Total Tickets" value={totalTickets} color="#3498db" />
          <StatCard title="Open Tickets" value={openTickets} color="#e67e22" />
          <StatCard title="Average Resolution Time" value={formatDuration(avgResolutionTimeSeconds)} color="#2ecc71" />
          <StatCard title="SLA Breaches" value={slaBreachCount} color="#e74c3c" />
        </>
      }
    </div>
  );
}



// Do not modify
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={styles.card} style={{ borderLeft: `4px solid ${color}` }}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  );
}