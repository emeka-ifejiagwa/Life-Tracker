import SummaryStat from "../SummaryStat/SummaryStat";
import "./ActivityFeed.css";

export default function ActivityFeed({
  totalCaloriesPerDay,
  avgCaloriesPerCategory,
  avgDailyCalories,
}) {
  return (
    <div className="activity-feed">
      <SummaryStat
        label={"Average Daily Calories"}
        stats={avgDailyCalories?.toFixed(1)}
        bgColor="#6DC1F5"
      />
      <SummaryStat
        label={"Total Calories Per Day"}
        stats={totalCaloriesPerDay?.toFixed(1)}
      />
    </div>
  );
}
