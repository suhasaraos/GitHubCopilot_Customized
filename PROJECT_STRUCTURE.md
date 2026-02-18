# OctoCAT Supply - Project Structure Documentation

## Overview

OctoCAT Supply is a full-stack TypeScript web application demonstrating GitHub Copilot's capabilities through a supply chain management system. The project showcases AI-assisted development, including Copilot Agent Mode, Vision, MCP Server Integration, and custom prompts.

## Repository Structure

```
GitHubCopilot_Customized/
├── .github/                    # GitHub configuration and workflows
│   ├── agents/                # Custom GitHub Copilot agents
│   │   └── ImplementationIdeas.agent.md
│   ├── prompts/               # Custom GitHub Copilot prompts
│   │   ├── Unit-Test-Coverage.prompt.md
│   │   ├── model.prompt.md
│   │   └── plan.prompt.md
│   └── workflows/             # GitHub Actions workflows
│       └── copilot-setup-steps.yml
├── .vscode/                    # VS Code configuration
│   ├── launch.json            # Debug configurations
│   ├── mcp.json              # MCP server configuration
│   └── tasks.json            # Build and development tasks
├── api/                       # Backend API workspace
├── frontend/                  # Frontend UI workspace
├── infra/                     # Infrastructure configuration
├── docs/                      # Project documentation
├── package.json               # Root package configuration
└── README.md                  # Main documentation
```

## Workspace Architecture

This is a **monorepo** using **npm workspaces** with two main workspaces:
- `api` - Backend API service
- `frontend` - Frontend web application

### Root Configuration

**File**: `package.json`
- **Name**: demo-copilot-agent-mode
- **Description**: OctoCAT Supply Chain Management System
- **Node Version**: >= 18
- **Workspaces**: api, frontend

**Root Scripts**:
- `npm run build` - Build all workspaces
- `npm run dev` - Run both API and frontend in development mode
- `npm run dev:api` - Run API only
- `npm run dev:frontend` - Run frontend only
- `npm run test` - Run tests across all workspaces
- `npm run test:api` - Run API tests
- `npm run test:frontend` - Run frontend tests
- `npm run lint` - Run linting for frontend

## API Workspace (`/api`)

### Overview
Express.js TypeScript API with OpenAPI/Swagger documentation for supply chain management.

### Directory Structure
```
api/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── seedData.ts           # Database seed data
│   ├── models/               # Data models
│   │   ├── branch.ts
│   │   ├── delivery.ts
│   │   ├── headquarters.ts
│   │   ├── order.ts
│   │   ├── orderDetail.ts
│   │   ├── orderDetailDelivery.ts
│   │   ├── product.ts
│   │   └── supplier.ts
│   └── routes/               # API route handlers
│       ├── branch.ts
│       ├── branch.test.ts
│       ├── delivery.ts
│       ├── headquarters.ts
│       ├── order.ts
│       ├── orderDetail.ts
│       ├── orderDetailDelivery.ts
│       ├── product.ts
│       └── supplier.ts
├── Dockerfile                # Container configuration
├── ERD.png                   # Entity Relationship Diagram
├── api-swagger.json          # OpenAPI specification
├── package.json              # API dependencies
├── tsconfig.json             # TypeScript configuration
└── vitest.config.ts          # Test configuration
```

### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.21+
- **Language**: TypeScript 5.7+
- **Documentation**: Swagger/OpenAPI
- **Testing**: Vitest 3.0+ with Supertest
- **Build Tool**: TypeScript Compiler (tsc)
- **Dev Runtime**: tsx 4.19+

### Key Dependencies
- `express` - Web framework
- `cors` - CORS middleware
- `swagger-jsdoc` - Swagger documentation generation
- `swagger-ui-express` - Swagger UI integration

### API Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled application
- `npm run dev` - Run in development mode with hot reload
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report

### Data Models
The API manages eight core entities representing a supply chain:
1. **Headquarters** - Main company offices
2. **Branch** - Regional branch locations
3. **Product** - Product catalog items
4. **Supplier** - Product suppliers
5. **Order** - Customer orders
6. **OrderDetail** - Individual order line items
7. **Delivery** - Supplier deliveries
8. **OrderDetailDelivery** - Delivery fulfillment tracking

### Entity Relationships
```
Headquarters → has many → Branches
Branch → has many → Orders
Order → contains → OrderDetails
OrderDetail → references → Product
OrderDetail → fulfilled by → OrderDetailDelivery
Delivery → includes → OrderDetailDelivery
Supplier → provides → Delivery
```

## Frontend Workspace (`/frontend`)

### Overview
Modern React application with TypeScript, Vite, and Tailwind CSS for the OctoCAT Supply storefront.

### Directory Structure
```
frontend/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root application component
│   ├── index.css             # Global styles
│   ├── vite-env.d.ts         # Vite type definitions
│   ├── api/
│   │   └── config.ts         # API client configuration
│   ├── assets/               # Static assets
│   │   └── react.svg
│   ├── components/           # React components
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
│   └── context/              # React context providers
│       ├── AuthContext.tsx
│       ├── ThemeContext.tsx
│       ├── themeContextUtils.tsx
│       └── useTheme.tsx
├── public/                   # Static public assets
│   ├── hero.png
│   ├── copilot.png
│   └── [product images]      # Various product images
├── index.html                # HTML entry point
├── entrypoint.sh             # Docker entrypoint script
├── nginx.conf                # Nginx configuration
├── Dockerfile                # Container configuration (if exists)
├── package.json              # Frontend dependencies
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # Frontend documentation
```

### Technology Stack
- **Framework**: React 18.3+
- **Language**: TypeScript 5.7+
- **Build Tool**: Vite 6.2+
- **Styling**: Tailwind CSS 3.3+
- **Routing**: React Router DOM 7.4+
- **State Management**: React Query 3.39+
- **HTTP Client**: Axios 1.8+
- **Testing**: Vitest 3.1+ with Testing Library
- **Linting**: ESLint 9.21+

### Key Dependencies
- `react` & `react-dom` - Core React libraries
- `react-router-dom` - Client-side routing
- `react-query` - Data fetching and caching
- `axios` - HTTP requests
- `react-slick` - Carousel component

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Component Structure
- **Pages**: Welcome, About, Login
- **Layout**: Navigation, Footer
- **Features**:
  - Product browsing and management
  - Admin product management
  - User authentication
  - Theme switching (light/dark)

## Documentation (`/docs`)

### Available Documentation
```
docs/
├── architecture.md           # System architecture details
├── build.md                  # Build and deployment instructions
├── demo-script.md            # Demo presentation script
├── deployment.md             # Deployment guide
├── model-comparison.md       # AI model comparison
├── tao.md                    # Technical and operational docs
├── mcp.png                   # MCP server diagram
├── vscode-switch-to-insiders.png
└── design/                   # UI design mockups
    ├── MonaFigurine.png
    ├── cart.png
    ├── footer.png
    ├── item-list.png
    └── main.png
```

### Key Documentation Topics
- **Architecture**: System design and component relationships
- **Build**: Step-by-step build and development setup
- **Demo Script**: Guided hands-on scenarios for showcasing Copilot
- **Deployment**: Production deployment instructions
- **Model Comparison**: AI model performance analysis
- **Design Mockups**: UI/UX reference designs

## Infrastructure (`/infra`)

Contains deployment and infrastructure configuration:
- `configure-deployment.sh` - Deployment configuration script

## GitHub Copilot Configuration

### Custom Agents (`/.github/agents`)
Custom chat-mode agents for specialized tasks:
- **ImplementationIdeas.agent.md** - Explores implementation approaches and generates plans

### Custom Prompts (`/.github/prompts`)
Reusable prompt files for common tasks:
- **Unit-Test-Coverage.prompt.md** - Generates unit tests with coverage analysis
- **model.prompt.md** - Model-related prompts
- **plan.prompt.md** - Planning and architecture prompts

### Workflows (`/.github/workflows`)
- **copilot-setup-steps.yml** - GitHub Copilot setup automation

## VS Code Configuration (`/.vscode`)

### Files
- **launch.json** - Debug configurations for API and frontend
- **tasks.json** - Build, test, and run tasks
- **mcp.json** - MCP (Model Context Protocol) server configuration

### Available Tasks
- Build All - Compile both workspaces
- Start API & Frontend - Launch both services
- Run Tests - Execute test suites

## Key Features & Capabilities

### 1. Monorepo Structure
- Unified dependency management
- Shared tooling and configuration
- Concurrent development workflows

### 2. TypeScript Throughout
- Type safety across frontend and backend
- Shared type definitions possible
- Enhanced IDE support

### 3. Modern Development Tools
- Hot module replacement (Vite)
- Fast testing (Vitest)
- Container support (Docker)
- API documentation (Swagger)

### 4. GitHub Copilot Integration
- Custom agents for specialized tasks
- Reusable prompt files
- Automated workflows
- Vision support for UI design

### 5. Testing Infrastructure
- Unit tests with Vitest
- API integration tests with Supertest
- Frontend component tests with Testing Library
- Coverage reporting

## Getting Started

### Prerequisites
- Node.js >= 18
- npm (comes with Node.js)

### Installation
```bash
# Clone repository
git clone <repository-url>
cd GitHubCopilot_Customized

# Install dependencies for all workspaces
npm install

# Build all workspaces
npm run build
```

### Development
```bash
# Run both API and frontend
npm run dev

# Or run individually
npm run dev:api
npm run dev:frontend
```

### Testing
```bash
# Run all tests
npm test

# Run specific workspace tests
npm run test:api
npm run test:frontend
```

### Using VS Code
1. Open the project in VS Code
2. Use Command Palette (Cmd/Ctrl + Shift + P)
3. Select "Tasks: Run Task"
4. Choose from available tasks (Build All, Start API & Frontend, etc.)

## MCP Server Integration

The project includes MCP (Model Context Protocol) server configuration for extended GitHub Copilot capabilities:
- Playwright integration for testing
- GitHub API integration
- Additional context and tools for Copilot

To start MCP servers:
1. Open VS Code Command Palette
2. Run: `MCP: List servers`
3. Select `playwright`
4. Click `Start server`

## Architecture Highlights

### Frontend Architecture
- **Component-based**: Modular React components
- **Context API**: Shared state management (Auth, Theme)
- **React Query**: Server state management and caching
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build and development server

### Backend Architecture
- **RESTful API**: Resource-based endpoints
- **Express Middleware**: CORS, JSON parsing
- **OpenAPI Documentation**: Auto-generated API docs
- **In-memory Data**: Seed data for development
- **Type-safe Routes**: TypeScript throughout

### Development Workflow
- **Concurrent Development**: Run API and frontend simultaneously
- **Hot Reload**: Automatic refresh on code changes
- **Type Checking**: Real-time TypeScript validation
- **Linting**: Code quality enforcement
- **Testing**: Unit and integration tests

## Demo Scenarios

The project is designed to demonstrate various GitHub Copilot features:

1. **Custom Instructions** - Project-specific Copilot behavior
2. **Custom Agents** - Specialized AI assistants
3. **Vision-based Implementation** - UI from design mockups
4. **Test Generation** - Automated test creation
5. **Documentation Updates** - AI-assisted documentation
6. **Code Reviews** - AI-powered code analysis

## License

MIT License

## Contributors

- Dustin Ellis (@ellisd4)
- Harald Kirschner (@digitarald)
- Joel Norman (@microsoftnorman)
- Tina Saulsberry (@Snuckles2) - Tester

---

*This project structure documentation was created to provide a comprehensive overview of the OctoCAT Supply repository organization and architecture.*
