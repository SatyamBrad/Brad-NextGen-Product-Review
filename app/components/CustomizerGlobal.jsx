import { useState } from "react";

export default function CustomizerGlobal({
  hasAttribute,
  setHasAttribute,
  attributes,
  setAttributes,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [addAttribute, setAddAttribute] = useState();
  const handleChange = (event) => {
    setAddAttribute((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div
        className="customizer-form-item-col"
        style={{ position: "relative", width: "80%" }}
      >
        <div className="customizer-form-attribute-buttons">
          <input
            type="hidden"
            name="bnpr_global-single_line_text_field-has_attribute"
            value={hasAttribute}
          />
          <button
            className="customizer-btn"
            type="button"
            onClick={() => setHasAttribute((prev) => !prev)}
          >
            {hasAttribute ? "Disable Attributes" : "Enable Attributes"}
          </button>

          <button
            type="button"
            className="customizer-btn"
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
          <div className="customizer-form-attribute-modal">
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
                  setAddAttribute(null);
                  setOpenModal(false);
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddAttribute({
                    type: "",
                    header: "",
                    start: "",
                    mid: "",
                    end: "",
                  });
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  setAttributes((prev) => {
                    const existingAttributeIndex = prev.findIndex(attr=> attr.id === addAttribute.id)
                    if(existingAttributeIndex > -1) {
                      const updatedAttributes = [...prev]
                      updatedAttributes[existingAttributeIndex] = addAttribute
                      return updatedAttributes
                    } else {
                      return [...prev, addAttribute]
                    }
                  });
                  setOpenModal(false);
                  setAddAttribute(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div
          className={
            hasAttribute
              ? `customizer-form-attribute-content`
              : `customizer-form-attribute-content customizer-disable-attribute`
          }
        >
          {attributes?.map((attribute, index) => (
            <div key={index}>
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-id`}
                value={attribute.id}
              />
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-type`}
                value={attribute.type}
              />
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-header`}
                value={attribute.header}
              />
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-start`}
                value={attribute.start}
              />
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-mid`}
                value={attribute.mid}
              />
              <input
                type="hidden"
                name={`bnpr_global-json-attribute-${index}-end`}
                value={attribute.end}
              />
              <div>
                <h3>{attribute.header}</h3>
                <p>{attribute.type === "range" ? "Range" : "Centered Range"}</p>
                <p>
                  {attribute.start}, {attribute.mid}
                  {attribute.mid && ","} {attribute.end}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setAddAttribute({
                      id: attribute.id,
                      type: attribute.type,
                      header: attribute.header,
                      start: attribute.start,
                      mid: attribute.mid,
                      end: attribute.end,
                    });
                  }}
                >
                  <svg
                    class="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are You sure you want to delete this attribute?",
                      )
                    ) {
                      setAttributes(
                        attributes.filter((item) => item.id !== attribute.id),
                      );
                    }
                  }}
                >
                  <svg
                    height="18px"
                    version="1.1"
                    viewBox="0 0 14 18"
                    width="14px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                    >
                      <g
                        fill="#000000"
                        id="Core"
                        transform="translate(-299.000000, -129.000000)"
                      >
                        <g
                          id="delete"
                          transform="translate(299.000000, 129.000000)"
                        >
                          <path
                            d="M1,16 C1,17.1 1.9,18 3,18 L11,18 C12.1,18 13,17.1 13,16 L13,4 L1,4 L1,16 L1,16 Z M14,1 L10.5,1 L9.5,0 L4.5,0 L3.5,1 L0,1 L0,3 L14,3 L14,1 L14,1 Z"
                            id="Shape"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {attributes.length <= 0 && <h2>No attributes yet...</h2>}
        </div>
      </div>
    </>
  );
}
