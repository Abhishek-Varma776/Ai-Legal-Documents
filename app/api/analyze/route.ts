import { type NextRequest, NextResponse } from "next/server"

// Mock AI analysis function - in production this would integrate with actual AI services
async function analyzeDocument(content: string) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const isLegalDocument = detectLegalDocument(content)
  const documentType = classifyDocumentType(content)
  const confidence = calculateConfidence(content)

  // Mock analysis results
  return {
    isLegalDocument,
    documentType,
    confidence,
    summary: {
      title: isLegalDocument ? `${documentType} Analysis` : "Document Analysis",
      overview: isLegalDocument
        ? "This is a standard residential rental agreement with some tenant-favorable terms but includes several clauses that require attention. The document establishes a 12-month lease with monthly rent of $2,500, includes pet restrictions, and has specific termination conditions."
        : "This document does not appear to be a legal document. It may be a general business document, personal correspondence, or other non-legal content. No legal analysis has been performed.",
      keyPoints: isLegalDocument
        ? [
            "12-month lease term with automatic renewal clause",
            "Monthly rent of $2,500 due on the 1st of each month",
            "Security deposit of $2,500 required",
            "Pet policy allows cats and dogs with additional deposit",
            "Landlord responsible for major repairs and maintenance",
          ]
        : [
            "Document does not contain legal clauses or terms",
            "No contractual obligations identified",
            "Consider uploading a legal document for proper analysis",
          ],
      riskLevel: isLegalDocument ? ("Medium" as const) : ("Low" as const),
    },
    clauses: isLegalDocument ? getLegalClauses() : [],
    riskSummary: isLegalDocument
      ? {
          high: 1,
          medium: 2,
          low: 3,
          totalClauses: 6,
        }
      : {
          high: 0,
          medium: 0,
          low: 0,
          totalClauses: 0,
        },
  }
}

function detectLegalDocument(content: string): boolean {
  const legalKeywords = [
    "agreement",
    "contract",
    "lease",
    "terms and conditions",
    "whereas",
    "party",
    "covenant",
    "liability",
    "indemnify",
    "jurisdiction",
    "governing law",
    "breach",
    "termination",
    "clause",
    "provision",
    "shall",
    "hereby",
    "legal",
    "attorney",
    "court",
    "dispute",
    "arbitration",
    "damages",
  ]

  const legalPhrases = [
    "terms of service",
    "privacy policy",
    "end user license",
    "rental agreement",
    "employment contract",
    "non-disclosure agreement",
    "service agreement",
    "purchase agreement",
    "loan agreement",
    "partnership agreement",
  ]

  const contentLower = content.toLowerCase()
  const keywordMatches = legalKeywords.filter((keyword) => contentLower.includes(keyword)).length
  const phraseMatches = legalPhrases.filter((phrase) => contentLower.includes(phrase)).length

  // Consider it legal if it has multiple legal keywords or specific legal phrases
  return keywordMatches >= 3 || phraseMatches >= 1
}

function classifyDocumentType(content: string): string {
  const contentLower = content.toLowerCase()

  if (contentLower.includes("rental") || contentLower.includes("lease")) return "Rental Agreement"
  if (contentLower.includes("employment") || contentLower.includes("job")) return "Employment Contract"
  if (contentLower.includes("service") && contentLower.includes("agreement")) return "Service Agreement"
  if (contentLower.includes("privacy") && contentLower.includes("policy")) return "Privacy Policy"
  if (contentLower.includes("terms") && contentLower.includes("service")) return "Terms of Service"
  if (contentLower.includes("purchase") || contentLower.includes("sale")) return "Purchase Agreement"
  if (contentLower.includes("loan") || contentLower.includes("credit")) return "Loan Agreement"
  if (contentLower.includes("non-disclosure") || contentLower.includes("nda")) return "Non-Disclosure Agreement"

  return "Legal Document"
}

function calculateConfidence(content: string): number {
  const legalIndicators = [
    "whereas",
    "hereby",
    "shall",
    "party",
    "agreement",
    "contract",
    "terms",
    "conditions",
    "liability",
    "breach",
    "termination",
  ]

  const contentLower = content.toLowerCase()
  const matches = legalIndicators.filter((indicator) => contentLower.includes(indicator)).length

  // Calculate confidence as percentage based on legal indicators found
  return Math.min(95, Math.max(10, (matches / legalIndicators.length) * 100))
}

function getLegalClauses() {
  return [
    {
      id: "1",
      title: "Rent Payment Terms",
      category: "Financial",
      originalText:
        "Tenant agrees to pay rent in the amount of $2,500.00 per month, due on the first day of each month. Late payments will incur a fee of $75.00 after a 5-day grace period.",
      plainEnglish:
        "You must pay $2,500 rent by the 1st of each month. If you're more than 5 days late, you'll be charged an extra $75 fee.",
      riskLevel: "Low" as const,
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
      riskLevel: "Low" as const,
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
      riskLevel: "Medium" as const,
      riskReason: "Automatic renewal can trap tenants who forget to give notice in time.",
      suggestions: [
        "Set a calendar reminder 90 days before lease expiration",
        "Consider negotiating for a shorter notice period (30 days)",
      ],
    },
    {
      id: "4",
      title: "Maintenance Responsibilities",
      category: "Maintenance",
      originalText:
        "Landlord shall be responsible for all major repairs and maintenance of the property, including but not limited to plumbing, electrical, heating, and structural issues. Tenant is responsible for minor maintenance and keeping the property clean.",
      plainEnglish:
        "The landlord will fix big problems like plumbing, electrical issues, heating, and structural damage. You're responsible for small maintenance tasks and keeping the place clean.",
      riskLevel: "Low" as const,
      riskReason: "Clear division of maintenance responsibilities favoring the tenant.",
      suggestions: [],
    },
    {
      id: "5",
      title: "Entry Rights",
      category: "Privacy",
      originalText:
        "Landlord reserves the right to enter the premises at any reasonable time with 24-hour written notice for inspections, repairs, or showing to prospective tenants or buyers.",
      plainEnglish:
        "Your landlord can enter your apartment with 24 hours written notice for inspections, repairs, or to show it to potential renters or buyers.",
      riskLevel: "Medium" as const,
      riskReason: "Entry rights are reasonable but 'any reasonable time' is vague and could be interpreted broadly.",
      suggestions: [
        "Request specific time windows for entry (e.g., 9 AM - 5 PM)",
        "Clarify what constitutes 'reasonable time'",
      ],
    },
    {
      id: "6",
      title: "Liability Limitation",
      category: "Liability",
      originalText:
        "Landlord shall not be liable for any personal injury or property damage occurring on the premises, regardless of cause, except where such injury or damage results from Landlord's gross negligence or willful misconduct.",
      plainEnglish:
        "The landlord won't be responsible if you get hurt or your stuff gets damaged on the property, unless they were extremely careless or did something intentionally wrong.",
      riskLevel: "High" as const,
      riskReason: "Very broad liability waiver that could leave tenant without recourse for legitimate claims.",
      suggestions: [
        "Negotiate to limit this clause to exclude landlord negligence",
        "Consider renter's insurance to protect your personal property",
        "Request landlord maintain adequate property insurance",
      ],
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF, Word, or text files only." },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Extract text content (simplified - in production would use proper parsers)
    const content = await file.text()

    // Analyze document with AI
    const analysis = await analyzeDocument(content)

    return NextResponse.json({
      success: true,
      analysis,
      documentName: file.name,
      processedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze document. Please try again." }, { status: 500 })
  }
}
