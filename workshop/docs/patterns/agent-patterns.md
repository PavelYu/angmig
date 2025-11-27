# 🤖 Agent Pattern Guidance

**Purpose**: Guide agents to recognize patterns and apply generalizable solutions  
**Approach**: Pattern-based, version-aware, adaptable  
**Status**: Living document - evolves with migration experience

---

## 🎯 **Core Agent Principles**

### Principle 1: Pattern Recognition Over Memorization
**Don't**: Memorize specific fixes for specific files  
**Do**: Recognize error patterns and apply appropriate solution patterns

**Example**:
- ❌ "Fix polyfills in angular.json to be string"
- ✅ "Detect configuration format error → Check Angular version → Apply version-specific format"

### Principle 2: Version-Aware Solutions
**Always**: Check Angular version before applying solution  
**Then**: Apply version-specific solution pattern  
**Document**: Version-specific notes for future reference

### Principle 3: Incremental Problem Solving
**Process**:
1. Fix configuration issues first (easiest)
2. Then fix API issues (medium complexity)
3. Then fix type issues (higher complexity)
4. Then fix architecture issues (highest complexity)
5. Verify build after each category

### Principle 4: Library Compatibility First
**Before Fixing**: Check library version compatibility  
**Use**: Compatibility matrices and migration guides  
**Document**: Incompatibilities for team awareness

---

## 🔍 **Error Pattern Recognition**

### Pattern Category: Configuration Errors
**Detection**:
- Error contains "Schema validation"
- Error mentions "must be string" or "must be array"
- Configuration file mentioned in error

**Solution Pattern**:
1. Identify configuration file
2. Check Angular version
3. Consult version-specific docs
4. Apply correct format
5. Verify

**Agent Action**: Apply configuration fix pattern

### Pattern Category: Template Errors
**Detection**:
- Error contains "Parser Error"
- Error mentions template file
- Syntax error in template expression

**Solution Pattern**:
1. Identify complex expression
2. Extract to component method
3. Update template
4. Verify functionality

**Agent Action**: Apply template refactoring pattern

### Pattern Category: API Errors
**Detection**:
- "Property does not exist"
- "Method does not exist"
- Type errors related to library APIs

**Solution Pattern**:
1. Identify deprecated API
2. Check library version
3. Find replacement API
4. Update code
5. Handle breaking changes

**Agent Action**: Apply API migration pattern

### Pattern Category: Module Resolution
**Detection**:
- "Module not found"
- "Cannot find module"
- Import errors

**Solution Pattern**:
1. Verify file exists
2. Check path depth
3. Verify exports
4. Clear cache
5. Rebuild

**Agent Action**: Apply module resolution pattern

---

## 📋 **Agent Workflow Patterns**

### Workflow 1: Initial Error Analysis
**Steps**:
1. Categorize errors by pattern type
2. Prioritize by fix complexity (config → API → types → architecture)
3. Group similar errors
4. Apply pattern-based solutions

### Workflow 2: Version Verification
**Steps**:
1. Check current Angular version
2. Check target Angular version
3. Identify version gap
4. Apply version-specific patterns
5. Document version-specific notes

### Workflow 3: Library Compatibility Check
**Steps**:
1. Identify library causing error
2. Check library version
3. Check Angular version compatibility
4. Consult compatibility matrix
5. Apply compatibility solution

### Workflow 4: Incremental Fixing
**Steps**:
1. Fix one pattern category
2. Verify build
3. Document fixes
4. Move to next category
5. Repeat

---

## 🎓 **Agent Learning Patterns**

### Pattern: Error → Pattern → Solution
**Process**:
1. Encounter error
2. Identify pattern category
3. Apply pattern-based solution
4. Document pattern if new
5. Add to pattern library

### Pattern: Version-Specific Knowledge
**Process**:
1. Learn version-specific behavior
2. Document as pattern
3. Apply to similar situations
4. Update pattern library

### Pattern: Library-Specific Knowledge
**Process**:
1. Learn library API changes
2. Document as migration pattern
3. Apply to other library usages
4. Update compatibility notes

---

## 💡 **Agent Decision Framework**

### Decision Point: Fix Now vs Document
**Fix Now**: 
- Configuration errors (quick)
- Simple API replacements (clear solution)
- Template refactoring (straightforward)

**Document for Later**:
- Complex architecture issues
- Library incompatibilities requiring upgrade
- Breaking changes requiring design decisions

### Decision Point: Pattern vs Specific Fix
**Use Pattern**: 
- Error matches known pattern category
- Solution is generalizable
- Similar errors exist elsewhere

**Use Specific Fix**:
- Unique error not matching patterns
- Requires codebase-specific knowledge
- Needs human decision

---

## 🔄 **Pattern Evolution**

**Process**:
1. Encounter new error type
2. Analyze if it fits existing pattern
3. If yes: Apply pattern
4. If no: Create new pattern
5. Document pattern
6. Update agent guidance

**Goal**: Build pattern library that improves with each migration

---

## 📊 **Pattern Library Structure**

### Level 1: Pattern Categories
- Configuration
- Template
- API
- Module Resolution
- Type System
- Architecture

### Level 2: Pattern Types
Within each category, specific pattern types

### Level 3: Detection & Solution
For each pattern type:
- Detection criteria
- Solution steps
- Version notes
- Examples

---

**See MIGRATION_PATTERNS.md for detailed pattern catalog**

