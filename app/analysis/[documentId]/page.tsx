"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Header } from "@/components/header"
import { Chatbot } from "@/components/chatbot"
import { ExportDialog } from "@/components/export-dialog"
import type { DocumentAnalysis } from "@/lib/types"
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Shield,
  TrendingUp,
  Eye,
} from "lucide-react"

// Mock data - in production this would come from the API
const mockAnalysis: DocumentAnalysis = {
  summary: {
    title: "Rental Agreement Analysis",
    overview:
      "This is a standard residential rental agreement with some tenant-favorable terms but includes several clauses that require attention. The document establishes a 12-month lease with monthly rent of $2,500, includes pet restrictions, and has specific termination conditions.",
    keyPoints: [
      "12-month lease term with automatic renewal clause",
      "Monthly rent of $2,500 due on the 1st of each month",
      "Security deposit of $2,500 required",
      "Pet policy allows cats and dogs with additional deposit",
      "Landlord responsible for major repairs and maintenance",
    ],
    riskLevel: "Medium",
  },
  clauses: [
    {
      id: "1",
      title: "Rent Payment Terms",
      category: "Financial",
      originalText:
        "Tenant agrees to pay rent in the amount of $2,500.00 per month, due on the first day of each month. Late payments will incur a fee of $75.00 after a 5-day grace period.",
      plainEnglish:
        "You must pay $2,500 rent by the 1st of each month. If you're more than 5 days late, you'll be charged an extra $75 fee.",
      riskLevel: "Low",
      riskReason: "Standard rent terms with reasonable grace period and late fee.",
      suggestions: [],
    },
    {
      id: "2",
      title: "Security Deposit",
      category: "Financial",
      originalText:
        "Tenant shall provide a security deposit of $2,500.00 prior to occupancy. This deposit may be used by Landlord to cover damages beyond normal wear and tear, unpaid rent, or cleaning costs upon termination.",
      plainEnglish:
        "You need to pay a $2,500 security deposit before moving in. The landlord can use this money to fix damages you cause, cover unpaid rent, or pay for cleaning when you move out.",
      riskLevel: "Low",
      riskReason: "Standard security deposit terms that protect both parties.",
      suggestions: [],
    },
    {
      id: "3",
      title: "Automatic Renewal",
      category: "Termination",
      originalText:
        "This lease shall automatically renew for successive one-year terms unless either party provides written notice of termination at least 60 days prior to the expiration date.",
      plainEnglish:
        "Your lease will automatically continue for another year unless you or your landlord give written notice 60 days before it expires.",
      riskLevel: "Medium",
      riskReason: "Automatic renewal can trap tenants who forget to give notice in time.",
      suggestions: [
        "Set a calendar reminder 90 days before lease expiration",
        "Consider negotiating for a shorter notice period (30 days)",
      ],
    },
    {
      id: "4",
      title: "Liability Limitation",
      category: "Liability",
      originalText:
        "Landlord shall not be liable for any personal injury or property damage occurring on the premises, regardless of cause, except where such injury or damage results from Landlord's gross negligence or willful misconduct.",
      plainEnglish:
        "The landlord won't be responsible if you get hurt or your stuff gets damaged on the property, unless they were extremely careless or did something intentionally wrong.",
      riskLevel: "High",
      riskReason: "Very broad liability waiver that could leave tenant without recourse for legitimate claims.",
      suggestions: [
        "Negotiate to limit this clause to exclude landlord negligence",
        "Consider renter's insurance to protect your personal property",
        "Request landlord maintain adequate property insurance",
      ],
    },
  ],
  riskSummary: {
    high: 1,
    medium: 1,
    low: 2,
    totalClauses: 4,
  },
  isLegalDocument: true,
  documentType: "Rental Agreement",
  confidence: 95,
}

function getRiskColor(risk: string) {
  switch (risk) {
    case "High":
      return "destructive"
    case "Medium":
      return "secondary"
    case "Low":
      return "outline"
    default:
      return "outline"
  }
}

function getRiskIcon(risk: string) {
  switch (risk) {
    case "High":
      return <AlertTriangle className="h-4 w-4" />
    case "Medium":
      return <Eye className="h-4 w-4" />
    case "Low":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

export default function AnalysisPage({ params }: { params: { documentId: string } }) {
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [openClauses, setOpenClauses] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate loading analysis data
    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 1000)
  }, [params.documentId])

  const toggleClause = (clauseId: string) => {
    const newOpenClauses = new Set(openClauses)
    if (newOpenClauses.has(clauseId)) {
      newOpenClauses.delete(clauseId)
    } else {
      newOpenClauses.add(clauseId)
    }
    setOpenClauses(newOpenClauses)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Analysis not found</h1>
          <p className="text-muted-foreground">The requested document analysis could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{analysis.summary.title}</h1>
              <div className="flex items-center space-x-4">
                <Badge
                  variant={analysis.isLegalDocument ? "default" : "secondary"}
                  className="flex items-center space-x-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>{analysis.isLegalDocument ? "Legal Document" : "Non-Legal Document"}</span>
                </Badge>
                {analysis.isLegalDocument && (
                  <>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <span>{analysis.documentType}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <span>{analysis.confidence.toFixed(0)}% Confidence</span>
                    </Badge>
                  </>
                )}
                <Badge variant={getRiskColor(analysis.summary.riskLevel)} className="flex items-center space-x-1">
                  {getRiskIcon(analysis.summary.riskLevel)}
                  <span>Overall Risk: {analysis.summary.riskLevel}</span>
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {analysis.riskSummary.totalClauses} clauses analyzed
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask Questions
              </Button>
              <ExportDialog analysis={analysis} documentName="rental-agreement" />
            </div>
          </div>
        </div>

        {!analysis.isLegalDocument ? (
          <Card className="mb-8 border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-secondary-foreground mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Non-Legal Document Detected</h3>
                  <p className="text-muted-foreground mb-4">
                    This document does not appear to contain legal content that requires clause-by-clause analysis. It
                    may be a general business document, personal correspondence, or other non-legal content.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Document Summary:</h4>
                    <p className="text-sm text-muted-foreground">{analysis.summary.overview}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Tip:</strong> For legal document analysis, please upload contracts, agreements, terms of
                      service, privacy policies, or other legal documents.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Risk Summary Cards - only show for legal documents */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Risk</p>
                      <p className="text-2xl font-bold text-destructive">{analysis.riskSummary.high}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Medium Risk</p>
                      <p className="text-2xl font-bold text-secondary-foreground">{analysis.riskSummary.medium}</p>
                    </div>
                    <Eye className="h-8 w-8 text-secondary-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Low Risk</p>
                      <p className="text-2xl font-bold text-green-600">{analysis.riskSummary.low}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clauses</p>
                      <p className="text-2xl font-bold">{analysis.riskSummary.totalClauses}</p>
                    </div>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="summary" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Document Summary</TabsTrigger>
                <TabsTrigger value="clauses">Clause Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Executive Summary</CardTitle>
                    <CardDescription>A plain-English overview of your document</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{analysis.summary.overview}</p>
                    <div>
                      <h4 className="font-semibold mb-3">Key Points:</h4>
                      <ul className="space-y-2">
                        {analysis.summary.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clauses" className="space-y-4">
                {analysis.clauses.map((clause) => (
                  <Card key={clause.id}>
                    <Collapsible open={openClauses.has(clause.id)} onOpenChange={() => toggleClause(clause.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                {openClauses.has(clause.id) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                                <CardTitle className="text-lg">{clause.title}</CardTitle>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {clause.category}
                              </Badge>
                            </div>
                            <Badge variant={getRiskColor(clause.riskLevel)} className="flex items-center space-x-1">
                              {getRiskIcon(clause.riskLevel)}
                              <span>{clause.riskLevel}</span>
                            </Badge>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2 text-sm text-muted-foreground">Original Text:</h5>
                              <div className="bg-muted p-3 rounded-lg text-sm italic">"{clause.originalText}"</div>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2 text-sm text-muted-foreground">Plain English:</h5>
                              <p className="text-sm leading-relaxed">{clause.plainEnglish}</p>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2 text-sm text-muted-foreground">Risk Assessment:</h5>
                              <p className="text-sm text-muted-foreground">{clause.riskReason}</p>
                            </div>

                            {clause.suggestions.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2 text-sm text-muted-foreground">Suggestions:</h5>
                                <ul className="space-y-1">
                                  {clause.suggestions.map((suggestion, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <TrendingUp className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                                      <span className="text-sm">{suggestion}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Legal Disclaimer */}
        <Card className="mt-8 border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive mb-1">Legal Disclaimer</h4>
                <p className="text-sm text-muted-foreground">
                  This analysis is for informational purposes only and does not constitute legal advice. Always consult
                  with a qualified attorney for legal matters affecting your rights and obligations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Chatbot documentId={params.documentId} />
    </div>
  )
}
