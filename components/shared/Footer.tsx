"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { quickLinks } from "@/constant/navigationLinks";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "shahadathhossensajib732@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* info */}
          <div className="space-y-4 max-w-lg">
            {/* Logo and Description */}
            <Link href="/" className="font-bold italic text-xl">
              Shahadath Hossen Sajib
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Backend developer passionate about building scalable, efficient,
              and secure server-side applications with a focus on robust
              architecture and clean code.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://www.linkedin.com/in/shahadathhs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://x.com/shahadathhs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://web.facebook.com/shahadathhs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/shahadathhs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* email */}
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{email}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyEmail}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy email</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.link}
                    className="text-muted-foreground underline text-sm hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Actions</h3>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full" variant="outline">
                <Link
                  target="_blank"
                  href="https://drive.google.com/file/d/1dtZCEgZyof-qrUreeVpXDlOovosegpuf/view"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Link>
              </Button>

              <Button size="lg" className="w-full" onClick={scrollToTop}>
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shahadath Hossen Sajib. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
