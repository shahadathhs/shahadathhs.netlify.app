"use client";

import type React from "react";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Command {
  input: string;
  output: string[];
}

export default function TerminalPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const portfolioData = {
    skills: [
      "JavaScript/TypeScript",
      "Node.js/Express/Nest.js",
      "MongoDB/Mongoose",
      "PostgreSQL/Prisma",
      "Git/GitHub",
      "REST APIs",
      "Jest/SuperTest",
    ],
    projects: [
      {
        name: "e-commerce-platform",
        description:
          "Full-stack e-commerce platform with React, Node.js, and MongoDB",
        tech: "React, Node.js, MongoDB, Stripe",
        status: "Production",
      },
      {
        name: "task-management-app",
        description:
          "Real-time task management application with team collaboration",
        tech: "Next.js, Socket.io, PostgreSQL",
        status: "Development",
      },
    ],
    contact: {
      email: "sajib@example.com",
      linkedin: "https://linkedin.com/in/sajibrahman",
      github: "https://github.com/sajibrahman",
      website: "https://sajibrahman.dev",
    },
  };

  const executeCommand = (input: string): string[] => {
    const cmd = input.trim().toLowerCase();
    const args = cmd.split(" ");

    switch (args[0]) {
      case "help":
        return [
          "Available commands:",
          "  help            - Show this help message",
          "  skills          - List my technical skills",
          "  projects        - Show my projects",
          "  open <project>  - View project details",
          "  download cv     - Download my resume",
          "  contact         - Show contact information",
          "  clear           - Clear the terminal",
          "  whoami          - Show information about me",
        ];

      case "skills":
        return [
          "My Technical Skills:",
          ...portfolioData.skills.map((skill) => `  • ${skill}`),
        ];

      case "projects":
        return [
          "My Projects:",
          ...portfolioData.projects.map(
            (project) => `  • ${project.name} (${project.status})`
          ),
          "",
          "Use 'open <project-name>' to view details",
        ];

      case "open":
        if (args.length < 2) {
          return ["Usage: open <project-name>"];
        }
        const projectName = args.slice(1).join("-");
        const project = portfolioData.projects.find(
          (p) => p.name === projectName
        );
        if (project) {
          return [
            `Project: ${project.name}`,
            `Description: ${project.description}`,
            `Technologies: ${project.tech}`,
            `Status: ${project.status}`,
          ];
        }
        return [
          `Project '${projectName}' not found. Use 'projects' to see available projects.`,
        ];

      case "download":
        if (args[1] === "cv") {
          // Simulate download
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Sajib_Rahman_Resume.pdf";
            link.click();
          }, 1000);
          return ["Downloading resume... Please check your downloads folder."];
        }
        return ["Usage: download cv"];

      case "contact":
        return [
          "Contact Information:",
          `  Email: ${portfolioData.contact.email}`,
          `  LinkedIn: ${portfolioData.contact.linkedin}`,
          `  GitHub: ${portfolioData.contact.github}`,
          `  Website: ${portfolioData.contact.website}`,
        ];

      case "clear":
        setCommands([]);
        return [];

      case "whoami":
        return [
          "Sajib Rahman",
          "Full Stack Developer",
          "",
          "I'm a passionate developer with expertise in modern web technologies.",
          "I love building scalable applications and solving complex problems.",
        ];

      case "":
        return [];

      default:
        return [
          `Command not found: ${args[0]}. Type 'help' for available commands.`,
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    setIsTyping(true);
    const output = executeCommand(currentInput);

    if (currentInput.trim().toLowerCase() !== "clear") {
      setCommands((prev) => [...prev, { input: currentInput, output }]);
    }

    setCurrentInput("");

    setTimeout(() => {
      setIsTyping(false);
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commands]);

  useEffect(() => {
    // Welcome message
    setCommands([
      {
        input: "",
        output: [
          "Welcome to Sajib's Portfolio Terminal!",
          "Type 'help' to see available commands.",
          "",
        ],
      },
    ]);
  }, []);

  return (
    <div className="my-10 py-10 px-4 md:px-16 border rounded relative overflow-clip">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="flex justify-center">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center mb-2">
            Now about me via commands
          </h1>
          <p className="text-center text-muted-foreground">
            Scan the QR code to connect with me instantly
          </p>
        </div>

        {/* terminal div */}
        <div
          ref={terminalRef}
          className="bg-black border rounded shadow p-4 h-[70vh] overflow-y-auto"
        >
          {commands.map((command, index) => (
            <div key={index} className="mb-2">
              {command.input && (
                <div className="flex">
                  <span className="text-green-300">sajib@portfolio:~$ </span>
                  <span className="ml-1">{command.input}</span>
                </div>
              )}
              {command.output.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className="text-green-400 whitespace-pre-wrap"
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          {isTyping && (
            <div className="text-green-400">
              <span className="animate-pulse">Processing...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex mt-2">
            <span className="text-green-300">sajib@portfolio:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="ml-1 bg-transparent border-none outline-none text-green-400 flex-1"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        <div className="mt-4 text-sm ">
          <p>Pro Tip: Try commands like 'skills', 'projects', or 'contact'</p>
        </div>
      </div>

      {/* border beam */}
      <BorderBeam duration={40} size={300} />
    </div>
  );
}
