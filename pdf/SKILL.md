---
name: pdf
description: "Process PDF files for extraction, creation, modification, and manipulation."
---

# PDF Processing

## Overview
PDF processing involves extracting content from existing PDFs, creating new PDF documents, and modifying or transforming PDF files. This skill should be invoked when working with PDF files for operations like text extraction, table data extraction, document generation, merging, splitting, or watermarking.

## Core Principles
- **Library Selection**: Choose the right library for your specific task (pypdf, pdfplumber, reportlab)
- **Text Extraction**: Use pdfplumber for text with layout preservation, pypdf for simple extraction
- **Creation**: Use reportlab for programmatic PDF generation with precise control
- **Transformation**: Understand that PDFs are final-form documents - editing is limited

## Preparation Checklist
- [ ] Identify the operation type: extraction, creation, or transformation
- [ ] For extraction: Determine if you need text, tables, or metadata
- [ ] For creation: Define the document structure and content
- [ ] Install required libraries: pypdf, pdfplumber, reportlab

## Step-by-Step Process
1. **Read/Load**: Open the PDF file using appropriate library
2. **Extract/Process**: Get text, tables, or metadata as needed
3. **Transform**: Apply any modifications (merge, split, rotate, watermark)
4. **Create**: If generating new PDF, build content programmatically
5. **Save**: Write output to new file or return processed content

## Do's and Don'ts
- ✅ **Do** use pdfplumber for tables - it excels at table extraction
- ✅ **Do** handle encoding issues when extracting international text
- ✅ **Do** close files properly to release resources
- ❌ **Don't** expect perfect formatting preservation when extracting text
- ❌ **Don't** attempt complex layout editing - PDFs aren't designed for that
- ❌ **Don't** skip error handling for corrupted or password-protected PDFs

## Anti-Patterns
- **OCR Blindness**: Not using OCR when dealing with scanned documents
- **Encoding Ignorance**: Not handling UTF-8/encoding issues in extracted text
- **Memory Waste**: Loading large PDFs entirely into memory
- **Format Assumptions**: Assuming all PDFs have the same structure
