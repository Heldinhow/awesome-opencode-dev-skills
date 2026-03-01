{
  "title": "docx",
  "description": "Create, read, edit, and manipulate Word documents (.docx) with proper formatting.",
  "trigger": "When user requests Word documents, reports, letters, or .docx file manipulation",
  "input": "Document content, formatting requirements, existing document (for editing)",
  "steps": [
    "Create new document using docx-js library",
    "Add content with proper styles (headings, paragraphs, tables)",
    "Handle special elements (images, hyperlinks, page breaks)",
    "Validate and fix XML issues",
    "Pack into final .docx file"
  ],
  "output": "Word document with proper formatting",
  "use_cases": [
    "Creating professional reports",
    "Editing existing Word documents",
    "Generating letters and memos"
  ],
  "limitations": "Complex formatting may require XML manipulation"
}
