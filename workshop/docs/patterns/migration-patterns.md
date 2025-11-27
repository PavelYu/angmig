# 🔄 Migration Patterns & Principles

**Purpose**: Abstract patterns and principles discovered during migration attempts  
**Approach**: Generic, adaptable patterns that apply across different codebases  
**Status**: Living document - patterns will evolve with real migrations

---

## 🎯 **Core Principles**

### 1. Version Verification First
**Pattern**: Always verify actual Angular version before starting migration  
**Why**: Migration plans often assume a specific version, but apps may be on different versions  
**Action**: Run `npm list @angular/core --depth=0` first  
**Impact**: May require additional upgrade steps not in the plan

### 2. Configuration Format Changes
**Pattern**: Angular version upgrades often change configuration file formats  
**Common Changes**:
- Polyfills: Array → String path (v14) or vice versa
- Build options: Property names change
- Module formats: Import/export syntax changes

**Detection**: Build errors mentioning "Schema validation" or "must be string/array"  
**Solution**: Check Angular version-specific documentation for correct format

### 3. Template Syntax Restrictions
**Pattern**: Angular templates have limitations on JavaScript expressions  
**Common Issues**:
- Arrow functions not supported directly
- Complex expressions fail
- Async operations need component methods

**Detection**: Template parser errors  
**Solution**: Move complex logic to component methods

### 4. API Evolution
**Pattern**: Third-party libraries evolve APIs between versions  
**Common Scenarios**:
- Methods renamed or removed
- Parameters changed
- Return types changed
- New patterns introduced

**Detection**: TypeScript errors about missing properties/methods  
**Solution**: Check library migration guides, use new API patterns

### 5. Module Resolution Issues
**Pattern**: Import paths may fail even when files exist  
**Common Causes**:
- Incorrect relative path depth
- Missing exports
- Circular dependencies
- TypeScript/webpack configuration

**Detection**: "Module not found" errors despite files existing  
**Solution**: Verify path depth, check exports, clear cache

---

## 📋 **Pattern Categories**

### Category A: Configuration & Setup
**Patterns**:
- Polyfills configuration format
- TypeScript configuration changes
- Build system configuration
- Module resolution settings

**Principle**: Configuration formats change between Angular versions - always check version-specific docs

### Category B: Template & Component
**Patterns**:
- Template expression limitations
- Component API changes
- Directive property changes
- Material component API evolution

**Principle**: Templates are restricted - complex logic belongs in components

### Category C: Dependency & Library
**Patterns**:
- Library version compatibility
- API breaking changes
- Deprecated packages
- Peer dependency conflicts

**Principle**: Libraries evolve independently - check compatibility matrices

### Category D: Type System
**Patterns**:
- Type definition changes
- Generic type parameter counts
- Interface evolution
- Type inference issues

**Principle**: TypeScript types reflect API changes - errors indicate real API differences

---

## 🔍 **Detection Strategies**

### Strategy 1: Error Pattern Matching
**Approach**: Categorize errors by pattern, not specific message  
**Patterns**:
- "Schema validation" → Configuration format issue
- "Property does not exist" → API change
- "Module not found" → Path or export issue
- "Generic type requires" → Type definition mismatch

### Strategy 2: Version-Specific Checks
**Approach**: Check Angular version first, then look for version-specific issues  
**Checks**:
- Current Angular version
- Target Angular version
- Library versions vs Angular compatibility
- Known breaking changes for version range

### Strategy 3: Dependency Audit
**Approach**: Audit dependencies before migration, not during  
**Focus**:
- Deprecated packages
- View Engine vs Ivy compatibility
- Peer dependency warnings
- Security vulnerabilities

---

## 🛠️ **Solution Patterns**

### Pattern 1: Configuration Fix
**Steps**:
1. Identify configuration file (angular.json, tsconfig.json, etc.)
2. Check error message for expected format
3. Consult Angular version documentation
4. Apply format change
5. Verify build

**Generalizable**: Works for any configuration format change

### Pattern 2: API Migration
**Steps**:
1. Identify deprecated/removed API
2. Check library migration guide
3. Find replacement API
4. Update code to use new API
5. Handle breaking changes

**Generalizable**: Works for any library API change

### Pattern 3: Template Refactoring
**Steps**:
1. Identify complex template expression
2. Move logic to component method
3. Update template to call method
4. Verify functionality preserved

**Generalizable**: Works for any template complexity issue

### Pattern 4: Module Resolution Fix
**Steps**:
1. Verify file exists
2. Check import path depth
3. Verify component/service is exported
4. Check module declarations
5. Clear cache and rebuild

**Generalizable**: Works for any import resolution issue

---

## 🎓 **Agent Guidance Principles**

### Principle 1: Pattern Recognition Over Specific Fixes
**Approach**: Agents should recognize patterns, not memorize specific fixes  
**Example**: 
- ❌ "Fix polyfills in angular.json to be string"
- ✅ "Detect configuration format errors, check Angular version docs, apply correct format"

### Principle 2: Version-Aware Solutions
**Approach**: Solutions should adapt to detected Angular version  
**Example**:
- Check version first
- Apply version-specific solution
- Document version-specific notes

### Principle 3: Library Compatibility Checks
**Approach**: Always verify library compatibility before fixing  
**Example**:
- Check library version
- Check Angular version compatibility
- Use compatibility matrix
- Document incompatibilities

### Principle 4: Incremental Problem Solving
**Approach**: Fix one category at a time, verify, then proceed  
**Example**:
- Fix configuration issues first
- Then fix API issues
- Then fix type issues
- Verify build after each category

---

## 📊 **Error Classification Framework**

### Level 1: Configuration (Easiest to Fix)
- Schema validation errors
- Format mismatches
- Missing required properties

### Level 2: API Changes (Medium Complexity)
- Missing methods/properties
- Changed signatures
- Deprecated APIs

### Level 3: Type System (Higher Complexity)
- Generic type mismatches
- Interface incompatibilities
- Type inference failures

### Level 4: Architecture (Highest Complexity)
- Module resolution failures
- Circular dependencies
- Build system issues

---

## 🔄 **Iterative Improvement**

**Process**:
1. Encounter issue during migration
2. Identify pattern (not specific fix)
3. Document pattern with detection strategy
4. Create generalizable solution pattern
5. Update agent guidance
6. Apply to future migrations

**Goal**: Build pattern library that improves with each migration

---

## 💡 **Key Takeaways**

1. **Abstract Over Specific**: Focus on patterns, not exact fixes
2. **Version-Aware**: Always check versions before applying solutions
3. **Pattern Recognition**: Categorize errors by pattern, not message
4. **Incremental**: Fix by category, verify, proceed
5. **Document Patterns**: Build reusable knowledge base

---

**See TROUBLESHOOTING_GUIDE.md for specific examples of these patterns**

