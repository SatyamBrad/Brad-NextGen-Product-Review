import { Form, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";
import { json, redirect } from "@remix-run/node";
import "../styles/settings.css";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
    #graphql
    query {
      currentAppInstallation {
        metafields(first: 100) {
          edges {
            node {
              id
              namespace
              type
              key
              value
            }
          }
        }
      }
    }
  `);

  const { data } = await response.json();
  const appMetafields = data?.currentAppInstallation?.metafields?.edges;
  return json(appMetafields.map((item) => item.node));
};

export default function Settings() {
  const loaderData = useLoaderData();
  const [color, setColor] = useState("#FFD700");
  const [hasAttribute, setHasAttribute] = useState(false);
  const [attributes, setAttributes] = useState([]);

  
  useEffect(() => {
    setColor(
      loaderData.find((item) => item.key === "star_color")?.value || "#FFD700",
    );
    setHasAttribute(
      loaderData.find((item) => item.key === "has_attribute")?.value ===
        "true" || false,
    );
    setAttributes(() => {
      const value = loaderData.find((item) => item.key === "attribute")?.value;
      return value ? JSON.parse(value) : [];
    });
  }, [loaderData]);

  return (
    <div>
      <Form action="/app/settings" method="DELETE">
        <button>Reset</button>
      </Form>

      <Form className="settings-form" method="POST" action="/app/settings">
        <div className="settings-form-item">
          <input
            type="color"
            name="bnpr_form-color-star_color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="settings-form-item">
          <button
            type="button"
            onClick={() => setHasAttribute((prev) => !prev)}
          >
            {hasAttribute ? "Disable Attributes" : "Enable Attributes"}
          </button>
          <input
            type="hidden"
            name="bnpr_form-boolean-has_attribute"
            value={hasAttribute}
          />

          <div className={hasAttribute ? "" : "settings-form-disable-div"}>
            <button
              type="button"
              onClick={() => setAttributes((prev) => [...prev, { type: "" }])}
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
                    <option value="">Select attribute type</option>
                    <option value="range">Range</option>
                    <option value="centered_range">Centered Range</option>
                  </select>
                  <input
                    type="hidden"
                    name={`bnpr_form-json-attribute-${index}-id`}
                    value={attribute.id ? attribute.id : Date.now()}
                  />
                  {attribute.type === "range" && (
                    <>
                      <input
                        type="hidden"
                        name={`bnpr_form-json-attribute-${index}-type`}
                        value="range"
                      />
                      <label>Header</label>
                      <input
                        type="text"
                        name={`bnpr_form-json-attribute-${index}-header`}
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
                        name={`bnpr_form-json-attribute-${index}-start`}
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
                        name={`bnpr_form-json-attribute-${index}-end`}
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
                        name={`bnpr_form-json-attribute-${index}-type`}
                        value="centered_range"
                      />
                      <label>Header</label>
                      <input
                        type="text"
                        name={`bnpr_form-json-attribute-${index}-header`}
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
                        name={`bnpr_form-json-attribute-${index}-start`}
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
                        name={`bnpr_form-json-attribute-${index}-mid`}
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
                        name={`bnpr_form-json-attribute-${index}-end`}
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

        <div className="settings-form-item">
          <button type="submit" className="settings-submit-button">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const metafields = [];
  const m_json = {};

  const getAppId = async () => {
    const currentApp = await admin.graphql(`
      #graphql
      query {
        currentAppInstallation {
          id
        }
      }
    `);
    const { data } = await currentApp.json();
    return data?.currentAppInstallation?.id;
  };

  const addToJson = (namespace, m_key, index, extraKey, value) => {
    if (!m_json[m_key]) {
      m_json[m_key] = {
        namespace,
        type: "json",
        key: m_key,
        value: [],
      };
    }
    if (!m_json[m_key].value[index]) {
      m_json[m_key].value[index] = {};
    }
    m_json[m_key].value[index][extraKey] = value;
  };

  const formData = await request.formData();

  switch (request.method) {
    case "DELETE":
      try {
        const appMetafieldsFetch = await admin.graphql(`
          #graphql
          query {
            currentAppInstallation {
              metafields(first: 100) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `);
        const appMetafieldsResponse = await appMetafieldsFetch.json();

        const metafieldsToDelete =
          appMetafieldsResponse?.data?.currentAppInstallation?.metafields.edges.map(
            ({ node }) => node.id,
          );

        for (const id of metafieldsToDelete) {
          try {
            const deleteMetafield = await admin.graphql(
              `
                #graphql
                mutation metafieldDelete($input: MetafieldDeleteInput!) {
                  metafieldDelete(input: $input) {
                    deletedId
                    userErrors {
                      field
                      message
                    }
                  }
                }`,
              {
                variables: {
                  input: {
                    id,
                  },
                },
              },
            );
            const { data } = await deleteMetafield.json();
            console.log(data);
          } catch (error) {
            console.error(`Failed to delete metafield with id ${id}:`, error);
          }
        }
      } catch (error) {
        console.error("Error during DELETE operation:", error);
      }

      return redirect("/app/settings");

    case "POST":
      try {
        // Process the form data and prepare metafields
        for (const [key, value] of formData.entries()) {
          const [m_namespace, m_type, m_key, index, extraKey] = key.split("-");
          if (m_type === "json") {
            addToJson(m_namespace, m_key, parseInt(index), extraKey, value);
          } else {
            metafields[m_key] = {
              namespace: m_namespace,
              type: m_type,
              key: m_key,
              value: value,
            };
          }
        }

        // Convert JSON metafields to standard format
        Object.entries(m_json).forEach(([key, value]) => {
          metafields[key] = value;
        });

        // Fetch the app ID
        const appId = await getAppId();

        // Create the metafields
        const metafieldsToCreate = await admin.graphql(
          `
          #graphql
          mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              metafields {
                key
                namespace
                value
                createdAt
                updatedAt
              }
              userErrors {
                field
                message
                code
              }
            }
          }`,
          {
            variables: {
              metafields: Object.values(metafields).map((item) => ({
                ownerId: appId,
                namespace: item.namespace,
                type: item.type,
                key: item.key,
                value:
                  item.type === "json"
                    ? JSON.stringify(item.value)
                    : item.value,
              })),
            },
          },
        );

        const createdMetafields = await metafieldsToCreate.json();
        console.log(createdMetafields);
        return redirect("/app/settings");
      } catch (error) {
        console.error("Error during POST operation:", error);
        return json({ error: "Failed to save settings" }, { status: 500 });
      }

    default:
      return json("Invalid request method", { status: 405 });
  }
};
