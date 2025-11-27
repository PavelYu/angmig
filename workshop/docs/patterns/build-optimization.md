# 🔧 Build Optimization Patterns

**Purpose**: Document patterns for handling build optimization errors  
**Approach**: Pattern-based troubleshooting  
**Status**: Living document

---

## 🎯 **Pattern: Optimization Errors**

**Detection**:
- "Optimization error" in build output
- Syntax errors in optimized bundles
- Errors mentioning chunk files (e.g., `522.13fb12c0adc45d04.js`)

**Common Scenarios**:
- Angular build optimization issues
- Terser/minification problems
- Source map issues
- Bundle optimization failures

**Solution Pattern**:
1. **Identify Error Type**: Check if it's optimization-specific
2. **Check Build Config**: Review angular.json optimization settings
3. **Options**:
   - Disable optimization temporarily to verify build works
   - Check for source map issues
   - Verify TypeScript compilation passes
   - May resolve after Angular upgrade
4. **Document**: Note as non-blocking if dev build works

**Example**: Optimization syntax errors
- **Detection**: "Optimization error [chunk.js]: SyntaxError: Unexpected token"
- **Pattern**: Build optimization issue, not code issue
- **Solution**: 
  - Verify dev build works: `ng serve`
  - Check if production build needed immediately
  - May resolve with Angular upgrade
  - Can disable optimization temporarily if needed

---

## 🔍 **Detection Strategies**

### Strategy 1: Error Message Analysis
**Look for**:
- "Optimization error" prefix
- Chunk file names in errors
- Syntax errors in bundle files
- Terser/minification errors

### Strategy 2: Build Type Check
**Process**:
1. Try dev build: `ng serve` or `ng build`
2. If dev build works → optimization issue
3. If dev build fails → code issue
4. Document accordingly

### Strategy 3: Configuration Check
**Process**:
1. Check angular.json optimization settings
2. Review sourceMap configuration
3. Check build budgets
4. Verify TypeScript compilation

---

## 🛠️ **Solution Patterns**

### Pattern A: Verify Dev Build Works
**When**: Optimization errors but dev build may work  
**Process**:
1. Run dev build: `ng serve` or `ng build`
2. If works → optimization-specific issue
3. Document as non-blocking
4. Plan fix for production build

### Pattern B: Disable Optimization Temporarily
**When**: Need production build but optimization fails  
**Process**:
1. Set `optimization: false` in angular.json
2. Verify build works
3. Document temporary workaround
4. Plan proper fix

### Pattern C: Check After Angular Upgrade
**When**: Optimization errors may resolve with upgrade  
**Process**:
1. Document as known issue
2. Proceed with migration
3. Verify after Angular upgrade
4. Fix if still present

---

## 💡 **Key Principles**

1. **Verify Dev Build**: Check if issue is optimization-specific
2. **Non-Blocking**: Optimization errors don't block development
3. **Version-Aware**: May resolve with Angular upgrade
4. **Document**: Note for team awareness
5. **Temporary Workarounds**: Disable optimization if needed

---

**See MIGRATION_PATTERNS.md for general pattern catalog**

