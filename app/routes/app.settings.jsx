import { Form, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";
import { json, redirect } from "@remix-run/node";
import "../styles/settings.css";
import SettingsForm from "../components/SettingsForm";
import SettingsSummary from "../components/SettingsSummary";
import SettingsList from "../components/SettingsList";
import SettingsGlobal from "../components/SettingsGlobal";
import SettingsPreview from "../components/SettingsPreview";

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

  const [tab, setTab] = useState("global");
  const [notification, setNotification] = useState("")

  const [formColor, setFormColor] = useState("#FFD700");
  const [summaryColor, setSummaryColor] = useState("#FFD700");
  const [listColor, setListColor] = useState("#FFD700");
  const [hasAttribute, setHasAttribute] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [listType, setListType] = useState("list");
  const [reviewsPerPage, setReviewsPerPage] = useState(2);

  useEffect(() => {
    setNotification("")
    setFormColor(
      loaderData.find((item) => item.key === "form_star_color")?.value ||
        "#FFD700",
    );
    setSummaryColor(
      loaderData.find((item) => item.key === "summary_star_color")?.value ||
        "#FFD700",
    );
    setListColor(
      loaderData.find((item) => item.key === "list_star_color")?.value ||
        "#FFD700",
    );
    setHasAttribute(
      loaderData.find((item) => item.key === "has_attribute")?.value ===
        "true" || false,
    );
    setAttributes(() => {
      const value = loaderData.find((item) => item.key === "attribute")?.value;
      return value ? JSON.parse(value) : [];
    });
    setListType(
      loaderData.find((item) => item.key === "list_type")?.value || "list",
    );
    setReviewsPerPage(
      loaderData.find((item) => item.key === "reviews_per_page")?.value || 5,
    );
  }, [loaderData]);

  return (
    <div className="settings-container">
      {notification && <div className="settings-notification-container">
        <h1>{notification}</h1>
      </div>}

      <div className="settings-navbar-container">
        <ul>
          <li
            onClick={() => {
              setTab("global");
            }}
            className={tab === "global" ? "active-navbar-item" : ""}
          >
            Global Settings
          </li>
          <li
            onClick={() => {
              setTab("form");
            }}
            className={tab === "form" ? "active-navbar-item" : ""}
          >
            Form Settings
          </li>
          <li
            onClick={() => {
              setTab("summary");
            }}
            className={tab === "summary" ? "active-navbar-item" : ""}
          >
            Summary Settings
          </li>
          <li
            onClick={() => {
              setTab("list");
            }}
            className={tab === "list" ? "active-navbar-item" : ""}
          >
            Display List Settings
          </li>
        </ul>

        <Form action="/app/settings" method="DELETE">
          <button onClick={()=>{setNotification("Deleting all settings")}} className="settings-btn">Reset All Settings</button>
        </Form>
      </div>

      <div className="settings-body-container">
        <Form
          className="settings-form-container"
          method="POST"
          action="/app/settings"
        >
          <>
            {tab === "global" && (
              <SettingsGlobal
                {...{
                  hasAttribute,
                  setHasAttribute,
                  attributes,
                  setAttributes,
                }}
              />
            )}
            {tab === "form" && (
              <SettingsForm {...{ formColor, setFormColor }} />
            )}
            {tab === "summary" && (
              <SettingsSummary {...{ summaryColor, setSummaryColor }} />
            )}
            {tab === "list" && (
              <SettingsList
                {...{
                  listColor,
                  setListColor,
                  listType,
                  setListType,
                  reviewsPerPage,
                  setReviewsPerPage,
                }}
              />
            )}
          </>
          <button type="submit" className="settings-btn settings-submit-button">
            Save
          </button>
        </Form>
        <div className="settings-preview-container">
          <SettingsPreview
            formColor={formColor}
            summaryColor={summaryColor}
            listColor={listColor}
            hasAttribute={hasAttribute}
            attributes={attributes}
            listType={listType}
            reviewsPerPage={reviewsPerPage}
          />
        </div>
      </div>
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

        return redirect("/app/settings");
      } catch (error) {
        console.error("Error during POST operation:", error);
        return json({ error: "Failed to save settings" }, { status: 500 });
      }

    default:
      return json("Invalid request method", { status: 405 });
  }
};
