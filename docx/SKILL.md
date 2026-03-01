---
name: docx
description: "Create, read, edit, and manipulate Word documents (.docx) with proper formatting."
---

# Word Document Processing

## Overview
Word document processing involves creating, reading, editing, and manipulating .docx files programmatically. This skill should be invoked when generating Word documents, reports, letters, or any document that requires proper formatting and structure.

## Core Principles
- **Library Selection**: Use python-docx for Python or docx-js for JavaScript
- **Structure First**: Build document structure before content
- **Style Consistency**: Use consistent styles throughout
- **XML Understanding**: Understand .docx is ZIP of XML files

## Preparation Checklist
- [ ] Choose library (python-docx, docx-js, docx4j)
- [ ] Identify document structure (headings, paragraphs, tables)
- [ ] Plan styling requirements
- [ ] Handle special elements (images, headers, footers)

## Step-by-Step Process
1. **Create**: Initialize new document object
2. **Structure**: Add headings and section breaks
3. **Content**: Add paragraphs with proper styles
4. **Elements**: Insert tables, images, hyperlinks as needed
5. **Validate**: Check XML structure validity
6. **Save**: Write to .docx file

## Do's and Don'ts
- ✅ **Do** use styles instead of direct formatting
- ✅ **Do** use proper heading hierarchy
- ✅ **Do** validate documents after creation
- ❌ **Don't** skip error handling for corrupted files
- ❌ **Don't** assume complex formatting works automatically
- ❌ **Don't** forget to close document objects

## Anti-Patterns
- **Manual Formatting**: Using direct formatting instead of styles
- **No Structure**: Adding content without logical hierarchy
- **Image Abuse**: Embedding images without size optimization
- **Close Skipping**: Not properly closing/saving documents
