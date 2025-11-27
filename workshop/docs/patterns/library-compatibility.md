# 📚 Library Compatibility Patterns

**Purpose**: Document patterns for handling third-party library compatibility issues  
**Approach**: Pattern-based, version-aware solutions  
**Status**: Living document - evolves with migration experience

---

## 🎯 **Core Principle**

**Always**: Check library version compatibility with Angular version before fixing errors  
**Then**: Apply version-specific solution pattern  
**Document**: Incompatibilities for team awareness

---

## 📋 **Common Library Compatibility Patterns**

### Pattern 1: TypeScript Type Definition Mismatches

**Detection**:
- "Generic type requires between X and Y type arguments"
- Type definition errors from node_modules
- Library type definitions incompatible with Angular version

**Common Scenarios**:
- highcharts-angular with Angular 14
- Older libraries with newer Angular versions
- Libraries not updated for current Angular

**Solution Pattern**:
1. **Check Compatibility**: Verify library version supports Angular version
2. **Options**:
   - Upgrade library to compatible version (preferred)
   - Upgrade Angular first, then library (if library requires newer Angular)
   - Suppress type error temporarily (not recommended, document reason)
3. **Document**: Add compatibility note for team

**Example**: highcharts-angular v3.1.2 incompatible with Angular 14
- **Detection**: TypeScript error about ComponentDeclaration
- **Solution**: Upgrade after Angular upgrade, or upgrade library first
- **Pattern**: Library type definitions lag Angular versions

---

### Pattern 2: API Property/Method Changes

**Detection**:
- "Property does not exist"
- "Method does not exist"
- Property/method removed or renamed

**Common Scenarios**:
- AG Grid API changes between versions
- Material component property changes
- Third-party directive property changes

**Solution Pattern**:
1. **Identify Deprecated API**: Find what was removed/changed
2. **Check Library Version**: Verify current library version
3. **Find Replacement**: Check library migration guide
4. **Update Code**: Use new API pattern
5. **Document**: Note API change for team

**Example**: AG Grid SideBar.toggle() → setSideBarVisible()
- **Detection**: Property 'toggle' does not exist on SideBarDef
- **Solution**: Use GridApi.setSideBarVisible() instead
- **Pattern**: Library APIs evolve - check migration guides

---

### Pattern 3: Module Export Changes

**Detection**:
- "Module has no exported member"
- Import fails for previously working module
- Module structure changed

**Common Scenarios**:
- AG Grid module reorganization
- Library refactoring
- Version-specific module structure

**Solution Pattern**:
1. **Verify Export**: Check library documentation for correct import
2. **Check Version**: Confirm library version
3. **Find Correct Import**: Use version-specific import path
4. **Update Code**: Fix import statement
5. **Document**: Note module structure change

**Example**: ServerSideRowModelModule not exported
- **Detection**: Module has no exported member 'ServerSideRowModelModule'
- **Solution**: Configure via gridOptions.rowModelType instead
- **Pattern**: Library module structure changes between versions

---

### Pattern 4: Directive/Component Property Changes

**Detection**:
- "Can't bind to 'X' since it isn't a known property"
- Directive property not recognized
- Component input/output changes

**Common Scenarios**:
- Material component API changes
- Third-party directive updates
- Angular version-specific property changes

**Solution Pattern**:
1. **Check Property Exists**: Verify property in library version
2. **Find Alternative**: Check for replacement property or method
3. **Update Template**: Use correct property or workaround
4. **Document**: Note property change

**Example**: ngxTimepickerToggle property
- **Detection**: Can't bind to 'ngxTimepickerToggle'
- **Solution**: Use click handler to open picker programmatically
- **Pattern**: Directive properties change - use programmatic approach

---

### Pattern 5: Service API Changes

**Detection**:
- "Property does not exist on type 'Service'"
- Method signature changed
- Service interface changed

**Common Scenarios**:
- ng-in-viewport service API changes
- Library service refactoring
- Version-specific API differences

**Solution Pattern**:
1. **Check Service API**: Verify method/property in library version
2. **Find Alternative**: Check for replacement API
3. **Update Code**: Use correct API or workaround
4. **Document**: Note API change

**Example**: InViewportService.check() method
- **Detection**: Property 'check' does not exist
- **Solution**: Use alternative API or remove if not needed
- **Pattern**: Service APIs evolve - check library docs

---

## 🔍 **Detection Strategies**

### Strategy 1: Error Message Analysis
**Look for**:
- Library name in error message
- Type definition errors from node_modules
- Property/method not found errors
- Module import errors

### Strategy 2: Version Compatibility Check
**Process**:
1. Identify library causing error
2. Check library version: `npm list <library-name>`
3. Check Angular version: `npm list @angular/core`
4. Consult compatibility matrix
5. Determine if upgrade needed

### Strategy 3: Library Documentation Check
**Process**:
1. Find library migration guide
2. Check breaking changes section
3. Look for version-specific notes
4. Find replacement APIs

---

## 🛠️ **Solution Patterns**

### Pattern A: Upgrade Library (Preferred)
**When**: Library has compatible version available  
**Process**:
1. Check library changelog
2. Identify compatible version
3. Upgrade library
4. Fix breaking changes
5. Verify build

### Pattern B: Upgrade Angular First
**When**: Library requires newer Angular version  
**Process**:
1. Document incompatibility
2. Proceed with Angular upgrade
3. Upgrade library after Angular upgrade
4. Fix breaking changes

### Pattern C: Workaround (Temporary)
**When**: No compatible version available  
**Process**:
1. Document incompatibility
2. Implement workaround
3. Add TODO comment
4. Plan proper fix after upgrade

### Pattern D: Suppress Type Error (Last Resort)
**When**: Type definition issue, library works at runtime  
**Process**:
1. Document reason
2. Add @ts-ignore with explanation
3. Plan proper fix
4. Remove suppression after upgrade

---

## 📊 **Library Compatibility Matrix**

### Highcharts
- **v3.1.2**: Incompatible with Angular 14 (TypeScript types)
- **Solution**: Upgrade after Angular upgrade or upgrade highcharts-angular

### AG Grid
- **v28**: API changes (SideBar, columnState, etc.)
- **Solution**: Use GridApi methods, check migration guide

### ngx-material-timepicker
- **Property Changes**: Directive properties may change
- **Solution**: Use programmatic API when properties don't work

### ng-in-viewport
- **API Changes**: Service methods may change
- **Solution**: Check library version, use available API

---

## 💡 **Key Principles**

1. **Check Compatibility First**: Always verify library-Angular compatibility
2. **Version-Aware**: Solutions depend on library and Angular versions
3. **Document Incompatibilities**: Help team understand issues
4. **Prefer Upgrades**: Upgrade libraries when possible
5. **Temporary Workarounds**: Document and plan proper fixes

---

**See MIGRATION_PATTERNS.md for general pattern catalog**

