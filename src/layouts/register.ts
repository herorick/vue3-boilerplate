import type { ModuleNamespace } from "node_modules/vite/types/hot";
import type { App } from "vue";

export function registerLayouts(app: App<Element>) {
  const layouts = import.meta.globEager<string, ModuleNamespace>('./*.vue');
  console.log(layouts, "layouts")
  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default);
  });
}