import "./SummaryStat.css"

export default function SummaryStat({stats, label, substat, bgColor="var(--nutrition-color"}) {
  return (
    <>
    
    <div className="summary-stat" style={{backgroundColor: bgColor}}>
      <p className="summary-description">{label}</p>
      <p className="stats">
        {stats}
      </p>
    </div>
    </>
  )
}
