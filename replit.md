# LexiExplain AI Legal Document Analyzer

## Project Overview
LexiExplain is an AI-powered legal document analysis tool that simplifies complex legal documents by providing:
- Plain English summaries
- Clause-by-clause analysis
- Risk assessment
- Interactive Q&A chatbot

## Architecture
- **Framework**: Next.js 14.2.16 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Library**: Radix UI components
- **Development Server**: Running on port 5000
- **Build Tool**: Next.js built-in

## Key Features
1. **Document Upload**: Supports PDF, Word (.docx), and text files up to 10MB
2. **AI Analysis**: Mock AI analysis engine with legal document detection
3. **Risk Assessment**: Categorizes clauses as Low, Medium, or High risk
4. **Interactive UI**: Modern, responsive design with dark/light theme support
5. **Security Focus**: Privacy-first approach with automatic document deletion

## File Structure
- `app/` - Next.js app directory structure
  - `page.tsx` - Landing page
  - `upload/page.tsx` - Document upload interface
  - `analysis/[documentId]/page.tsx` - Analysis results page
  - `api/analyze/route.ts` - Document analysis API endpoint
  - `api/chat/route.ts` - Chat API for Q&A
  - `api/export/route.ts` - Export functionality
- `components/` - Reusable UI components
  - `ui/` - shadcn/ui components
  - `chatbot.tsx` - Interactive chat component
  - `header.tsx` - Site header
  - `theme-provider.tsx` - Theme management
- `lib/` - Utility functions and types
- `public/` - Static assets

## Development Setup
The project is configured to run in the Replit environment:
- Development server runs on `0.0.0.0:5000` 
- Next.js configured with build optimizations
- TypeScript build errors ignored for development
- Image optimization disabled for Replit compatibility

## API Endpoints
- `POST /api/analyze` - Analyzes uploaded documents
- `POST /api/chat` - Handles document Q&A
- `POST /api/export` - Exports analysis results

## Dependencies
Key dependencies include:
- Next.js, React, TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- Lucide React (icons)
- React Hook Form, Zod (forms/validation)
- Date-fns, Recharts (utilities/charts)

## Deployment
Configured for Vercel deployment with:
- Build command: `npm run build`
- Start command: `npm start`
- Autoscale deployment target

## Current Status
- ✅ All dependencies installed
- ✅ Development server running successfully on port 5000
- ✅ All routes functioning properly
- ✅ TypeScript compilation working
- ✅ Fast Refresh/HMR working
- ✅ Deployment configuration set

## Recent Changes
- September 21, 2025: Initial project import and setup completed
- Configured for Replit environment
- All core functionality verified working