import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CoffeeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M2 21h18v-2H2v2zM20 8h-2V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6a1 1 0 0 0-1-1zM8 6h8v2H8V6zm8 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5h10v5z" />
  </svg>
)

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
    />
  </svg>
)

const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
)

const SmartphoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
)

const skills = {
  Languages: ["Python", "Java", "C++", "JavaScript", "TypeScript", "Solidity", "HTML"],
  "Frameworks & Libraries": [
    "React.js",
    "Node.js",
    "TensorFlow",
    "PyTorch",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "NLTK",
    "OpenCV",
  ],
  Databases: ["SQL", "MySQL", "MongoDB"],
  "Tools & Platforms": ["Git", "GitHub", "Jupyter Notebook", "Figma", "Adobe Creative Suite", "Docker", "Linux"],
  Concepts: [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Software Engineering",
    "NLP",
    "Computer Vision",
    "Algorithm Design",
  ],
}

const experiences = [
  {
    title: "Teaching Assistant – Elements of Artificial Intelligence (B551)",
    company: "Indiana University Bloomington",
    location: "Indiana, USA",
    period: "Jan 2025 – Present",
    highlights: [
      "Assisting over 150+ graduate students with core AI concepts including search, planning, logic, and machine learning",
      "Supporting autograder development, debugging, and improving assignment workflows for better student experience",
      "Holding office hours and resolving student queries, ensuring smooth course operation and grading accuracy",
    ],
  },
  {
    title: "Volunteer – Data & Computer Science Research",
    company: "Global Health Impact (GHI) Project",
    location: "Binghamton University, New York, USA",
    period: "Oct 2024 – Present",
    highlights: [
      "Working under Professor Nichole Hassoun on data-driven evaluation models for global pharmaceutical impact",
      "Contributing to computational analysis supporting ethical and economic decision-making in global health",
      "Assisting in building reproducible pipelines and structured datasets improving transparency and research efficiency",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "SearchIn",
    location: "Maharashtra, India",
    period: "March 2023 – June 2023",
    highlights: [
      "Designed and tested 3 web applications across 5 platforms, resulting in a 25% increase in user engagement",
      "Enhanced existing applications, improving efficiency by 30% and reducing bugs by 40%",
    ],
  },
  {
    title: "Project Management Intern",
    company: "Wipro PARI Ltd",
    location: "Maharashtra, India",
    period: "Nov 2023 – April 2024",
    highlights: [
      "Mentored by 5 senior project managers across 60+ hours, boosting professional skills by 30%",
      "Contributed to FAT3 testing for 3 major projects, achieving 15% reduction in testing time",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "Atul Ltd",
    location: "Gujarat, India",
    period: "Jan 2022 – April 2022",
    highlights: [
      "Developed an admin portal for a chemical company managing 75 industries",
      "Implemented real-time data integration, cutting data retrieval time by 40%",
    ],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CoffeeIcon className="h-8 w-8 text-primary" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">Today's Menu</h2>
            <CoffeeIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A carefully curated selection of skills, experiences, and passions, served fresh with a side of innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* About Me - Main Course */}
          <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <BrainIcon className="h-6 w-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">About Me</h3>
                <div className="flex-1 border-b-2 border-dotted border-primary/30"></div>
                <span className="text-primary font-mono text-sm">Main Course</span>
              </div>

              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Welcome to my digital café! I'm an{" "}
                  <strong>adaptive and innovative Computer Science graduate student</strong> at Indiana University, with
                  a passion for crafting AI/ML solutions and scalable software engineering.
                </p>

                <p>
                  Currently, I'm brewing up an <strong>AI-powered flashcard app</strong> that converts PDFs into
                  interactive study tools with auto-generated quizzes. As a member of IU's Graduate and Professional
                  Student Government (GPSG), I'm also expanding my expertise in network security and cloud
                  infrastructure.
                </p>

                <p>
                  My journey has taken me through diverse experiences - from developing IoT-powered smart systems that
                  reduce waste overflow by 60%, to building blockchain-based solutions that cut fraud complaints by 80%.
                  I believe in creating technology that not only works beautifully but makes a real difference.
                </p>

                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm italic">
                    "I'm passionate about the intersection of AI and practical applications, always looking for ways to
                    blend thoughtful design with robust engineering."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills - Specialty Drinks */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <CodeIcon className="h-6 w-6 text-accent" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">Skills</h3>
                <div className="flex-1 border-b-2 border-dotted border-accent/30"></div>
                <span className="text-accent font-mono text-sm">Specialty</span>
              </div>

              <div className="space-y-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      {category === "Languages" && <CoffeeIcon className="h-4 w-4 text-primary" />}
                      {category === "Frameworks & Libraries" && <CodeIcon className="h-4 w-4 text-primary" />}
                      {category === "Databases" && <DatabaseIcon className="h-4 w-4 text-primary" />}
                      {category === "Tools & Platforms" && <CloudIcon className="h-4 w-4 text-primary" />}
                      {category === "Concepts" && <BrainIcon className="h-4 w-4 text-primary" />}
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience - Chef's Specials */}
        <div className="mt-8">
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-secondary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <SmartphoneIcon className="h-6 w-6 text-secondary-foreground" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">Experience</h3>
                <div className="flex-1 border-b-2 border-dotted border-secondary/30"></div>
                <span className="text-secondary-foreground font-mono text-sm">Chef's Specials</span>
              </div>

              {/* Timeline layout with better visual hierarchy */}
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-6 border-l-2 border-primary/30 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-3.5 top-1 w-5 h-5 bg-primary rounded-full border-4 border-card shadow-md"></div>

                    <div className="bg-muted/30 p-6 rounded-lg border border-border/50 shadow-md hover:shadow-lg transition-shadow">
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground text-lg">{exp.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-primary font-medium text-sm">{exp.company}</span>
                          <span className="text-muted-foreground text-sm">•</span>
                          <span className="text-muted-foreground text-sm">{exp.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono mt-2 bg-muted/50 inline-block px-2 py-1 rounded">
                          {exp.period}
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-3">
                            <span className="text-primary font-bold mt-0.5">→</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <div className="mt-8 text-center">
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <BrainIcon className="h-6 w-6 text-primary" />
                <h3 className="font-playfair text-2xl font-bold text-foreground">Foundation</h3>
                <div className="flex-1 border-b-2 border-dotted border-primary/30"></div>
                <span className="text-primary font-mono text-sm">Education</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    degree: "Master of Science in Computer Science",
                    school: "Indiana University",
                    period: "August 2024 - July 2026",
                    highlight: "Focus on AI/ML and Software Engineering",
                  },
                  {
                    degree: "Bachelor of Science in Computer Science",
                    school: "Savitribai Phule Pune University",
                    period: "July 2020 - July 2024",
                    highlight: "CGPA: 8.9/10.0",
                  },
                ].map((edu, index) => (
                  <div key={index} className="bg-muted/30 p-6 rounded-lg border border-border/50 shadow-md">
                    <h4 className="font-semibold text-foreground mb-2">{edu.degree}</h4>
                    <p className="text-primary font-medium text-sm mb-1">{edu.school}</p>
                    <p className="text-xs text-muted-foreground font-mono mb-3 bg-muted/50 inline-block px-2 py-1 rounded">
                      {edu.period}
                    </p>
                    <p className="text-sm text-foreground bg-primary/10 p-2 rounded italic border-l-2 border-primary">
                      {edu.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
