"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Mail, Phone, MapPin, Github, Linkedin, Send, Heart } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setStatusMessage("Thank you! Your message has been sent successfully. I'll get back to you soon!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
        setStatusMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setStatusMessage("An error occurred. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (status !== "idle") {
      setStatus("idle")
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="h-8 w-8 text-primary" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">Let's Chat Over Coffee</h2>
            <Coffee className="h-8 w-8 text-primary" />
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Pull up a chair and let's discuss your next project. I'm always excited to collaborate on innovative ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Send className="h-6 w-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">Send a Message</h3>
                <div className="flex-1 border-b-2 border-dotted border-primary/30"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="What should I call you?"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, ideas, or just say hello!"
                    rows={5}
                    className="w-full resize-none"
                    disabled={isLoading}
                  />
                </div>

                {status !== "idle" && (
                  <div
                    className={`p-4 rounded-lg text-sm font-medium ${
                      status === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                <Button type="submit" className="w-full group" disabled={isLoading}>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Café Corner */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Coffee className="h-6 w-6 text-accent" />
                  <h3 className="font-playfair text-2xl font-bold text-foreground">Get In Touch</h3>
                  <div className="flex-1 border-b-2 border-dotted border-accent/30"></div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:savalenileet@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        savalenileet@gmail.com
                      </a>
                    </div>
                  </div>


                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">Indiana, USA</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="font-medium text-foreground mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href="https://github.com/NileetSavale"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href="https://linkedin.com/in/nileet-savale"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="mailto:savalenileet@gmail.com" aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Café Corner Quote */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 shadow-lg">
              <CardContent className="p-8 text-center">
                <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
                <blockquote className="font-playfair text-lg text-foreground mb-4 italic">
                  "Great ideas are born over great conversations. Let's create something amazing together."
                </blockquote>
                <p className="text-sm text-muted-foreground">- Nileet Savale</p>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-secondary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-foreground">Available for new opportunities</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Currently seeking full-time positions and exciting freelance projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> and lots of coffee by Nileet Savale
          </p>
          <p className="text-sm text-muted-foreground mt-2">© 2025 Nileet Savale. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
