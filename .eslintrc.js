module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "vue/setup-compiler-macros": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "airbnb-base",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "semi": [2, "never"], // 语句强制分号结尾
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
         ]
    },
    "settings": {
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/resolver": {
            "alias": {
                "map": [
                    ["@src", './src']
                ],
                "extensions": [".ts",".js",".jsx",".tsx",".json",".vue"]
            }
        }
    }
}
