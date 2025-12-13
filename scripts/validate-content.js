#!/usr/bin/env node
/**
 * Content Validation Script
 * Checks for common issues that indicate destructive edits:
 * - Files that became too small (content deleted)
 * - Missing critical sections
 * - Missing Taglish explanations
 * - Broken markdown structure
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const MIN_FILE_SIZE = 2000; // Minimum bytes for a valid module
const REQUIRED_SECTIONS = ['## ', '### ']; // Must have headings

// Patterns that should exist in content (Taglish phrases)
const TAGLISH_PATTERNS = [
  /sa madaling salita/i,
  /ibig sabihin/i,
  /halimbawa/i,
  /kung saan/i,
  /ito ay/i,
];

let errors = [];
let warnings = [];

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);

  // Check 1: File size
  if (stats.size < MIN_FILE_SIZE) {
    errors.push(`${fileName}: File too small (${stats.size} bytes) - possible content deletion`);
    return;
  }

  // Check 2: Has required sections
  let hasHeadings = REQUIRED_SECTIONS.some(section => content.includes(section));
  if (!hasHeadings) {
    errors.push(`${fileName}: Missing markdown headings - structure may be broken`);
  }

  // Check 3: Check for Taglish content (at least one pattern should match per file)
  let hasTaglish = TAGLISH_PATTERNS.some(pattern => pattern.test(content));
  if (!hasTaglish) {
    warnings.push(`${fileName}: No Taglish explanations found`);
  }

  // Check 4: Frontmatter exists
  if (!content.startsWith('---')) {
    errors.push(`${fileName}: Missing frontmatter`);
  }

  // Check 5: Check for common sed mistakes (orphaned markdown)
  if (content.includes('**:**') || content.includes('****')) {
    errors.push(`${fileName}: Contains orphaned markdown (possible bad sed replacement)`);
  }

  // Check 6: Empty sections
  const emptySection = /##[^\n]+\n\n##/;
  if (emptySection.test(content)) {
    warnings.push(`${fileName}: Contains empty sections`);
  }
}

function validateAll() {
  console.log('Validating content files...\n');

  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'));

  files.forEach(file => {
    validateFile(path.join(CONTENT_DIR, file));
  });

  console.log(`Checked ${files.length} files\n`);

  if (errors.length > 0) {
    console.log('ERRORS (must fix):');
    errors.forEach(e => console.log(`  ❌ ${e}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('WARNINGS (review):');
    warnings.forEach(w => console.log(`  ⚠️  ${w}`));
    console.log('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All content files passed validation!');
  }

  // Exit with error code if there are errors
  process.exit(errors.length > 0 ? 1 : 0);
}

validateAll();
