export default function CustomizerSummary({ summaryColor, setSummaryColor }) {
    return (
        <>
         <div className="customizer-form-item">
          <label>Review Summary Star Color</label>
          <input
            type="color"
            name="bnpr_global-color-summary_star_color"
            value={summaryColor}
            onChange={(e) => setSummaryColor(e.target.value)}
          />
        </div>
        </>
    )
}