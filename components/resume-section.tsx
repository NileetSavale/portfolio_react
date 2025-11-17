"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Coffee, Award, Briefcase } from "lucide-react"

const publications = [
  {
    title: "Transforming Household Waste Management: IoT-Enabled Smart Dustbin",
    publisher: "IEEE",
    date: "Oct 2024",
    type: "Conference Paper",
  },
]

const achievements = [
  "Member of IU's Graduate and Professional Student Government (GPSG)",
  "Luddy Hackathon 2024 - API for Cross-Team Collaboration",
  "Published research in IEEE on IoT-enabled waste management",
  "CGPA: 8.9 in Bachelor's degree",
  "Successfully reduced fraud complaints by 80% through blockchain implementation",
]

export function ResumeSection() {
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf" 
    link.download = "Nileet-Savale-Resume.pdf"
    link.click()
  }

  const handleViewResume = () => {
    window.open("/resume.pdf", "_blank")
  }

  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
              My Professional Story
            </h2>
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive overview of my journey, achievements, and expertise - served fresh and ready to go.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Resume Download Card */}
          <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">
                <Coffee className="h-6 w-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">Resume</h3>
                <div className="flex-1 border-b-2 border-dotted border-primary/30"></div>
                <span className="text-primary font-mono text-sm">Take Away</span>
              </div>

              {/* Summary */}
              <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary mb-6">
                <h4 className="font-semibold text-foreground mb-2">Professional Summary</h4>
                <p className="text-sm text-foreground leading-relaxed">
                  Adaptive and innovative Computer Science graduate student at Indiana University, experienced in AI/ML,
                  cloud development, and scalable software engineering. Currently building an AI-powered flashcard app
                  that converts PDFs into interactive study tools with auto-generated quizzes.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleDownloadResume} 
                  className="flex-1 group cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  Download Resume
                </Button>

                <Button 
                  variant="outline" 
                  onClick={handleViewResume} 
                  className="flex-1 bg-transparent cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Online
                </Button>
              </div>

              {/* Highlights + Contact */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>3+ years of development experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>AI/ML and full-stack expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Published IEEE research paper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Hackathon winner and GPSG member</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Contact Info
                  </h4>
                  <div className="space-y-2 text-sm text-foreground">
                    <p>📍 Indiana, USA</p>
                    <p>📧 savalenileet@gmail.com</p>
                    <p>🔗 Available for opportunities</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publications + Achievements */}
          <div className="space-y-6">

            <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-accent" />
                  <h3 className="font-playfair text-xl font-bold text-foreground">Publications</h3>
                </div>

                {publications.map((pub, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground text-sm mb-2">{pub.title}</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{pub.publisher}</span>
                      <span>{pub.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-2 border-secondary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="h-5 w-5 text-secondary-foreground" />
                  <h3 className="font-playfair text-xl font-bold text-foreground">Achievements</h3>
                </div>

                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
