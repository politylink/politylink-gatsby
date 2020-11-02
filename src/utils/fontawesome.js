import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowCircleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCalendarAlt,
  faExternalLinkAlt,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Prevent fontawesome from dynamically adding its css since
// we do it in gatsby-browser / gatsby-ssr.
config.autoAddCss = false;

library.add(
  faArrowCircleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCalendarAlt,
  faExternalLinkAlt,
  faLock,
  faUser,
);