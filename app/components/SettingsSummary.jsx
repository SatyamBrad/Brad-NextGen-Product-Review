export default function SettingsSummary({ summaryColor, setSummaryColor }) {
    return (
        <>
         <div className="settings-form-item">
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