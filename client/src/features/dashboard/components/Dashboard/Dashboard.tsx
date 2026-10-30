import { StatsPanel } from "../StatsPanel/StatsPanel";
import { RecentActivity } from "../RecentActivity/RecentActivity";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import type { Ticket } from "../../../tickets/types/ticket.types";
import type { DashboardStats } from "../../types/dashboard.types";

export function Dashboard() {
  // 🔴 TODO:
  // 1. Fetch GET /stats and GET /stats/recent with axios (base URL: http://localhost:4000/api)
  // 2. Display the stats and recent activity data (pass them to StatsPanel and RecentActivity)
  // 3. Handle loading and error states

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await fetch("http://localhost:4000/api/stats");
        const statsData = await statsResponse.json();
        setStats(statsData.data);

        const recentActivityResponse = await fetch("http://localhost:4000/api/stats/recent");
        const recentActivityData = await recentActivityResponse.json();
        console.log("Recent Activity Data:", recentActivityData); // Log the recent activity data
        setRecentActivity(recentActivityData.data);
      } catch (err) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);


  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {stats && (
        <>
          <StatsPanel stats={stats} />
          <RecentActivity activities={recentActivity} />
        </>
      )}
    </div>
  );
}
