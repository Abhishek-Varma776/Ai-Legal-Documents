"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Bot, User, Loader2 } from "lucide-react"
import type { ChatMessage } from "@/lib/types"

interface ChatbotProps {
  documentId: string
}

export function Chatbot({ documentId }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message immediately
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: userMessage,
      response: "",
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, newMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          documentId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, response: data.response } : msg)))
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, response: "Sorry, I encountered an error. Please try again." } : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = [
    "What is the rent amount?",
    "Can I have pets?",
    "How much notice do I need to give?",
    "What about the security deposit?",
    "When can the landlord enter?",
    "What are my maintenance responsibilities?",
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Ask Questions
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Document Q&A</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
              ×
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Ask me anything about your document</p>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-80 px-4">
            {messages.length === 0 ? (
              <div className="space-y-3 py-4">
                <p className="text-sm text-muted-foreground mb-3">Try asking one of these questions:</p>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto py-2 px-3 text-xs bg-transparent"
                      onClick={() => setInput(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    {/* User Message */}
                    <div className="flex items-start space-x-2">
                      <div className="bg-accent text-accent-foreground rounded-full p-1">
                        <User className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs mb-1">
                          You
                        </Badge>
                        <p className="text-sm bg-muted p-2 rounded-lg">{message.message}</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-start space-x-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Bot className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs mb-1">
                          LexiExplain
                        </Badge>
                        {message.response ? (
                          <p className="text-sm bg-card p-2 rounded-lg border leading-relaxed">{message.response}</p>
                        ) : (
                          <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your document..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="sm">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
