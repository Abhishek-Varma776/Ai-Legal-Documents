import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Lexora</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/images/business_professiona_b2cafe03.jpg" 
                  alt="Professional reviewing legal documents" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                AI-Powered Legal Analysis
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                Understand Legal Documents in <span className="text-accent">Plain English</span>
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Upload any legal document and get instant AI-powered summaries, clause-by-clause explanations, risk
                assessments, and answers to your questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/upload">
                    <FileText className="mr-2 h-5 w-5" />
                    Upload Document
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                <Shield className="inline h-4 w-4 mr-1" />
                Your documents are processed securely and deleted after analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8 lg:order-1">
              <Badge variant="outline" className="w-fit">
                Advanced AI Technology
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold">
                Powered by Cutting-Edge <span className="text-accent">Artificial Intelligence</span>
              </h3>
              <p className="text-lg text-muted-foreground">
                Our AI system uses advanced natural language processing to understand complex legal documents and translate them into plain English that anyone can understand.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">99.9% Accuracy</p>
                    <p className="text-sm text-muted-foreground">Industry-leading document analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Lightning Fast</p>
                    <p className="text-sm text-muted-foreground">Results in under 30 seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="relative lg:order-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/images/ai_technology,_artif_36c0dfdf.jpg" 
                  alt="AI Technology analyzing documents" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/images/legal_document_analy_7c58811e.jpg" 
                  alt="Complex legal documents" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">The Problem with Legal Documents</h3>
              <p className="text-lg text-muted-foreground">
                Complex legal jargon creates an unfair advantage, leaving ordinary people vulnerable to hidden clauses and unfavorable terms.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>Hidden Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Important clauses buried in legal jargon that could cost you money or rights.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>Expensive Lawyers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional legal review costs hundreds of dollars for simple documents.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>Time Consuming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reading and understanding complex legal language takes hours of research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Powerful AI Analysis Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive insights into any legal document with our advanced AI technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Plain English Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get a clear, concise summary of what the document means in everyday language.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Clause Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every clause explained with categories like Termination, Liability, and Fees.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identify Low, Medium, and High risk clauses with detailed explanations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Q&A Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ask specific questions about your document and get instant AI-powered answers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">How Lexora Works</h3>
            <p className="text-lg text-muted-foreground">
              Simple, secure, and fast - get insights into your legal documents in minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">Upload Document</h4>
              <p className="text-muted-foreground">Upload your PDF, Word, or text file securely to our platform.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">AI Analysis</h4>
              <p className="text-muted-foreground">
                Our AI extracts text, analyzes clauses, and identifies risks automatically.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Get Results</h4>
              <p className="text-muted-foreground">
                Review summaries, ask questions, and download annotated documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="h-16 w-16 text-accent mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Your Privacy is Our Priority</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We understand legal documents contain sensitive information. That's why we've built Lexora with
            security and privacy at its core.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-accent" />
                  Encrypted Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All documents are encrypted during upload and processing using industry-standard encryption.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-accent" />
                  Automatic Deletion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Documents are automatically deleted after analysis, or you can delete them immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent text-accent-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Understand Your Legal Documents?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust Lexora to simplify their legal documents.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/upload">
              <FileText className="mr-2 h-5 w-5" />
              Start Analyzing Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <span className="text-lg font-bold">Lexora</span>
              </div>
              <p className="text-muted-foreground text-sm">AI-powered legal document simplification for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/upload" className="hover:text-foreground">
                    Upload Document
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#security" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-foreground">
                    Legal Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Legal Disclaimer:</strong> This is not legal advice. Consult a lawyer for binding advice.
              Lexora is an AI-powered tool for informational purposes only.
            </p>
            <p className="text-sm text-muted-foreground mt-2">© 2024 Lexora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
