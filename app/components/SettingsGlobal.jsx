export default function SettingsGlobal({
  hasAttribute,
  setHasAttribute,
  attributes,
  setAttributes,
}) {
  return (
    <>
      <div className="settings-form-item-col">
        <button
          className="settings-btn"
          type="button"
          onClick={() => setHasAttribute((prev) => !prev)}
        >
          {hasAttribute ? "Disable Attributes" : "Enable Attributes"}
        </button>
        <input
          type="hidden"
          name="bnpr_global-boolean-has_attribute"
          value={hasAttribute}
        />

        <div className={hasAttribute ? "" : "settings-disable-attribute"}>
          <button
            type="button"
            className="settings-btn"
            onClick={() =>
              setAttributes((prev) => [
                ...prev,
                {
                  type: "",
                  id: Date.now().toString(),
                  header: "",
                  start: "",
                  mid: "",
                  end: "",
                },
              ])
            }
          >
            Add Attribute
          </button>

          <div className="settings-attribute-container">
            {attributes?.map((attribute, index) => (
              <div key={index}>
                <select
                  value={attribute.type}
                  name=""
                  onChange={(e) => {
                    const newAttributes = [...attributes];
                    newAttributes[index].type = e.target.value;
                    setAttributes(newAttributes);
                  }}
                >
                  <option value="" disabled>Select attribute type</option>
                  <option value="range">Range</option>
                  <option value="centered_range">Centered Range</option>
                </select>
                <input
                  type="hidden"
                  name={`bnpr_global-json-attribute-${index}-id`}
                  value={attribute.id}
                />
                {attribute.type === "range" && (
                  <>
                    <input
                      type="hidden"
                      name={`bnpr_global-json-attribute-${index}-type`}
                      value="range"
                    />
                    <label>Header</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-header`}
                      value={attribute.header}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].header = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                    <label>Start Value</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-start`}
                      value={attribute.start}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].start = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                    <label>End Value</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-end`}
                      value={attribute.end}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].end = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                  </>
                )}
                {attribute.type === "centered_range" && (
                  <>
                    <input
                      type="hidden"
                      name={`bnpr_global-json-attribute-${index}-type`}
                      value="centered_range"
                    />
                    <label>Header</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-header`}
                      value={attribute.header}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].header = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                    <label>Start Value</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-start`}
                      value={attribute.start}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].start = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                    <label>Mid Value</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-mid`}
                      value={attribute.mid}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].mid = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                    <label>End Value</label>
                    <input
                      type="text"
                      name={`bnpr_global-json-attribute-${index}-end`}
                      value={attribute.end}
                      onChange={(e) => {
                        const newAttributes = [...attributes];
                        newAttributes[index].end = e.target.value;
                        setAttributes(newAttributes);
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
