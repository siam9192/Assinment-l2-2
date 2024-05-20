import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
      rules: {
          eqeqeq: "off",
          "no-unused-vars": "error",
          "prefer-const": ["error", { "ignoreReadBeforeAssign": true }]
      }
  }
];