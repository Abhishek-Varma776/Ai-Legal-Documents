import { type NextRequest, NextResponse } from "next/server"

// Mock chat responses - in production this would integrate with actual AI services
const mockResponses = {
  "what is the rent":
    "According to your rental agreement, the monthly rent is $2,500, due on the first day of each month. There's a 5-day grace period before late fees apply.",
  "can I have pets":
    "The document mentions a pet policy that allows cats and dogs with an additional deposit. However, I'd need to see the full pet clause to give you complete details about restrictions and fees.",
  "how much notice":
    "For lease termination, you need to provide written notice at least 60 days before the lease expiration date. This is due to the automatic renewal clause in your agreement.",
  "security deposit":
    "Your security deposit is $2,500, which equals one month's rent. The landlord can use this to cover damages beyond normal wear and tear, unpaid rent, or cleaning costs when you move out.",
  "landlord entry":
    "Your landlord can enter the property with 24-hour written notice for inspections, repairs, or showings. However, the agreement doesn't specify exact time windows, which could be problematic.",
  liability:
    "There's a concerning liability limitation clause that makes the landlord not responsible for injuries or property damage unless they were grossly negligent. This is quite broad and you should consider renter's insurance.",
  maintenance:
    "The landlord is responsible for major repairs like plumbing, electrical, heating, and structural issues. You're responsible for minor maintenance and keeping the property clean.",
  "automatic renewal":
    "Yes, your lease automatically renews for another year unless either you or the landlord gives 60 days written notice. Set a reminder 90 days before expiration to avoid being locked in unintentionally.",
}

function findBestResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  // Simple keyword matching - in production would use semantic search
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerQuestion.includes(key)) {
      return response
    }
  }

  // Default response
  return "I can help you understand your legal document. Try asking about specific topics like rent, security deposit, pet policy, notice requirements, or liability terms. You can also ask about any clause you'd like me to explain in simpler terms."
}

export async function POST(request: NextRequest) {
  try {
    const { message, documentId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = findBestResponse(message)

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process message. Please try again." }, { status: 500 })
  }
}
