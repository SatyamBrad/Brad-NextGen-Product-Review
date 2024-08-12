import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import { json } from "@remix-run/node";
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
  if (appMetafields.length > 0) {
    return appMetafields.map((item) => item.node);
  }
  return json(appMetafields);
};

export default function Settings() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [color, setColor] = useState(() => {
    if (loaderData.length > 0) {
      return (
        loaderData.filter((item) => item.key === "star_color")[0]?.value ||
        "#FFD700"
      );
    } else {
      return "#FFD700";
    }
  });

  const [attributes, setAttributes] = useState(() => {
    if (loaderData.length > 0) {
      const value = loaderData.filter((item) => item.key === "attribute")[0]
        ?.value;
      return value ? JSON.parse(value) : [];
    } else {
      return [];
    }
  });

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
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </div>

        <div className="settings-form-item">
          <button
            type="button"
            onClick={() => {
              setAttributes((prev) => [...prev, { type: "" }]);
            }}
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
    // console.log(data)
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

      metafieldsToDelete.forEach(async (id) => {
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
      });
      return null;
    case "POST":
      // iterates through all the data and stores in metafields
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
      // converts all json metafields into normal metafields of type json
      Object.entries(m_json).forEach(([key, value]) => {
        metafields[key] = value;
      });

      // fetches the app id
      const appId = await getAppId();
      // creates the metafields
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
                item.type === "json" ? JSON.stringify(item.value) : item.value,
            })),
          },
        },
      );

      const createdMetafields = await metafieldsToCreate.json();
      return json(createdMetafields);
    default:
      json("return no such method");
  }
};
