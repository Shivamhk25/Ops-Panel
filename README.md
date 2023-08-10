## System Setup
npm install -g serve (becuase it is required to serve the system on the required port)

## Development
npm start

## Build

### Staging Environment
npm run build-staging

### Testing Environment
npm run build-test

## Deployment (across environments)
npm run deploy



## Add field in Webinar Schema:-
We have to do changes in three schema
1. schema
2. WebinarSchemaViewUI
3. WebinarSchemaEditUI

if you want to add simple string field :-
 schema =  subheading: {
          type: "object",
          title: "a). Subheading",
          properties: {
            checkbox: {
              type: "boolean",
            },
            data1: {
              type: "string",
              title: "Previous Content",
            },
            data: {
              type: "string",
              title: "New Content",
            },
          },
        },

WebinarSchemaViewUI = subheading: {
      classNames: "webinar-subheading-main",    ## classNames for define css class name
      checkbox: {
        classNames: "webinar-subheading",
      },
      data1: {
        "ui:disabled": true,                     ## make the field disable
        classNames: "webinar-subheading1", 
      },
      data: {
        classNames: "webinar-subheading1",       
        "ui:widget": "hidden",                   ## make the field hidden
      },
    },

In WebinarSchemaEditUI, we have to add one more line in "ui-widget" of parent (  data.state.Header.subheading.checkbox || )

WebinarSchemaEditUI =  subheading: {
        classNames: "webinar-subheading-main",
    "ui:widget": !data.state.Header.subheading.checkbox && "hidden"   ## condition if particular field checkbox selected then it will show otherwise it become hidden
        checkbox: {
          classNames: "webinar-subheading",
          "ui:widget": "hidden",
        },
        data1: {
          "ui:disabled": true,
        },
        data: {
          "ui:description": "Maximum 80 Characters Allowed",
        },
      },


if you want to add image field :-
schema =   HeaderImage: {
          type: "object",
          title: "c). Header Image",
          properties: {
            checkbox: {
              type: "boolean",
            },
            data1: {
              type: "object",
              title: "Previous Content",
              properties: {
                imageWeb: {
                  type: "string",
                  title: "Web view image",
                },
                imageTab: {
                  type: "string",
                  title: "Tab view image",
                },
                imageMobile: {
                  type: "string",
                  title: "Mobile view image",
                },
              },
            },
            data: {
              type: "object",
              title: "New Content",
              properties: {
                imageWeb: {
                  type: "string",
                  format: "data-url",                  ## file format
                  title: "Web view image",
                },
                imageTab: {
                  type: "string",
                  format: "data-url",
                  title: "Tab view image",
                },
                imageMobile: {
                  type: "string",
                  format: "data-url",
                  title: "Mobile view image",
                },
              },
            },
          },
        },

WebinarSchemaViewUI = HeaderImage: {
      classNames: "webinar-subheading-main",
      checkbox: {
        classNames: "webinar-subheading",
      },
      data1: {
        classNames: "webinar-image-main",
        "ui:disabled": true,
      },
      data: {
        "ui:widget": "hidden",
        classNames: "webinar-subheading-main",
        imageWeb: {
          classNames: "webinar-subheading2",
          "ui:disabled": true,
        },
        imageTab: {
          classNames: "webinar-ImageTab",
          "ui:disabled": true,
        },
        imageMobile: {
          classNames: "webinar-ImageTab",
          "ui:disabled": true,
        },
      },
    },

In WebinarSchemaEditUI, we have to add one more line in "ui-widget" of parent ( data.state.Header.HeaderImage.checkbox ||)

WebinarSchemaEditUI =  HeaderImage: {
        "ui:widget": !data.state.Header.HeaderImage.checkbox && "hidden",
        classNames: "webinar-subheading-main",
        checkbox: {
          classNames: "webinar-subheading",
          "ui:widget": "hidden",
        },
        data1: {
          "ui:disabled": true,
          classNames: "webinar-subheading-main",
        },
        data: {
          classNames: "webinar-subheading-main",
          imageWeb: {
            classNames: "webinar-subheading2",
            "ui:description": "Image resolution should be 1440*727px",
          },
          imageTab: {
            classNames: "webinar-ImageTab",
            "ui:description": "Image resolution should be 834*727px",
          },
          imageMobile: {
            classNames: "webinar-ImageTab",
            "ui:description": "Image resolution should be 360*1278px",
          },
        },
      },