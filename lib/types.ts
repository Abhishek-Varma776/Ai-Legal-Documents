export interface DocumentAnalysis {
  isLegalDocument: boolean
  documentType?: string
  confidence: number
  summary: {
    title: string
    overview: string
    keyPoints: string[]
    riskLevel: "Low" | "Medium" | "High"
  }
  clauses: Clause[]
  riskSummary: {
    high: number
    medium: number
    low: number
    totalClauses: number
  }
}

export interface Clause {
  id: string
  title: string
  category: string
  originalText: string
  plainEnglish: string
  riskLevel: "Low" | "Medium" | "High"
  riskReason: string
  suggestions: string[]
}

export interface ChatMessage {
  id: string
  message: string
  response: string
  timestamp: string
}
