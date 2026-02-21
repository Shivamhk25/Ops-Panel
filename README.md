# Marketing Ops Panel

A React-based operations panel for managing marketing courses, webinars, approvals, and deployments.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Webinar Schema Configuration](#webinar-schema-configuration)

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher)
- serve (install globally: `npm install -g serve`)

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

The application will run on `http://localhost:3000`

## Build

### Production Environment
```bash
npm run build
```

### Staging Environment
```bash
npm run build-staging
```

### Testing Environment
```bash
npm run build-test
```

## Deployment

Deploy the built application (serves on port 4000):

```bash
npm run deploy
```

Logs are stored in `/var/log/marketingopspanel/express.log`

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── Components/      # React components
│   │   ├── css/        # Component-specific styles
│   │   └── loader/     # Loading components
│   ├── services/       # API service layer
│   ├── App.js          # Main application component
│   └── constants.js    # Application constants
└── package.json        # Project dependencies
```

## Key Features

- **Course Management**: Create, edit, and view courses
- **Webinar Management**: Manage webinar content and schemas
- **Approval Workflow**: Review and approve content changes
- **Deployment Tracking**: Monitor deployment status across environments
- **Tag Schema**: Manage content tagging system

## Webinar Schema Configuration

### Adding Fields to Webinar Schema

When adding new fields to the webinar schema, you need to update three schemas:
1. **schema** - Defines the data structure
2. **WebinarSchemaViewUI** - Controls the view mode UI
3. **WebinarSchemaEditUI** - Controls the edit mode UI

### Example: Adding a String Field

#### 1. Schema Definition
```javascript
subheading: {
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
}
```

#### 2. WebinarSchemaViewUI
```javascript
subheading: {
  classNames: "webinar-subheading-main",
  checkbox: {
    classNames: "webinar-subheading",
  },
  data1: {
    "ui:disabled": true,        // Makes field read-only
    classNames: "webinar-subheading1", 
  },
  data: {
    classNames: "webinar-subheading1",       
    "ui:widget": "hidden",      // Hides the field
  },
}
```

#### 3. WebinarSchemaEditUI
```javascript
subheading: {
  classNames: "webinar-subheading-main",
  "ui:widget": !data.state.Header.subheading.checkbox && "hidden",  // Conditional visibility
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
}
```

### Example: Adding an Image Field

#### 1. Schema Definition
```javascript
HeaderImage: {
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
          format: "data-url",    // Enables file upload
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
}
```

#### 2. WebinarSchemaViewUI
```javascript
HeaderImage: {
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
}
```

#### 3. WebinarSchemaEditUI
```javascript
HeaderImage: {
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
}
```

## Technologies Used

- React 18
- Material-UI (MUI)
- React Router DOM
- Axios
- React Bootstrap
- React JSON Schema Form
- RSuite
- Moment.js

## License

Private - VisitHealth

---

**Last Updated**: February 2026