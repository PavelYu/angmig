#!/bin/bash
# Script to create remaining ACP agents

AGENTS=(
  "StyleMigrator:Style Migrator:Handles Material MDC migration and CSS refactoring"
  "LogicRefactorer:Logic Refactorer:Handles Services, HTTP, Guards, Interceptors, RxJS, State"
  "DependencyAuditor:Dependency Auditor:Ensures package compatibility and upgrades"
  "InfraPerfOptimizer:Infra & Perf Optimizer:Optimizes infrastructure and performance"
  "ArchitectureReviewer:Architecture Reviewer:Audits code architecture and quality"
  "CodeReviewer:Code Reviewer:Pre-validates code before PR submission"
  "UnitTestMigrator:Unit Test Migrator:Migrates Karma to Vitest"
  "E2ETestMigrator:E2E Test Migrator:Migrates Protractor to Playwright"
  "TestMigrator:Test Migrator:Legacy agent for backward compatibility"
)

for agent_info in "${AGENTS[@]}"; do
  IFS=':' read -r class_name display_name description <<< "$agent_info"
  file_name=$(echo "$class_name" | sed 's/\([A-Z]\)/-\L\1/g' | sed 's/^-//')
  
  echo "Creating $class_name..."
done
