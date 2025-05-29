export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
  logo: string;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Next Level Web development",
    organization: "Programming Hero",
    issueDate: "Issued May 2025",
    credentialId: "ID-PH-JSMASTERNWEB-3232123",
    credentialUrl: "#",
    skills: [
      "MongoDB",
      "Express.js",
      "PostgreSQL",
      "Node.js",
      "TypeScript",
      "Next.js",
      "Mongoose ODM",
    ],
    description:
      "In this program, I learned a comprehensive range of technologies, including TypeScript, Node.js, Express, React, Next.js, MongoDB, and Mongoose.",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    title: "React Testing Library with Jest / Vitest",
    organization: "Udemy",
    issueDate: "Issued Sep 2024",
    credentialId: "ID-UC-9f93-b9dd-427b-9d-9eb9b2/",
    credentialUrl: "#",
    skills: ["Jest", "Vitest", "React Testing Library", "Jest"],
    description:
      "This course helped me learn best practices for testing applications using Jest or Vitest and React Testing Library in a test-driven development (TDD) approach.",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    title: "Quality Assurance",
    organization: "FreeCodeCamp",
    issueDate: "Issued Aug 2024",
    credentialId: "ID-FCC-9d231b-922c-4494-a82b-3667284c4e7-a9",
    credentialUrl: "#",
    skills: ["Mocha", "Chai"],
    description:
      "This program taught me the learn REST API testing using Mocha and Chai.",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    title: "Complete Web Development Course",
    organization: "Programming Hero",
    issueDate: "Issued Jun 2024",
    credentialId: "",
    skills: [
      "REST APIs",
      "JSON Web Token (JWT)",
      "React.js",
      "JavaScript",
      "HTML5",
      "Tailwind CSS",
      "Firebase",
    ],
    description:
      "This program helped me learn Tailwind CSS, JavaScript, React, REST APIs, and Firebase.",
    logo: "/placeholder.svg?height=60&width=60",
  },
];