# Project Structure Summary

## Overview
**OctoCAT Supply** is a comprehensive GitHub Copilot demonstration project that showcases AI-assisted development capabilities. This is a full-stack TypeScript application demonstrating GitHub Copilot features including Agent Mode, Vision, MCP Server Integration, Test Generation, and Custom Instructions.

## Repository Structure

```
GitHubCopilot_Customized/
├── .github/                    # GitHub-specific configurations
│   ├── agents/                 # Custom Copilot agents
│   │   └── ImplementationIdeas.agent.md
│   ├── prompts/                # Custom prompt files for Copilot
│   │   ├── Unit-Test-Coverage.prompt.md
│   │   ├── model.prompt.md
│   │   └── plan.prompt.md
│   └── workflows/              # GitHub Actions workflows
│       └── copilot-setup-steps.yml
├── .vscode/                    # VS Code workspace settings
│   ├── launch.json            # Debug configurations
│   ├── mcp.json               # MCP server configurations
│   └── tasks.json             # Build and run tasks
├── api/                        # Backend API service
├── frontend/                   # React frontend application
├── infra/                      # Infrastructure and deployment scripts
├── docs/                       # Project documentation
└── node_modules/              # Dependencies (monorepo root)
```

## Core Components

### 1. API Service (`/api`)

**Purpose**: Express.js REST API backend with TypeScript

**Structure**:
```
api/
├── Dockerfile                 # Container configuration for API
├── ERD.png                    # Entity Relationship Diagram
├── api-swagger.json          # OpenAPI/Swagger specification
├── package.json              # API dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vitest.config.ts          # Test configuration
└── src/
    ├── index.ts              # API entry point
    ├── seedData.ts           # Database seeding functionality
    ├── models/               # Data models
    │   ├── branch.ts
    │   ├── delivery.ts
    │   ├── headquarters.ts
    │   ├── order.ts
    │   ├── orderDetail.ts
    │   ├── orderDetailDelivery.ts
    │   ├── product.ts
    │   └── supplier.ts
    └── routes/               # API route handlers
        ├── branch.ts
        ├── branch.test.ts
        ├── delivery.ts
        ├── headquarters.ts
        ├── order.ts
        ├── orderDetail.ts
        ├── orderDetailDelivery.ts
        ├── product.ts
        └── supplier.ts
```

**Key Features**:
- RESTful API endpoints for supply chain management
- TypeScript-based data models
- Test coverage with Vitest
- OpenAPI/Swagger documentation
- Dockerized deployment

**Data Models**:
- Headquarters: Main office locations
- Branch: Store branches
- Supplier: Product suppliers
- Product: Catalog items
- Order: Customer orders
- OrderDetail: Order line items
- Delivery: Supplier deliveries
- OrderDetailDelivery: Fulfillment tracking

### 2. Frontend Application (`/frontend`)

**Purpose**: React 18+ web application with TypeScript and Tailwind CSS

**Structure**:
```
frontend/
├── public/                   # Static assets
│   ├── hero.png
│   ├── auto-groomer.png
│   ├── catflix.png
│   ├── chirp-cam.png
│   ├── copilot.png
│   ├── door-dash.png
│   ├── feeder.png
│   ├── litter-box.png
│   ├── scratch-pad.png
│   ├── sleep-nest.png
│   ├── smart-collar.png
│   ├── smart-fountain.png
│   ├── snack-vault.png
│   ├── tracker-mat.png
│   └── vite.svg
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── vite-env.d.ts        # Vite type definitions
│   ├── api/
│   │   └── config.ts        # API configuration
│   ├── assets/              # Additional assets
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── Footer.tsx
│   │   ├── Login.tsx
│   │   ├── Navigation.tsx
│   │   ├── Welcome.tsx
│   │   ├── admin/
│   │   │   └── AdminProducts.tsx
│   │   └── entity/
│   │       └── product/
│   │           ├── ProductForm.tsx
│   │           └── Products.tsx
│   └── context/             # React Context providers
│       ├── AuthContext.tsx
│       ├── ThemeContext.tsx
│       ├── themeContextUtils.tsx
│       └── useTheme.tsx
├── index.html               # HTML template
├── entrypoint.sh           # Container entrypoint script
├── nginx.conf              # Nginx configuration
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
└── tsconfig.json           # TypeScript configuration
```

**Key Features**:
- React 18+ with TypeScript
- Tailwind CSS for styling
- Vite for fast development and builds
- Authentication context
- Theme switching capability
- Admin interface for product management
- Product catalog display

### 3. GitHub Copilot Configurations (`.github/`)

**Purpose**: Custom agents, prompts, and workflows for GitHub Copilot

**Components**:

#### Custom Agents (`agents/`)
- **ImplementationIdeas.agent.md**: Custom agent for exploring implementation ideas

#### Custom Prompts (`prompts/`)
- **Unit-Test-Coverage.prompt.md**: Generate unit tests and improve coverage
- **model.prompt.md**: Generate or update data models
- **plan.prompt.md**: Create implementation plans

#### Workflows (`workflows/`)
- **copilot-setup-steps.yml**: GitHub Actions workflow for Copilot setup

### 4. Documentation (`/docs`)

**Purpose**: Comprehensive project documentation

**Contents**:
```
docs/
├── architecture.md           # System architecture documentation
├── build.md                  # Build instructions
├── demo-script.md           # Demo walkthrough script
├── deployment.md            # Deployment guide
├── model-comparison.md      # AI model comparison
├── tao.md                   # Technical documentation
├── mcp.png                  # MCP server diagram
├── vscode-switch-to-insiders.png
└── design/                  # Design mockups and assets
    ├── MonaFigurine.png
    ├── cart.png
    ├── footer.png
    ├── item-list.png
    └── main.png
```

**Key Documents**:
- Architecture overview and diagrams
- Build and deployment instructions
- Demo scenarios and walkthrough
- Design mockups for UI implementation

### 5. Infrastructure (`/infra`)

**Purpose**: Deployment and infrastructure scripts

**Contents**:
- `configure-deployment.sh`: Deployment configuration script

### 6. VS Code Configuration (`.vscode/`)

**Purpose**: Optimized development environment setup

**Contents**:
- `launch.json`: Debug configurations for API and frontend
- `tasks.json`: Build, test, and run tasks
- `mcp.json`: MCP (Model Context Protocol) server configurations

## Technology Stack

### Backend
- **Runtime**: Node.js (>=18)
- **Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Vitest
- **Documentation**: OpenAPI/Swagger
- **Containerization**: Docker

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Web Server**: Nginx (production)
- **Linting**: ESLint

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Deployment**: Shell scripts

### Development Tools
- **Package Manager**: npm (workspaces)
- **Version Control**: Git
- **IDE**: VS Code with GitHub Copilot

## Project Setup

This is a **monorepo** using npm workspaces with two main workspaces:
1. `api` - Backend service
2. `frontend` - Web application

### Available Scripts

**Root Level** (manages both workspaces):
- `npm run build` - Build both API and frontend
- `npm run dev` - Run both services concurrently
- `npm run dev:api` - Run API only
- `npm run dev:frontend` - Run frontend only
- `npm test` - Run all tests
- `npm run test:api` - Run API tests
- `npm run test:frontend` - Run frontend tests
- `npm run lint` - Run frontend linting

### Data Model

The application follows a supply chain management model:

```
Headquarters → Branches → Orders → OrderDetails → Products
                                ↓
                          OrderDetailDelivery ← Deliveries ← Suppliers
```

**Entity Relationships**:
- A Headquarters has multiple Branches
- Branches place Orders
- Orders contain OrderDetails
- OrderDetails reference Products
- OrderDetails are fulfilled by OrderDetailDeliveries
- Deliveries from Suppliers provide Products
- OrderDetailDeliveries link Deliveries to OrderDetails

## Key Features Demonstrated

1. **Copilot Agent Mode**: Multi-file code generation and complex feature implementation
2. **Copilot Vision**: UI generation from design mockups
3. **MCP Server Integration**: Extended capabilities with Playwright and GitHub API
4. **Custom Instructions**: Project-specific coding standards and conventions
5. **Custom Prompt Files**: Automated documentation and test generation
6. **Test Generation**: Automated test creation and coverage improvement
7. **CI/CD Integration**: GitHub Actions workflows

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Build projects: `npm run build`
4. Start development servers: `npm run dev`
5. Access the application at http://localhost:5173 (frontend) and http://localhost:3000 (api)

## Use Cases

This project serves as a demonstration platform for:
- GitHub Copilot Agent Mode capabilities
- AI-assisted development workflows
- Full-stack TypeScript development
- Modern React patterns and practices
- RESTful API design
- Test-driven development with AI assistance
- Infrastructure as Code with AI
- Custom Copilot instructions and prompts

## Contributors

- Dustin Ellis (@ellisd4)
- Harald Kirschner (@digitarald)
- Joel Norman (@microsoftnorman)
- Tina Saulsberry (@Snuckles2) - Testing

---

*This entire project, including documentation, was created using AI and GitHub Copilot!* 🤖✨
