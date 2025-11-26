Here is a **single, compact, ready-to-paste instruction** that contains everything in one block.

---

# **Instruction: How to Create a Dummy Angular App Using This package.json**

To run the workshop, create a lightweight **dummy Angular 14 application** that uses the exact `package.json` provided. This app will not contain real logic; it only replicates the project’s structure, dependencies, and build/test environment.

1. **Create a workspace folder**

   ```
   mkdir dummy-app
   cd dummy-app
   ```

2. **Add the provided `package.json`**
   Copy the full content exactly as supplied. This locks the project to Angular 14, AG-Grid 28, Material 14, Highcharts 9, ngx-translate, and the same build/test tooling (Karma/Jasmine, ESLint, Husky, SVG sprite tools).

3. **Install dependencies**

   ```
   npm install
   ```

   Use npm only (the engines field enforces this).

4. **Scaffold a minimal Angular app shell**

   ```
   npx ng new dummy-shell --skip-install --skip-git --routing --style=scss
   ```

   Move the generated `src/` folder, `angular.json`, and `tsconfig.*` files into the project root, replacing the default layout while keeping your package.json intact.

5. **Create placeholder components**
   Under `src/app/`, create folders like:

   ```
   src/app/components/fake-table/
   src/app/components/fake-chart/
   src/app/components/fake-form/
   src/app/components/fake-filters/
   ```

   Each contains a minimal Angular component (empty template, empty logic). This mirrors the component taxonomy without implementing any business logic.

6. **Start the application**

   ```
   npm start
   ```

   This calls `ng serve` and loads the dummy app with routing and placeholder components.

7. **Build the production version**

   ```
   npm run build
   ```

   This uses the original production configuration and memory flags.

8. **Run tests if needed**

   ```
   npm test
   npm run test:ci
   ```

9. **Optional: generate SVG sprites**

   ```
   npm run generate:svg-sprite
   npm run generate:svg-sprite_flag
   npm run generate:svg-sprite_perils
   ```

After these steps, you will have a fully working dummy Angular 14 project with the same dependency graph and build pipeline as the real application, ready for component mapping, migration planning, and workshop exercises.
