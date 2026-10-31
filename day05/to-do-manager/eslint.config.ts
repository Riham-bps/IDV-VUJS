import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig , globalIgnores} from "eslint/config";
import  eslintConfigPrettier  from "eslint-config-prettier/flat"

export default defineConfig([
  //eslint doit regarder que src et non pas node_modules et dist(npm run build) car ce n'est pas mon code
  //eslint trouvera surement des erreurs lié a la compilation ou autre 
  globalIgnores(["dist/**", "node_modules/**"]),
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  // eslintConfigPrettier: désactive la mise en forme d'ESLint qui pourraient entrer en conflit avec Prettier.
  eslintConfigPrettier,
]);
