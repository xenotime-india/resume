---
name: "LUCID Shared Modules"
client: "Eli Lilly (via Appirio)"
tech: ["Node.js", "SSO", "Markdown", "PDF"]
order: 12
---
Set of private Node.js modules for Lilly's internal projects: SSO authentication wrapped in one package, PDF generation from Markdown documents, and shared security helpers. Each new project pulled the modules in instead of rebuilding the same plumbing, cutting weeks from setup.
