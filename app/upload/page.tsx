"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

interface UploadState {
  file: File | null
  uploading: boolean
  progress: number
  error: string | null
  success: boolean
  legalCheckResult: { isLegal: boolean; confidence: number; documentType: string } | null
  analysisComplete: boolean
}

export default function UploadPage() {
  const router = useRouter()
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    progress: 0,
    error: null,
    success: false,
    legalCheckResult: null,
    analysisComplete: false,
  })

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!allowedTypes.includes(file.type)) {
      setUploadState((prev) => ({
        ...prev,
        error: "Please upload a PDF, Word document (.docx), or text file (.txt)",
        file: null,
      }))
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadState((prev) => ({
        ...prev,
        error: "File size must be less than 10MB",
        file: null,
      }))
      return
    }

    setUploadState((prev) => ({
      ...prev,
      file,
      error: null,
      success: false,
    }))
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (!file) return

      // Create a synthetic event to reuse validation logic
      const syntheticEvent = {
        target: { files: [file] },
      } as React.ChangeEvent<HTMLInputElement>

      handleFileSelect(syntheticEvent)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const analyzeDocument = async () => {
    if (!uploadState.file) return

    setUploadState((prev) => ({ ...prev, uploading: true, progress: 0, error: null }))

    try {
      // Step 1: Legal Document Detection
      setUploadState((prev) => ({ ...prev, progress: 20 }))
      
      const formData = new FormData()
      formData.append("file", uploadState.file)

      // Call the analyze API which includes legal document detection
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed")
      }

      // Step 2: Show Legal Check Result
      setUploadState((prev) => ({ 
        ...prev, 
        progress: 50,
        legalCheckResult: {
          isLegal: result.analysis.isLegalDocument,
          confidence: result.analysis.confidence,
          documentType: result.analysis.documentType
        }
      }))

      // Pause to show legal check result - temporarily stop uploading state
      setUploadState((prev) => ({ ...prev, uploading: false }))
      await new Promise((resolve) => setTimeout(resolve, 3000))

      if (result.analysis.isLegalDocument) {
        // Resume uploading state for final analysis
        setUploadState((prev) => ({ ...prev, uploading: true }))
        // Step 3: Complete Analysis for Legal Documents
        setUploadState((prev) => ({ ...prev, progress: 100 }))
        
        // Simulate additional processing time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setUploadState((prev) => ({
          ...prev,
          uploading: false,
          success: true,
          analysisComplete: true,
        }))

        // Redirect to results page after success
        setTimeout(() => {
          router.push("/analysis/demo-document")
        }, 1500)
      } else {
        // Document is not legal - stop here
        setUploadState((prev) => ({
          ...prev,
          uploading: false,
          progress: 100,
          analysisComplete: true,
        }))
      }
      
    } catch (error) {
      setUploadState((prev) => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : "Analysis failed. Please try again.",
        progress: 0,
      }))
    }
  }

  const resetUpload = () => {
    setUploadState({
      file: null,
      uploading: false,
      progress: 0,
      error: null,
      success: false,
      legalCheckResult: null,
      analysisComplete: false,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Upload Your Legal Document</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your PDF, Word document, or text file to get instant AI-powered analysis, plain-English summaries,
            and risk assessments.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Document</CardTitle>
                <CardDescription>Drag and drop your file here, or click to browse</CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadState.file && !uploadState.success && (
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your document here</p>
                    <p className="text-muted-foreground mb-4">or click to browse your files</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, Word (.docx), and Text (.txt) files up to 10MB
                    </p>
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                )}

                {uploadState.file && !uploadState.success && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <FileText className="h-8 w-8 text-accent" />
                      <div className="flex-1">
                        <p className="font-medium">{uploadState.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {!uploadState.uploading && (
                        <Button variant="outline" size="sm" onClick={resetUpload}>
                          Remove
                        </Button>
                      )}
                    </div>

                    {uploadState.uploading && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {uploadState.progress < 50 ? "Checking if document is legal..." : 
                             uploadState.progress < 100 ? "Analyzing legal document..." : 
                             "Processing complete..."}
                          </span>
                          <span>{uploadState.progress}%</span>
                        </div>
                        <Progress value={uploadState.progress} className="w-full" />
                      </div>
                    )}

                    {/* Legal Check Result */}
                    {uploadState.legalCheckResult && !uploadState.uploading && (
                      <div className="space-y-4">
                        <Card className={uploadState.legalCheckResult.isLegal ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2">
                              {uploadState.legalCheckResult.isLegal ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                              )}
                              <CardTitle className="text-lg">
                                {uploadState.legalCheckResult.isLegal ? "✅ Legal Document Detected" : "❌ Not a Legal Document"}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {uploadState.legalCheckResult.isLegal ? (
                              <div className="space-y-2">
                                <p className="text-green-800">
                                  Great! This appears to be a <strong>{uploadState.legalCheckResult.documentType}</strong> with {Math.round(uploadState.legalCheckResult.confidence)}% confidence.
                                </p>
                                <p className="text-sm text-green-700">
                                  Lexora will now analyze all clauses and provide plain-English summaries with risk assessments.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-orange-800 font-medium">
                                  This does not appear to be a legal document. Please upload a valid rental agreement, contract, or terms of service.
                                </p>
                                <p className="text-sm text-orange-700">
                                  Lexora works best with legal documents like contracts, agreements, terms of service, privacy policies, and similar legal texts.
                                </p>
                                <Button 
                                  onClick={resetUpload} 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                                >
                                  Try Another Document
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {!uploadState.uploading && !uploadState.legalCheckResult && (
                      <Button onClick={analyzeDocument} className="w-full" size="lg">
                        <FileText className="mr-2 h-5 w-5" />
                        Analyze Document
                      </Button>
                    )}
                  </div>
                )}

                {uploadState.success && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Document Processed Successfully!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your document has been analyzed. Redirecting to results...
                    </p>
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Loading analysis...</span>
                    </div>
                  </div>
                )}

                {uploadState.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{uploadState.error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Plain English Summary</p>
                    <p className="text-xs text-muted-foreground">Clear overview of the document</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Clause Analysis</p>
                    <p className="text-xs text-muted-foreground">Each section explained simply</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Risk Assessment</p>
                    <p className="text-xs text-muted-foreground">Identify potential issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automatic deletion after analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No data stored permanently</span>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>Legal Disclaimer:</strong> This is not legal advice. Consult a lawyer for binding advice.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  )
}
