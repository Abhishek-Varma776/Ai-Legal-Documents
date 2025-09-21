"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, File, Loader2, CheckCircle } from "lucide-react"
import type { DocumentAnalysis } from "@/lib/types"

interface ExportDialogProps {
  analysis: DocumentAnalysis
  documentName?: string
}

export function ExportDialog({ analysis, documentName = "document" }: ExportDialogProps) {
  const [format, setFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)
  const [open, setOpen] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    setExportComplete(false)

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analysis,
          format,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Create and trigger download
        const byteCharacters = atob(data.content)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: data.mimeType })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = data.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        setExportComplete(true)
        setTimeout(() => {
          setOpen(false)
          setExportComplete(false)
        }, 2000)
      } else {
        throw new Error(data.error || "Export failed")
      }
    } catch (error) {
      console.error("Export error:", error)
      // Handle error - could show toast notification
    } finally {
      setIsExporting(false)
    }
  }

  const formatOptions = [
    {
      value: "pdf",
      label: "PDF Report",
      description: "Complete analysis with formatting and layout",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      value: "txt",
      label: "Text Summary",
      description: "Plain text version for easy sharing",
      icon: <File className="h-5 w-5" />,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Analysis Report</DialogTitle>
          <DialogDescription>Choose your preferred format to download the analysis report.</DialogDescription>
        </DialogHeader>

        {!exportComplete ? (
          <div className="space-y-6">
            <RadioGroup value={format} onValueChange={setFormat} className="space-y-3">
              {formatOptions.map((option) => (
                <Card key={option.value} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <Label htmlFor={option.value} className="cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="text-accent">{option.icon}</div>
                          <div>
                            <h4 className="font-medium">{option.label}</h4>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Label>
                </Card>
              ))}
            </RadioGroup>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">What's included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Executive summary and key points</li>
                <li>• Detailed clause-by-clause analysis</li>
                <li>• Risk assessments and recommendations</li>
                <li>• Legal disclaimer</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isExporting}>
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export {format.toUpperCase()}
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Export Complete!</h3>
            <p className="text-muted-foreground">Your analysis report has been downloaded successfully.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
