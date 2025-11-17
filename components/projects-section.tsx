"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Calendar, Coffee } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
  homepage?: string
}

// Featured projects with detailed descriptions
const featuredProjects = [
  {
    title: "FlashCard AI App",
    description:
      "Creating an AI-driven mobile app to convert lecture PDFs or typed notes into flashcards; planning on being used by 200+ students across 3 universities.",
    details:
      "Implementing automatic quiz mode, spaced repetition algorithm, and integrated Firebase Auth and Firestore for real-time sync and login.",
    tech: ["React Native", "Firebase", "AI/ML", "TypeScript"],
    github: "https://github.com/NileetSavale",
    status: "In Development",
  },
  {
    title: "LangViz: Language-Agnostic Visualization Tool",
    description:
      "Built a secure visualization web platform to run Python and R code inside isolated Docker containers, supporting 10+ visualization types.",
    details:
      "Enabled AI-assisted graph generation from natural prompts, dynamic HTML preview rendering, and PostgreSQL-backed history saving.",
    tech: ["Docker", "PostgreSQL", "Python", "R", "AI"],
    github: "https://github.com/NileetSavale",
    status: "Completed",
  },
  {
    title: "IoT-Powered Smart Dustbin",
    description:
      "Engineered an IoT-based waste management system with real-time monitoring, reducing overflow incidents by 60% in pilot trials.",
    details:
      "Integrated cloud analytics predicting bin fill rates with 87% accuracy, optimizing collection scheduling and saving 20% fuel cost.",
    tech: ["IoT", "Cloud Analytics", "Machine Learning", "Hardware"],
    github: "https://github.com/NileetSavale",
    status: "Published",
  },
  {
    title: "Smart Ration Distribution System with Blockchain",
    description:
      "Built an Ethereum-based smart contract system that automated ration distribution for 1,500+ users, ensuring tamper-proof logging and verification.",
    details:
      "Integrated RFID and IoT-based sensors to verify real-time disbursement, reducing fraud complaints by 80%.",
    tech: ["Blockchain", "Ethereum", "Solidity", "IoT", "RFID"],
    github: "https://github.com/NileetSavale",
    status: "Completed",
  },
  {
    title: "Stock Market Trend Prediction",
    description:
      "Built a machine learning pipeline trained on 5 years of NSE/BSE data using XGBoost and moving averages, achieving 86% directional accuracy.",
    details: "Deployed real-time prediction dashboard with 1-minute update cycles using Streamlit and Alpaca API.",
    tech: ["XGBoost", "Streamlit", "Python", "Financial APIs"],
    github: "https://github.com/NileetSavale",
    status: "Completed",
  },
  {
    title: "API for Cross-Team Collaboration",
    description:
      "Developed a RESTful API to help employees locate team members based on 100+ product or repo associations, improving inter-departmental collaboration by 35%.",
    details: "Ensured scalability with indexed queries and modular endpoints capable of handling 10K+ requests/day.",
    tech: ["REST API", "Node.js", "Database Optimization"],
    github: "https://github.com/NileetSavale",
    status: "Hackathon Winner",
  },
]

export function ProjectsSection() {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/NileetSavale/repos?sort=updated&per_page=10")
        if (response.ok) {
          const repos = await response.json()
          setGithubRepos(repos)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubRepos()
  }, [])

  const displayedProjects = showAll ? featuredProjects : featuredProjects.slice(0, 3)

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chalkboard Header */}
        <div className="text-center mb-16">
          <div className="bg-primary/90 text-primary-foreground p-8 rounded-lg shadow-lg border-4 border-primary transform -rotate-1 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="h-8 w-8" />
              <h2 className="font-playfair text-4xl md:text-5xl font-bold">Today's Specials</h2>
              <Coffee className="h-8 w-8" />
            </div>
            <div className="w-32 h-1 bg-primary-foreground mx-auto mb-4"></div>
            <p className="text-lg opacity-90 text-pretty">
              Fresh projects, carefully crafted with the finest technologies
            </p>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className="group bg-card/80 backdrop-blur-sm border-2 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant={
                      project.status === "In Development"
                        ? "default"
                        : project.status === "Published"
                          ? "secondary"
                          : project.status === "Hackathon Winner"
                            ? "destructive"
                            : "outline"
                    }
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <h3 className="font-playfair text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">{project.description}</p>

                <p className="text-xs text-muted-foreground leading-relaxed">{project.details}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mb-16">
          <Button variant="outline" onClick={() => setShowAll(!showAll)} className="group">
            {showAll ? "Show Less" : "Show All Projects"}
            <Coffee className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>

        {/* GitHub Repositories */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-3xl font-bold text-foreground mb-4">Fresh from the Repository</h3>
            <p className="text-muted-foreground">Latest updates from my GitHub kitchen</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded"></div>
                      <div className="h-6 w-16 bg-muted rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubRepos.slice(0, 6).map((repo) => (
                <Card
                  key={repo.id}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-lg truncate">{repo.name}</h4>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <Badge variant="secondary" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {repo.homepage && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="https://github.com/NileetSavale" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View All Repositories
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
