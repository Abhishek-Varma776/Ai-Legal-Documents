import { Shield } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold text-foreground">Lexora</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/#security" className="text-muted-foreground hover:text-foreground transition-colors">
            Security
          </Link>
        </nav>
      </div>
    </header>
  )
}
