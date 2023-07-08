import MoreStats from "../SummaryStat/MoreStats/MoreStats";
import SummaryStat from "../SummaryStat/SummaryStat";
import "./ActivityFeed.css";

export default function ActivityFeed({
  totalCaloriesPerDay,
  avgCaloriesPerCategory,
  avgDailyCalories,
  subNutritionStats
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
      <MoreStats subStatsList={subNutritionStats}/>
    </div>
  );
}
