import { useState } from "react";

export default function SettingsGlobal({
  hasAttribute,
  setHasAttribute,
  attributes,
  setAttributes,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [addAttribute, setAddAttribute] = useState();
  console.log(addAttribute, attributes);
  const handleChange = (event) => {
    setAddAttribute((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div
        className="settings-form-item-col"
        style={{ position: "relative", width: "80%" }}
      >
        <div className="settings-form-attribute-buttons">
          <button
            className="settings-btn"
            type="button"
            onClick={() => setHasAttribute((prev) => !prev)}
          >
            {hasAttribute ? "Disable Attributes" : "Enable Attributes"}
          </button>

          <button
            type="button"
            className="settings-btn"
            onClick={() => {
              setOpenModal(true);
              setAddAttribute({
                id: Date.now().toString(),
                type: "",
                header: "",
                start: "",
                mid: "",
                end: "",
              });
            }}
          >
            Add Attribute
          </button>
        </div>

        {openModal && (
          <div className="settings-form-attribute-modal">
            <div>
              <label>Attribute Type</label>
              <select
                value={addAttribute.type}
                name="type"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select an Attribute Type
                </option>
                <option value="range">Range</option>
                <option value="centered_range">Centered Range</option>
              </select>
            </div>
            <div>
              <label>Header</label>
              <input
                type="text"
                name="header"
                value={addAttribute.header}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Label</label>
              <input
                type="text"
                name="start"
                value={addAttribute.start}
                onChange={handleChange}
              />
            </div>
            {addAttribute.type === "centered_range" && (
              <div>
                <label>Mid Label</label>
                <input
                  type="text"
                  name="mid"
                  value={addAttribute.mid}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label>End Label</label>
              <input
                type="text"
                name="end"
                value={addAttribute.end}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setAttributes((prev) => [...prev, addAttribute]);
                  setOpenModal(false);
                  setAddAttribute(null);
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddAttribute(null);
                  setOpenModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div
          className={
            hasAttribute
              ? `settings-form-attribute-content`
              : `settings-form-attribute-content settings-disable-attribute`
          }
        >
          {attributes?.map((attribute, index) => (
            <div key={index}>
              <h3>{attribute.header}</h3>
              <p>{attribute.type === "range" ? "Range" : "Centered Range"}</p>
              <p>
                {attribute.start}, {attribute.mid}
                {attribute.mid && ","} {attribute.end}
              </p>
            </div>
          ))}

          {attributes.length <= 0 && <h2>No attributes yet...</h2>}
        </div>
      </div>
    </>
  );
}
