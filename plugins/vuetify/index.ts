import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
//import 'vuetify/styles';
// import * as directives from 'vuetify/directives'
import defaults from "./defaults";
import icons from "./icons";
//import theme from "./themes";

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    defaults,
    icons,
  //  theme,
  });

  nuxt.vueApp.use(vuetify);
});
