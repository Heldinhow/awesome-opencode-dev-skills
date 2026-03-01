{
  "title": "pdf",
  "description": "Process PDF files for extraction, creation, modification, and manipulation.",
  "trigger": "When user mentions PDF files or requests PDF operations",
  "input": "PDF files, desired operation, output requirements",
  "steps": [
    "Read PDF with pypdf or pdfplumber",
    "Extract text, tables, or metadata as needed",
    "Modify or create new PDF with reportlab",
    "Apply transformations (merge, split, rotate)",
    "Save output PDF"
  ],
  "output": "Processed PDF file or extracted content",
  "use_cases": [
    "Extracting text/tables from PDFs",
    "Creating new PDF documents",
    "Merging, splitting, or watermarking PDFs"
  ],
  "limitations": "Complex PDFs may require OCR; some operations need specific libraries"
}
