import "./MoreStats.css";

export default function MoreStats({ subStatsList }) {
  return (
    <>
      <div
        className="summary-stat"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <p className="summary-description">More Stats</p>
        <table className="substats-table">
          <tr>
            {subStatsList?.map((subStat) => (
              <th className="substats-header">{subStat.subStatText}</th>
            ))}
          </tr>
          <tr>
            {subStatsList?.map((subStat) => (
              <td className="substats-data">{subStat.subStat}</td>
            ))}
          </tr>
        </table>
      </div>
    </>
  );
}
