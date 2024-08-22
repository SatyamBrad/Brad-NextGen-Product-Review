export default function SettingsForm({formColor, setFormColor}) {
  console.log(formColor)

  return (
    <>
      <div className="settings-form-item">
        <label>Form Star Color</label>
        <input
          type="color"
          name="bnpr_global-color-form_star_color"
          value={formColor}
          onChange={(e) => setFormColor(e.target.value)}
        />
      </div>
    </>
  );
} 